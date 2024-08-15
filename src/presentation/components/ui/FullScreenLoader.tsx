import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useThemeContext } from '../../hooks/shared/useThemeContext';

//* Muestra un ActivityIndicator en pantalla completa, es decir, un spinner de carga que ocupa toda la pantalla
export const FullScreenLoader = () => {
  const { theme } = useThemeContext();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}>
      <ActivityIndicator size={50} />
    </View>
  );
}
