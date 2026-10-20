import { Pressable, StyleSheet, Text, View } from 'react-native';
import GlassCard from './GlassCard';
import { colors } from '../theme/colors';
import { daysLeft, formatLeft, urgencyColor } from '../utils/dates';

// One horizontal bar: name on the left, colored time chip on the right.
// Tapping the chip cycles days -> weeks -> months.
export default function TaskRow({ task, onCycleUnit, onMove, onRemove }) {
  const days = daysLeft(task.due);

  return (
    <GlassCard radius={20} style={styles.card}>
      <View style={styles.row}>
        <View style={styles.arrows}>
          <Pressable onPress={() => onMove(task.id, -1)}><Text style={styles.arrow}>▲</Text></Pressable>
          <Pressable onPress={() => onMove(task.id, 1)}><Text style={styles.arrow}>▼</Text></Pressable>
        </View>

        <Text style={styles.title} numberOfLines={1}>{task.title}</Text>

        <Pressable onPress={() => onCycleUnit(task.id)} style={[styles.chip, { backgroundColor: urgencyColor(days) }]}>
          <Text style={styles.chipText}>{days < 0 ? '-' : ''}{formatLeft(days, task.unit)}</Text>
        </Pressable>

        <Pressable onPress={() => onRemove(task.id)} style={styles.remove}>
          <Text style={styles.removeText}>✕</Text>
        </Pressable>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center' },
  arrows: { marginRight: 10 },
  arrow: { color: colors.textSoft, fontSize: 11, lineHeight: 15 },
  title: { flex: 1, color: colors.text, fontSize: 17, fontWeight: '500' },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, marginLeft: 10 },
  chipText: { color: '#1a1a1a', fontWeight: '700', fontSize: 14 },
  remove: { marginLeft: 12 },
  removeText: { color: colors.textSoft, fontSize: 16 },
});
