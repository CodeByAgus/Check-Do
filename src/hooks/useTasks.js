import { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nextUnit } from '../utils/dates';

// Task shape: { id, title, description, category, due (timestamp), unit: 'days' | 'weeks' | 'months' | 'date' }
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

  const addTask = ({ title, description, category, due }) => {
    const task = { id: String(Date.now()), title, description, category, due, unit: 'days' };
    setTasks((prev) => [...prev, task]);
  };

  const removeTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const cycleUnit = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, unit: nextUnit(t.unit) } : t)));

  // Dragging a task freezes the current order and switches to manual mode.
  const reorder = (from, to) => {
    if (from === to) return;
    const list = [...visible];
    const [moved] = list.splice(from, 1);
    list.splice(to, 0, moved);
    setTasks(list);
    setSortMode('manual');
  };

  const sortByDate = () => setSortMode('date');

  return { tasks: visible, sortMode, addTask, removeTask, cycleUnit, reorder, sortByDate };
}
