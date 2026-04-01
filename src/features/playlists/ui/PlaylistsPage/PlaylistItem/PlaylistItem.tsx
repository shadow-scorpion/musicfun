import s from '@/features/playlists/ui/PlaylistsPage/PlaylistsPage.module.css';
import { type PlaylistData, useRemovePlaylistMutation } from '@/features/playlists';
import { Button } from '@/common/components/Button/Button.tsx';

type Props = {
  playlist: PlaylistData;
  onClickEdit: (playlist: PlaylistData) => void;
};

export const PlaylistItem = ({ playlist, onClickEdit }: Props) => {
  const [removePlaylist] = useRemovePlaylistMutation();

  const removePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure want to delete playlist?')) {
      removePlaylist(playlistId);
      console.log('Playlist delete');
    }
  };

  return (
    <div>
      <div>title: {playlist.attributes.title}</div>
      <div>description: {playlist.attributes.description}</div>
      <div>userName: {playlist.attributes.user.name}</div>
      <div className={s.buttonWrap}>
        <Button onClick={() => removePlaylistHandler(playlist.id)}>Delete</Button>
        <Button onClick={() => onClickEdit(playlist)}>Edit</Button>
      </div>
    </div>
  );
};
