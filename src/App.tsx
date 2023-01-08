// Imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

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

// Native Stack
const Stack = createNativeStackNavigator<StackParamList>();

// App
export default function App() {
  return (
    <PocketBaseProvider>
      <SongListProvider>
        <CurrentSongProvider>
          <PaperProvider>
            <NavigationContainer>
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
