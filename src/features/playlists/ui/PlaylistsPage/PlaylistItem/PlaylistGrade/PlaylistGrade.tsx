import { ImHeart, ImHeartBroken } from 'react-icons/im';
import s from './PlaylistGrade.module.css';
import {
  useDislikePlaylistMutation,
  useLikePlaylistMutation,
  useRemoveUserReactionMutation,
} from '@/features/playlists/api/playlistsApi.ts';
import type { PlaylistData } from '@/features/playlists';

type Props = {
  playlist: PlaylistData;
};

export const PlaylistGrade = ({ playlist }: Props) => {
  const [likePlaylist] = useLikePlaylistMutation();
  const [dislikePlaylist] = useDislikePlaylistMutation();
  const [removeUserReaction] = useRemoveUserReactionMutation();

  return (
    <div className={s.gradeWrap}>
      <ImHeart
        className={playlist.attributes.likesCount ? s.like : ''}
        onClick={
          playlist.attributes.likesCount
            ? () => removeUserReaction({ playlistId: playlist.id })
            : () => likePlaylist({ playlistId: playlist.id })
        }
        cursor="pointer"
      />
      <ImHeartBroken
        className={playlist.attributes.dislikesCount ? s.dislike : ''}
        onClick={
          playlist.attributes.dislikesCount
            ? () => removeUserReaction({ playlistId: playlist.id })
            : () => dislikePlaylist({ playlistId: playlist.id })
        }
        cursor="pointer"
      />
    </div>
  );
};
