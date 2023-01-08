import { Box, Text, Button } from 'native-base';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import StackParamList from '../types/StackParamList';

type Props = NativeStackScreenProps<StackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  return (
    <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
      <Text>Home</Text>
      <Button shadow={2} onPress={() => navigation.navigate('Player')}>
        Player
      </Button>
    </Box>
  );
}
