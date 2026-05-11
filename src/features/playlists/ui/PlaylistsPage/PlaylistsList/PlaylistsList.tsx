import type { PlaylistData, PlaylistInput } from '@/features/playlists';
import { useState } from 'react';
import s from './PlaylistsList.module.css';
import { useForm } from 'react-hook-form';
import { UpdatePlaylistForm } from '@/features/playlists/ui/PlaylistsPage/PlaylistItem/UpdatePlaylistForm/UpdatePlaylistForm.tsx';
import { PlaylistItem } from '@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem.tsx';

type Props = {
  playlist: PlaylistData[];
  isLoading: boolean;
};

export const PlaylistsList = ({ playlist, isLoading }: Props) => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<PlaylistInput>();

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map((tag) => tag.id),
      });
      setPlaylistId(playlist.id);
    } else {
      setPlaylistId(null);
    }
  };

  return (
    <div className={s.playlistsList}>
      {!playlist.length && !isLoading && <h2>No playlists found</h2>}
      {playlist.map((playlist) => {
        const isEditing = playlistId === playlist.id;
        return (
          <div key={playlist.id} className={s.playlistItem}>
            {isEditing ? (
              <UpdatePlaylistForm
                playlistId={playlistId}
                setPlaylistId={setPlaylistId}
                register={register}
                onClickCancelEdit={editPlaylistHandler}
                handleSubmit={handleSubmit}
              />
            ) : (
              <PlaylistItem playlist={playlist} onClickEdit={editPlaylistHandler} />
            )}
          </div>
        );
      })}
    </div>
  );
};
