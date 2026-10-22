import { Pressable, StyleSheet, Text, View } from 'react-native';
import { categories, colors } from '../theme/colors';

// Row of selectable category pills (single choice).
export default function CategoryChips({ value, onChange }) {
  return (
    <View style={styles.row}>
      {categories.map((c) => {
        const active = c.id === value;
        return (
          <Pressable key={c.id} onPress={() => onChange(c.id)} style={[styles.chip, active && styles.chipActive]}>
            <Text style={[styles.text, active && styles.textActive]}>{c.icon} {c.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 16, borderWidth: 1.5,
    borderColor: colors.line, marginRight: 8, marginBottom: 8,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  text: { color: colors.inkSoft, fontSize: 13, fontWeight: '600' },
  textActive: { color: colors.onPrimary },
});
