import s from './PlaylistItem.module.css';
import { type PlaylistData, useRemovePlaylistMutation } from '@/features/playlists';
import { Button } from '@/common/components/Button/Button.tsx';
import { PlaylistCover } from '@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistCover/PlaylistCover.tsx';
import { PlaylistDescription } from '@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistDescription/PlaylistDescription.tsx';
import { PlaylistGrade } from '@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistGrade/PlaylistGrade.tsx';

type Props = {
  playlist: PlaylistData;
  onClickEdit: (playlist: PlaylistData) => void;
};

export const PlaylistItem = ({ playlist, onClickEdit }: Props) => {
  const [removePlaylist] = useRemovePlaylistMutation();

  const removePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure want to delete playlist?')) {
      removePlaylist(playlistId);
    }
  };

  return (
    <>
      <div>
        <PlaylistCover playlistId={playlist.id} images={playlist.attributes.images} />
        <PlaylistDescription attributes={playlist.attributes} />
      </div>
      <div className={s.buttonGradeWrap}>
        <div className={s.buttonWrap}>
          <Button className={s.button} onClick={() => removePlaylistHandler(playlist.id)}>
            Delete
          </Button>
          <Button className={s.button} onClick={() => onClickEdit(playlist)}>
            Edit
          </Button>
        </div>
        <PlaylistGrade playlist={playlist} />
      </div>
    </>
  );
};
