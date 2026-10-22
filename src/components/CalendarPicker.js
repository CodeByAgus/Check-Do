import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { MONTH_NAMES, monthCells } from '../utils/dates';

const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

// Small month calendar. `value` is the selected timestamp; `onSelect` gets the new one.
export default function CalendarPicker({ value, onSelect }) {
  const selected = new Date(value);
  const today = new Date();
  // Month being displayed (can differ from the selected one while browsing).
  const [view, setView] = useState({ year: selected.getFullYear(), month: selected.getMonth() });

  const shift = (step) =>
    setView(({ year, month }) => {
      const d = new Date(year, month + step, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  const isSame = (date, day) =>
    date.getFullYear() === view.year && date.getMonth() === view.month && date.getDate() === day;

  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <Pressable onPress={() => shift(-1)} style={styles.nav}><Text style={styles.navText}>‹</Text></Pressable>
        <Text style={styles.month}>{MONTH_NAMES[view.month]} {view.year}</Text>
        <Pressable onPress={() => shift(1)} style={styles.nav}><Text style={styles.navText}>›</Text></Pressable>
      </View>

      <View style={styles.grid}>
        {WEEKDAYS.map((w) => (
          <Text key={w} style={[styles.cell, styles.weekday]}>{w}</Text>
        ))}
        {monthCells(view.year, view.month).map((day, i) =>
          day === null ? (
            <View key={`empty-${i}`} style={styles.cell} />
          ) : (
            <Pressable
              key={day}
              onPress={() => onSelect(new Date(view.year, view.month, day).getTime())}
              style={styles.cell}
            >
              <View style={[styles.day, isSame(today, day) && styles.today, isSame(selected, day) && styles.selected]}>
                <Text style={[styles.dayText, isSame(selected, day) && styles.selectedText]}>{day}</Text>
              </View>
            </Pressable>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { marginTop: 12, padding: 10, borderRadius: 18, backgroundColor: colors.tint },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  nav: { width: 32, height: 28, alignItems: 'center', justifyContent: 'center' },
  navText: { color: colors.primary, fontSize: 22, marginTop: -3 },
  month: { color: colors.ink, fontWeight: '700', fontSize: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  // 7 columns: each cell is one seventh of the row.
  cell: { width: `${100 / 7}%`, height: 34, alignItems: 'center', justifyContent: 'center' },
  weekday: { color: colors.inkSoft, fontSize: 12, textAlign: 'center', lineHeight: 34 },
  day: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  today: { borderWidth: 1, borderColor: colors.primary },
  selected: { backgroundColor: colors.primary },
  dayText: { color: colors.ink, fontSize: 14 },
  selectedText: { color: colors.onPrimary, fontWeight: '700' },
});
