// Imports
import { NavigationContainer } from '@react-navigation/native';
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

// Tabs Navigator
const Tab = createMaterialBottomTabNavigator<TabParamList>();

// App
export default function App() {
  const colorScheme = useColorScheme();

  return (
    <PocketBaseProvider>
      <SongListProvider>
        <CurrentSongProvider>
          <NavigationContainer>
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
        </CurrentSongProvider>
      </SongListProvider>
    </PocketBaseProvider>
  );
}
