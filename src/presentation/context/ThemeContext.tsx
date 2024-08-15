import { PropsWithChildren, createContext } from 'react';
import { useColorScheme } from 'react-native';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { PaperProvider, adaptNavigationTheme } from 'react-native-paper';

//* Adaptar los temas de navegación a los temas de react-native-paper.
//* Los temas de navegación son los temas que se utilizan en las pantallas de navegación.
//* Los temas pueden ser light o dark.
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

//* Context para modo light y dark
export const ThemeContext = createContext({
  isDark: false,
  theme: LightTheme,
});


//* Permite a los componentes hijos acceder al tema de la aplicación
//* tanto en el react-native-paper como en el  react-navigation.
export const ThemeContextProvider = ({children}: PropsWithChildren) => {
  //* Obtener el esquema de color del dispositivo, ya sea light o dark.
  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';
  const theme = isDark ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <ThemeContext.Provider value={{ isDark, theme }}>
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
