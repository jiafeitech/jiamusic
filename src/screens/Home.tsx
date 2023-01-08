import { ScrollView, RefreshControl } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import StackParamList from '../types/StackParamList';
import { useState } from 'react';
import { useSongList } from '../contexts/SongListContext';
import SongItem from '../components/SongItem';

type Props = NativeStackScreenProps<StackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  const songList = useSongList();

  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    setRefreshing(true);
    songList.refresh().then(() => setRefreshing(false));
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {songList.list.map(song => (
        <SongItem song={song} key={song.id} />
      ))}
    </ScrollView>
  );
}
