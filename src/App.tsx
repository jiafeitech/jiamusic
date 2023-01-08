// Imports
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import { useColorScheme } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// Types
import TabParamList from './types/TabParamList';

// Contexts
import { PocketBaseProvider } from './contexts/PocketBaseContext';
import { CurrentSongProvider } from './contexts/CurrentSongContext';
import { SongListProvider } from './contexts/SongListContext';

// Screens
import Home from './screens/Home';
import Player from './screens/Player';
import Search from './screens/Search';

// Theme
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

// Tabs Navigator
const Tab = createMaterialBottomTabNavigator<TabParamList>();

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
              <Tab.Navigator initialRouteName="Home">
                <Tab.Screen
                  name="Home"
                  options={{
                    title: 'Explore',
                    tabBarIcon: 'music-note-outline',
                  }}
                  component={Home}
                />
                <Tab.Screen
                  name="Player"
                  options={{
                    title: 'JIΛmusic',
                    tabBarIcon: 'headphones',
                  }}
                  component={Player}
                />
                <Tab.Screen
                  name="Search"
                  options={{ title: 'Search', tabBarIcon: 'magnify' }}
                  component={Search}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </CurrentSongProvider>
      </SongListProvider>
    </PocketBaseProvider>
  );
}
