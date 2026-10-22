import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, getCategory } from '../theme/colors';
import { daysLeft, formatChip, urgencyColor } from '../utils/dates';

// White card: category icon, title and description. The colored chip sits in the
// bottom-right corner; tapping it cycles days -> weeks -> months -> due date.
export default function TaskCard({ task, canMove, onCycleUnit, onMove, onRemove }) {
  const days = daysLeft(task.due);
  const category = getCategory(task.category);

  return (
    <View style={styles.card}>
      <View style={styles.icon}>
        <Text style={styles.iconText}>{category.icon}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>{task.title}</Text>
        {!!task.description && <Text style={styles.description} numberOfLines={2}>{task.description}</Text>}
      </View>

      <View style={styles.controls}>
        {canMove && (
          <>
            <Pressable onPress={() => onMove(task.id, -1)}><Text style={styles.control}>▲</Text></Pressable>
            <Pressable onPress={() => onMove(task.id, 1)}><Text style={styles.control}>▼</Text></Pressable>
          </>
        )}
        <Pressable onPress={() => onRemove(task.id)}><Text style={styles.control}>✕</Text></Pressable>
      </View>

      <Pressable onPress={() => onCycleUnit(task.id)} style={[styles.chip, { backgroundColor: urgencyColor(days) }]}>
        <Text style={styles.chipText}>
          {task.unit !== 'date' && days < 0 ? '-' : ''}{formatChip(task.due, task.unit)}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.surface, borderRadius: 18,
    padding: 14, paddingBottom: 40, marginBottom: 14, overflow: 'hidden',
  },
  icon: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: colors.tint, alignItems: 'center', justifyContent: 'center',
  },
  iconText: { fontSize: 22 },
  body: { flex: 1, marginLeft: 12 },
  title: { color: colors.ink, fontSize: 17, fontWeight: '700' },
  description: { color: colors.inkSoft, fontSize: 13, marginTop: 3 },
  controls: { alignItems: 'center', marginLeft: 8 },
  control: { color: colors.inkSoft, fontSize: 12, lineHeight: 20, paddingHorizontal: 4 },
  chip: {
    position: 'absolute', right: 0, bottom: 0, paddingHorizontal: 16, paddingVertical: 8,
    borderTopLeftRadius: 16,
  },
  chipText: { color: '#1a1a1a', fontWeight: '800', fontSize: 14 },
});
