// Imports
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import { useColorScheme } from 'react-native';
import { useEffect } from 'react';

// Types
import StackParamList from './types/StackParamList';

// Contexts
import { PocketBaseProvider } from './contexts/PocketBaseContext';
import { CurrentSongProvider } from './contexts/CurrentSongContext';
import { SongListProvider } from './contexts/SongListContext';

// Components
import Navbar from './components/Navbar';

// Screens
import Home from './screens/Home';
import Player from './screens/Player';

// Theme
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

// Native Stack
const Stack = createNativeStackNavigator<StackParamList>();

// App
export default function App() {
  const colorScheme = useColorScheme();

  return (
    <PocketBaseProvider>
      <SongListProvider>
        <CurrentSongProvider>
          <PaperProvider
            theme={
              colorScheme == 'dark' ? CombinedDarkTheme : CombinedDefaultTheme
            }>
            <NavigationContainer
              theme={
                colorScheme == 'dark' ? CombinedDarkTheme : CombinedDefaultTheme
              }>
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                  header: props => <Navbar {...props} />,
                }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Player" component={Player} />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </CurrentSongProvider>
      </SongListProvider>
    </PocketBaseProvider>
  );
}
