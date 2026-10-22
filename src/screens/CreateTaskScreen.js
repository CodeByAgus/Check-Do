import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CalendarPicker from '../components/CalendarPicker';
import CategoryChips from '../components/CategoryChips';
import { colors } from '../theme/colors';
import { daysLeft, formatLongDate, tomorrow } from '../utils/dates';

// Form screen: name, category, date (small calendar) and description.
export default function CreateTaskScreen({ onCreate, onBack }) {
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('work');
  const [due, setDue] = useState(tomorrow());
  const [description, setDescription] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);

  const canCreate = title.trim().length > 0;

  const submit = () => {
    if (!canCreate) return;
    onCreate({ title: title.trim(), description: description.trim(), category, due });
  };

  // Live feedback: how many days the chosen date is from today.
  const d = daysLeft(due);
  const hint = d < 0 ? `Vencida hace ${-d} d` : d === 0 ? 'Vence hoy' : `Faltan ${d} d`;

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topRow}>
          <Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
          <Text style={styles.title}>Nueva tarea</Text>
        </View>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={submit}
          placeholder="Ej. Reunión de equipo"
          placeholderTextColor={colors.inkSoft}
          style={styles.input}
        />

        <Text style={[styles.label, styles.gap]}>Categoría</Text>
        <CategoryChips value={category} onChange={setCategory} />

        <Text style={[styles.label, styles.gap]}>Fecha</Text>
        <View style={styles.dateRow}>
          <View style={styles.dateInfo}>
            <Text style={styles.dateText}>{formatLongDate(due)}</Text>
            <Text style={styles.hint}>{hint}</Text>
          </View>
          <Pressable onPress={() => setCalendarOpen((open) => !open)} style={styles.calendarButton}>
            <Text style={styles.calendarIcon}>📅</Text>
          </Pressable>
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

        <Text style={[styles.label, styles.gap]}>Descripción</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Detalles opcionales"
          placeholderTextColor={colors.inkSoft}
          multiline
          style={[styles.input, styles.multiline]}
        />

        <Pressable onPress={submit} style={[styles.create, !canCreate && styles.createDisabled]}>
          <Text style={styles.createText}>Crear tarea</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  content: { padding: 24, paddingBottom: 40 },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  back: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.tint, alignItems: 'center', justifyContent: 'center' },
  backText: { color: colors.primary, fontSize: 26, marginTop: -4 },
  title: { color: colors.ink, fontSize: 26, fontWeight: '800', marginLeft: 14 },
  label: { color: colors.primary, fontSize: 13, fontWeight: '700' },
  gap: { marginTop: 22 },
  input: {
    color: colors.ink, fontSize: 17, fontWeight: '600', paddingVertical: 8,
    borderBottomWidth: 2, borderBottomColor: colors.line, outlineStyle: 'none',
  },
  multiline: { minHeight: 64, textAlignVertical: 'top' },
  dateRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  dateInfo: { flex: 1, borderBottomWidth: 2, borderBottomColor: colors.line, paddingBottom: 8, marginRight: 14 },
  dateText: { color: colors.ink, fontSize: 17, fontWeight: '600' },
  hint: { color: colors.inkSoft, fontSize: 13, marginTop: 2 },
  calendarButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  calendarIcon: { fontSize: 20 },
  create: { marginTop: 32, backgroundColor: colors.primary, borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
  createDisabled: { opacity: 0.45 },
  createText: { color: colors.onPrimary, fontSize: 17, fontWeight: '700' },
});
