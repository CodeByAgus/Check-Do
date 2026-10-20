import { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nextUnit } from '../utils/dates';

// Task shape: { id, title, due (timestamp), unit: 'days' | 'weeks' | 'months' }
// Everything is saved on the device, so the app works with no internet.
const STORAGE_KEY = 'glass-tasks:v1';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  // 'date' = nearest first (automatic), 'manual' = user's own order.
  const [sortMode, setSortMode] = useState('date');
  // Avoids overwriting saved data with the empty list before it is loaded.
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        const saved = JSON.parse(raw);
        setTasks(saved.tasks ?? []);
        setSortMode(saved.sortMode ?? 'date');
      })
      .catch(() => {}) // corrupted or unavailable storage: start empty
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks, sortMode })).catch(() => {});
  }, [tasks, sortMode, loaded]);

  const visible = useMemo(
    () => (sortMode === 'date' ? [...tasks].sort((a, b) => a.due - b.due) : tasks),
    [tasks, sortMode]
  );

  const addTask = (title, due) => {
    const task = { id: String(Date.now()), title, due, unit: 'days' };
    setTasks((prev) => [...prev, task]);
  };

  const removeTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const cycleUnit = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, unit: nextUnit(t.unit) } : t)));

  // Moving a task freezes the current order and switches to manual mode.
  const move = (id, direction) => {
    const list = [...visible];
    const from = list.findIndex((t) => t.id === id);
    const to = from + direction;
    if (to < 0 || to >= list.length) return;
    [list[from], list[to]] = [list[to], list[from]];
    setTasks(list);
    setSortMode('manual');
  };

  const sortByDate = () => setSortMode('date');

  return { tasks: visible, sortMode, addTask, removeTask, cycleUnit, move, sortByDate };
}
