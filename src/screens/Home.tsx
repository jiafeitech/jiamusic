import { ScrollView, RefreshControl } from 'react-native';
import { useState } from 'react';
import { useSongList } from '../contexts/SongListContext';
import SongItem from '../components/SongItem';

export default function Home() {
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
