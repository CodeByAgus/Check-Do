import { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
import { useTasks } from './src/hooks/useTasks';
import { colors } from './src/theme/colors';

export default function App() {
  // Tasks live here so they survive switching between screens.
  const api = useTasks();
  const [screen, setScreen] = useState('home'); // 'home' | 'create'

  // Web only: register the service worker that makes the app work offline.
  useEffect(() => {
    if (Platform.OS === 'web' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  return (
    <SafeAreaProvider style={styles.outer}>
      <StatusBar style="dark" />
      {/* maxWidth keeps the layout phone-like when opened on a wide browser */}
      <View style={styles.app}>
        {screen === 'home' ? (
          <HomeScreen api={api} onAdd={() => setScreen('create')} />
        ) : (
          <CreateTaskScreen
            onBack={() => setScreen('home')}
            onCreate={(task) => {
              api.addTask(task);
              setScreen('home');
            }}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: colors.outer, alignItems: 'center' },
  app: { flex: 1, width: '100%', maxWidth: 480, overflow: 'hidden' },
});
