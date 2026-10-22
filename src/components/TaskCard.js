import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, getCategory } from '../theme/colors';
import { daysLeft, formatChip, urgencyColor } from '../utils/dates';

const SPIRAL_RINGS = 4;

// White "notebook" card: category icon + label and delete on top, big title,
// then the description and the colored time chip. Tapping the chip cycles
// days -> weeks -> months -> due date.
export default function TaskCard({ task, canMove, onCycleUnit, onMove, onRemove }) {
  const days = daysLeft(task.due);
  const category = getCategory(task.category);

  return (
    <View style={styles.card}>
      {/* Spiral binding on the left edge */}
      <View style={styles.spiral}>
        {Array.from({ length: SPIRAL_RINGS }, (_, i) => (
          <View key={i} style={styles.ring} />
        ))}
      </View>

      <View style={styles.topRow}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>{category.icon}</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{category.label}</Text>
        </View>
        <View style={styles.spacer} />
        {canMove && (
          <View style={styles.arrows}>
            <Pressable onPress={() => onMove(task.id, -1)}><Text style={styles.arrow}>▲</Text></Pressable>
            <Pressable onPress={() => onMove(task.id, 1)}><Text style={styles.arrow}>▼</Text></Pressable>
          </View>
        )}
        <Pressable onPress={() => onRemove(task.id)} style={styles.remove}>
          <Text style={styles.removeText}>✕</Text>
        </Pressable>
      </View>

      <Text style={styles.title} numberOfLines={2}>{task.title}</Text>

      <View style={styles.bottomRow}>
        <Text style={styles.description} numberOfLines={2}>{task.description}</Text>
        <Pressable onPress={() => onCycleUnit(task.id)} style={[styles.chip, { backgroundColor: urgencyColor(days) }]}>
          <Text style={styles.chipText}>
            {task.unit !== 'date' && days < 0 ? '-' : ''}{formatChip(task.due, task.unit)}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface, borderRadius: 24, paddingVertical: 14, paddingLeft: 26, paddingRight: 16,
    marginBottom: 14, overflow: 'hidden',
  },
  spiral: { position: 'absolute', left: 0, top: 12, bottom: 12, justifyContent: 'space-around' },
  ring: { width: 14, height: 7, borderTopRightRadius: 4, borderBottomRightRadius: 4, backgroundColor: colors.canvas },
  topRow: { flexDirection: 'row', alignItems: 'center' },
  icon: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.tint, alignItems: 'center', justifyContent: 'center',
  },
  iconText: { fontSize: 18 },
  pill: {
    marginLeft: 10, paddingHorizontal: 12, paddingVertical: 3, borderRadius: 14, borderWidth: 1.5, borderColor: colors.line,
  },
  pillText: { color: colors.ink, fontSize: 13 },
  spacer: { flex: 1 },
  arrows: { flexDirection: 'row', marginRight: 8 },
  arrow: { color: colors.inkSoft, fontSize: 11, paddingHorizontal: 5 },
  remove: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.tint, alignItems: 'center', justifyContent: 'center' },
  removeText: { color: colors.ink, fontSize: 13, fontWeight: '700' },
  title: { color: colors.ink, fontSize: 24, fontWeight: '800', marginTop: 10 },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  description: { flex: 1, color: colors.ink, fontSize: 12, marginRight: 10 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 16 },
  chipText: { color: '#1a1a1a', fontWeight: '800', fontSize: 15 },
});
