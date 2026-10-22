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
      <View style={[styles.header, { paddingTop: insets.top + 40 }]}>
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
      {/* Placeholder profile circle, sits in the curved corner of the header */}
      <View style={[styles.avatar, { top: insets.top + 14 }]} />

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
  screen: { flex: 1, backgroundColor: colors.canvas },
  // Big rounded top-right corner leaves room for the avatar on the blue behind it.
  header: {
    backgroundColor: colors.surface, paddingHorizontal: 20, paddingBottom: 16,
    borderTopRightRadius: 110, borderBottomRightRadius: 40,
  },
  avatar: { position: 'absolute', right: 16, width: 46, height: 46, borderRadius: 23, backgroundColor: colors.avatar },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  title: { color: colors.ink, fontSize: 30, fontWeight: '800' },
  add: {
    width: 38, height: 38, borderRadius: 19, marginLeft: 12, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  addText: { color: colors.onPrimary, fontSize: 26, marginTop: -3 },
  todayRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 10, marginBottom: 12 },
  today: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  date: { color: colors.inkSoft, fontSize: 12 },
  list: { padding: 20, paddingTop: 12 },
  listHeader: { marginBottom: 12 },
  listHeaderText: { color: colors.ink, fontSize: 13 },
  empty: { color: colors.ink, textAlign: 'center', marginTop: 30 },
});
