import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import GlassCard from './GlassCard';
import { colors } from '../theme/colors';

// Compact bar: task name + "due in N days" stepper + add button.
export default function AddTaskBar({ onAdd }) {
  const [title, setTitle] = useState('');
  const [days, setDays] = useState(1);

  const submit = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), days);
    setTitle('');
    setDays(1);
  };

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

      <View style={styles.stepper}>
        <Text style={styles.label}>Vence en {days} {days === 1 ? 'día' : 'días'}</Text>
        <View style={styles.row}>
          <Step label="−" onPress={() => setDays((d) => Math.max(0, d - 1))} />
          <Step label="+" onPress={() => setDays((d) => d + 1)} />
          <Step label="+7" onPress={() => setDays((d) => d + 7)} />
        </View>
      </View>
    </GlassCard>
  );
}

function Step({ label, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.step}>
      <Text style={styles.stepText}>{label}</Text>
    </Pressable>
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
  stepper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  label: { color: colors.textSoft, fontSize: 14 },
  step: {
    minWidth: 34, height: 28, borderRadius: 14, marginLeft: 6, paddingHorizontal: 8,
    backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center',
  },
  stepText: { color: colors.text, fontWeight: '600' },
});
