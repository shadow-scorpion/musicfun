import type { PlaylistAttributes } from '@/features/playlists';

type Props = {
  attributes: PlaylistAttributes;
};

export const PlaylistDescription = ({ attributes }: Props) => {
  return (
    <div>
      <div>title: {attributes.title}</div>
      <div>description: {attributes.description}</div>
      <div>userName: {attributes.user.name}</div>
    </div>
  );
};
