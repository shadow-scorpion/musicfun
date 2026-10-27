import type { PlaylistAttributes } from '@/features/playlists';
import s from './PlaylistDescription.module.css';

type Props = {
  attributes: PlaylistAttributes;
};

export const PlaylistDescription = ({ attributes }: Props) => {
  return (
    <div className={s.descriptionWrapp}>
      <p>Author: {attributes.user.name}</p>
      <p>Playlist name: {attributes.title}</p>
    </div>
  );
};
