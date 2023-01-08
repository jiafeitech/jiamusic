import { Record } from 'pocketbase';
import { Image, Text } from 'react-native';
import { usePocketBase } from '../contexts/PocketBaseContext';

type Props = {
  song: Record;
};

export default function SongItem({ song }: Props) {
  const pb = usePocketBase();

  return <Text>{song.name}</Text>;
}
