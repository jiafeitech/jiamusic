import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import StackParamList from '../types/StackParamList';

type Props = NativeStackScreenProps<StackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  return (
    <View style={style.container}>
      <Text>Hello world</Text>
      <Button
        icon="music-circle"
        mode="contained"
        onPress={() => navigation.navigate('Player')}>
        Press me
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
