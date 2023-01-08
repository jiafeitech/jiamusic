// Imports
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Types
import StackParamList from './types/StackParamList';

// Contexts
import { PocketBaseProvider } from './contexts/PocketBaseContext';
import { CurrentSongProvider } from './contexts/CurrentSongContext';
import { SongListProvider } from './contexts/SongListContext';

// Screens
import Home from './screens/Home';
import Player from './screens/Player';

// Native Stack
const Stack = createNativeStackNavigator<StackParamList>();

// App
export default function App() {
  return (
    <NativeBaseProvider>
      <PocketBaseProvider>
        <SongListProvider>
          <CurrentSongProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Player" component={Player} />
              </Stack.Navigator>
            </NavigationContainer>
          </CurrentSongProvider>
        </SongListProvider>
      </PocketBaseProvider>
    </NativeBaseProvider>
  );
}
