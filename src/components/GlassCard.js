import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

// The "liquid glass" building block: blur + soft border + top light reflection.
export default function GlassCard({ children, style, radius = 22 }) {
  return (
    <View style={[styles.shell, { borderRadius: radius }, style]}>
      <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
      {/* Light reflection that fades toward the bottom */}
      <LinearGradient
        colors={['rgba(255,255,255,0.28)', 'rgba(255,255,255,0.03)']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: colors.glassTint,
  },
  content: { paddingHorizontal: 16, paddingVertical: 12 },
});
