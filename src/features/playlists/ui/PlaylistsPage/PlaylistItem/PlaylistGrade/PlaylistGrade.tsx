import { ImHeart } from 'react-icons/im';
import s from './PlaylistGrade.module.css';
import { useLikePlaylistMutation } from '@/features/playlists/api/playlistsApi.ts';
import type { PlaylistData } from '@/features/playlists';

type Props = {
  playlist: PlaylistData;
};

export const PlaylistGrade = ({ playlist }: Props) => {
  const [likePlaylist] = useLikePlaylistMutation();

  return (
    <div className={s.gradeWrap}>
      <ImHeart
        className={playlist.attributes.likesCount ? s.like : ''}
        onClick={() => likePlaylist({ playlistId: playlist.id })}
        cursor="pointer"
      />
    </div>
  );
};
