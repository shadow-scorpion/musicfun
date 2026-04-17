import { CreatePlaylistForm } from '@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx';
import s from './PlaylistsPage.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlaylistItem } from '@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem.tsx';
import { UpdatePlaylistForm } from '@/features/playlists/ui/PlaylistsPage/PlaylistItem/UpdatePlaylistForm/UpdatePlaylistForm.tsx';
import { type PlaylistData, type UpdatePlaylistInput, useGetPlaylistsQuery } from '@/features/playlists';

export const PlaylistsPage = () => {
  const { data } = useGetPlaylistsQuery();

  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistInput>();

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
    <div className={s.container}>
      <h1 className={s.title}>Playlists page</h1>
      <CreatePlaylistForm />
      <div className={s.playlistsWrap}>
        {data?.data?.map((playlist) => {
          const isEditing = playlistId === playlist.id;
          return (
            <div key={playlist.id} className={s.playlistWrap}>
              {isEditing ? (
                <UpdatePlaylistForm
                  playlist={playlist}
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
    </div>
  );
};
