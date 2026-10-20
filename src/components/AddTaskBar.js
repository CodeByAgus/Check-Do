import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import GlassCard from './GlassCard';
import { colors } from '../theme/colors';
import { daysLeft, maskDMY, parseDMY, tomorrowDMY } from '../utils/dates';

// Compact bar: task name + due date (dd/mm/yyyy) + add button.
export default function AddTaskBar({ onAdd }) {
  const [title, setTitle] = useState('');
  const [dateText, setDateText] = useState(tomorrowDMY());

  const due = parseDMY(dateText);
  const invalid = dateText.length === 10 && due === null;

  const submit = () => {
    if (!title.trim() || due === null) return;
    onAdd(title.trim(), due);
    setTitle('');
    setDateText(tomorrowDMY());
  };

  // Live feedback: how many days the typed date is from today.
  let hint = 'Formato dd/mm/aaaa';
  if (invalid) hint = 'Fecha no válida';
  else if (due !== null) {
    const d = daysLeft(due);
    hint = d < 0 ? `Vencida hace ${-d} d` : d === 0 ? 'Vence hoy' : `Faltan ${d} d`;
  }

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
        <TextInput
          value={dateText}
          onChangeText={(t) => setDateText(maskDMY(t))}
          onSubmitEditing={submit}
          placeholder="dd/mm/aaaa"
          placeholderTextColor={colors.textSoft}
          keyboardType="number-pad"
          maxLength={10}
          style={[styles.date, invalid && styles.dateInvalid]}
        />
        <Text style={[styles.hint, invalid && styles.hintInvalid]}>{hint}</Text>
      </View>
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
  date: {
    color: colors.text, fontSize: 15, width: 120, paddingVertical: 4, paddingHorizontal: 10,
    borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', outlineStyle: 'none',
  },
  dateInvalid: { borderWidth: 1, borderColor: '#ff453a' },
  hint: { color: colors.textSoft, fontSize: 14 },
  hintInvalid: { color: '#ff453a' },
});
