import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { sameDay, weekdayLetter } from '../utils/dates';

// Horizontal row of upcoming days. Tap one to show only its tasks, tap again to clear.
// A small dot marks days that have at least one task due.
export default function DayStrip({ days, selected, tasks, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {days.map((day) => {
        const active = selected !== null && sameDay(selected, day);
        const hasTask = tasks.some((t) => sameDay(t.due, day));
        return (
          <Pressable
            key={day}
            onPress={() => onSelect(active ? null : day)}
            style={[styles.box, active && styles.boxActive]}
          >
            <Text style={[styles.number, active && styles.activeText]}>{String(new Date(day).getDate()).padStart(2, '0')}</Text>
            <Text style={[styles.letter, active && styles.activeText]}>{weekdayLetter(day)}</Text>
            <View style={[styles.dot, hasTask && (active ? styles.dotActive : styles.dotOn)]} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingVertical: 4 },
  box: {
    width: 52, height: 64, marginRight: 10, borderRadius: 14, borderWidth: 1.5,
    borderColor: colors.line, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
  },
  boxActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  number: { fontSize: 18, fontWeight: '700', color: colors.ink },
  letter: { fontSize: 11, color: colors.inkSoft },
  activeText: { color: colors.onPrimary },
  dot: { width: 5, height: 5, borderRadius: 3, marginTop: 4 },
  dotOn: { backgroundColor: colors.primary },
  dotActive: { backgroundColor: colors.onPrimary },
});
