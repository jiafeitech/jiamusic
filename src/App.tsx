// Imports
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
const Tab = createBottomTabNavigator<TabParamList>();

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
                }}
                component={Home}
              />
              <Tab.Screen
                name="Player"
                options={{
                  title: 'JIΛmusic',
                }}
                component={Player}
              />
              <Tab.Screen
                name="Search"
                options={{ title: 'Search' }}
                component={Search}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </CurrentSongProvider>
      </SongListProvider>
    </PocketBaseProvider>
  );
}
