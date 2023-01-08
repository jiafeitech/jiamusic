import { Record } from 'pocketbase';
import { Image } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import { usePocketBase } from '../contexts/PocketBaseContext';

type Props = {
  song: Record;
};

export default function SongItem({ song }: Props) {
  const pb = usePocketBase();

  return (
    <List.Item
      title={song.title}
      description={song.artist}
      left={props => (
        <List.Icon
          {...props}
          icon={({ size }) => (
            <Image
              source={{
                uri: pb?.getFileUrl(song, song.album_cover),
              }}
              style={{ width: size * 2.25, height: size * 2.25 }}
            />
          )}
        />
      )}
      right={props => (
        <IconButton
          {...props}
          icon="dots-horizontal"
          onPress={() => console.log(song.title)}
        />
      )}
      onPress={() => console.log(song.title)}
    />
  );
}
