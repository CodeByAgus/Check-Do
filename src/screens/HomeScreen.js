import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DayStrip from '../components/DayStrip';
import TaskCard from '../components/TaskCard';
import { colors } from '../theme/colors';
import { formatDMY, formatLongDate, nextDays, sameDay } from '../utils/dates';

// Header (title, date, day strip) on white, task list on the blue area below.
export default function HomeScreen({ api, onAdd }) {
  const insets = useSafeAreaInsets();
  const { tasks, sortMode, removeTask, cycleUnit, move, sortByDate } = api;
  const [day, setDay] = useState(null); // null = show every task
  const days = useMemo(() => nextDays(14), []);

  const shown = day === null ? tasks : tasks.filter((t) => sameDay(t.due, day));

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Mis tareas</Text>
          <Pressable onPress={onAdd} style={styles.add}>
            <Text style={styles.addText}>+</Text>
          </Pressable>
        </View>
        <View style={styles.todayRow}>
          <Text style={styles.today}>Hoy</Text>
          <Text style={styles.date}>{formatLongDate(Date.now())}</Text>
        </View>
        <DayStrip days={days} selected={day} tasks={tasks} onSelect={setDay} />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        <View style={styles.listHeader}>
          {day !== null ? (
            <Pressable onPress={() => setDay(null)}>
              <Text style={styles.listHeaderText}>Vencen el {formatDMY(day)} · ver todas</Text>
            </Pressable>
          ) : (
            <Pressable onPress={sortByDate}>
              <Text style={styles.listHeaderText}>
                {sortMode === 'date' ? 'Orden: por fecha' : 'Orden manual · volver a fecha'}
              </Text>
            </Pressable>
          )}
        </View>

        <View style={styles.timeline}>
          {shown.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              canMove={day === null}
              onCycleUnit={cycleUnit}
              onMove={move}
              onRemove={removeTask}
            />
          ))}
        </View>

        {shown.length === 0 && (
          <Text style={styles.empty}>
            {day === null ? 'Sin tareas. Toca + para crear la primera.' : 'No hay tareas para este día.'}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.primary },
  header: {
    backgroundColor: colors.surface, paddingHorizontal: 20, paddingBottom: 16,
    borderBottomRightRadius: 40,
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: colors.ink, fontSize: 30, fontWeight: '800' },
  add: {
    width: 44, height: 44, borderRadius: 14, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  addText: { color: colors.onPrimary, fontSize: 28, marginTop: -3 },
  todayRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 10, marginBottom: 12 },
  today: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  date: { color: colors.inkSoft, fontSize: 12 },
  list: { padding: 20, paddingTop: 12 },
  listHeader: { marginBottom: 12 },
  listHeaderText: { color: 'rgba(255,255,255,0.85)', fontSize: 13 },
  // Thin vertical line on the left, like a timeline.
  timeline: { paddingLeft: 18, borderLeftWidth: 2, borderLeftColor: 'rgba(255,255,255,0.45)' },
  empty: { color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: 30 },
});
