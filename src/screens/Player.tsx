import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function Player() {
  return (
    <View style={style.container}>
      <Text>Player</Text>
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
