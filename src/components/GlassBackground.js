import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

// Colorful backdrop; the glass cards need something vivid to blur.
export default function GlassBackground({ children }) {
  return (
    <LinearGradient colors={colors.backgroundGradient} style={styles.fill}>
      <View style={[styles.blob, styles.a, { backgroundColor: colors.blobs[0] }]} />
      <View style={[styles.blob, styles.b, { backgroundColor: colors.blobs[1] }]} />
      <View style={[styles.blob, styles.c, { backgroundColor: colors.blobs[2] }]} />
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // overflow hidden: the decorative blobs extend past the screen edge
  fill: { flex: 1, overflow: 'hidden' },
  blob: { position: 'absolute', width: 260, height: 260, borderRadius: 130, opacity: 0.55 },
  a: { top: -60, left: -80 },
  b: { top: 280, right: -100 },
  c: { bottom: -80, left: 20 },
});
