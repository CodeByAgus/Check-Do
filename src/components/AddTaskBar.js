import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import GlassCard from './GlassCard';
import CalendarPicker from './CalendarPicker';
import { colors } from '../theme/colors';
import { daysLeft, formatDMY, tomorrow } from '../utils/dates';

// Compact bar: task name + due date picked from a small calendar + add button.
export default function AddTaskBar({ onAdd }) {
  const [title, setTitle] = useState('');
  const [due, setDue] = useState(tomorrow());
  const [calendarOpen, setCalendarOpen] = useState(false);

  const submit = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), due);
    setTitle('');
    setDue(tomorrow());
    setCalendarOpen(false);
  };

  // Live feedback: how many days the chosen date is from today.
  const d = daysLeft(due);
  const hint = d < 0 ? `Vencida hace ${-d} d` : d === 0 ? 'Vence hoy' : `Faltan ${d} d`;

  return (
    <GlassCard radius={26}>
      <View style={styles.row}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={submit}
          placeholder="Nueva tarea…"
          placeholderTextColor={colors.textSoft}
          style={styles.input}
        />
        <Pressable onPress={submit} style={styles.add}>
          <Text style={styles.addText}>+</Text>
        </Pressable>
      </View>

      <View style={styles.dateRow}>
        <Pressable onPress={() => setCalendarOpen((open) => !open)} style={styles.date}>
          <Text style={styles.dateText}>📅 {formatDMY(due)}</Text>
        </Pressable>
        <Text style={styles.hint}>{hint}</Text>
      </View>

      {calendarOpen && (
        <CalendarPicker
          value={due}
          onSelect={(timestamp) => {
            setDue(timestamp);
            setCalendarOpen(false);
          }}
        />
      )}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, color: colors.text, fontSize: 17, paddingVertical: 6, outlineStyle: 'none' },
  add: {
    width: 36, height: 36, borderRadius: 18, marginLeft: 8,
    backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center',
  },
  addText: { color: colors.text, fontSize: 22, marginTop: -2 },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  date: { paddingVertical: 5, paddingHorizontal: 12, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)' },
  dateText: { color: colors.text, fontSize: 15 },
  hint: { color: colors.textSoft, fontSize: 14 },
});
