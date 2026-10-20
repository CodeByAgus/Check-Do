import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlassBackground from '../components/GlassBackground';
import AddTaskBar from '../components/AddTaskBar';
import TaskRow from '../components/TaskRow';
import { useTasks } from '../hooks/useTasks';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { tasks, sortMode, addTask, removeTask, cycleUnit, move, sortByDate } = useTasks();

  return (
    <GlassBackground>
      {/* maxWidth keeps the layout phone-like when opened on a wide browser */}
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]}
        keyboardShouldPersistTaps="handled"
      >
        <AddTaskBar onAdd={addTask} />

        <View style={styles.header}>
          <Text style={styles.title}>Tareas</Text>
          <Pressable onPress={sortByDate}>
            <Text style={styles.sort}>
              {sortMode === 'date' ? 'Orden: por fecha' : 'Orden manual · volver a fecha'}
            </Text>
          </Pressable>
        </View>

        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} onCycleUnit={cycleUnit} onMove={move} onRemove={removeTask} />
        ))}

        {tasks.length === 0 && <Text style={styles.empty}>Sin tareas. Agrega la primera arriba.</Text>}
      </ScrollView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, width: '100%', maxWidth: 560, alignSelf: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginVertical: 18 },
  title: { color: colors.text, fontSize: 28, fontWeight: '700' },
  sort: { color: colors.textSoft, fontSize: 13 },
  empty: { color: colors.textSoft, textAlign: 'center', marginTop: 30 },
});
