import defaultCover from '@/assets/images/default-playlist-cover.png';
import s from './PlaylistCover.module.css';
import type { Images } from '@/common/types';
import type { ChangeEvent } from 'react';
import { useDeletePlaylistCoverMutation, useUploadPlaylistCoverMutation } from '@/features/playlists/api/playlistsApi.ts';

type Props = {
  images: Images;
  playlistId: string;
};

export const PlaylistCover = ({ images, playlistId }: Props) => {
  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation();
  const [deletePlaylistCover] = useDeletePlaylistCoverMutation();

  const originalCover = images.main?.find((cover) => cover.type === 'original');
  const src = originalCover ? originalCover.url : defaultCover;

  const uploadCoverHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxFileSize = 1024 * 1024;

    const file = e.target.files?.length && e.target.files?.[0];
    const isValidType = file && acceptedTypes.includes(file.type);

    if (!isValidType) return;
    if (file.size > maxFileSize) {
      alert('File size exceeds the maximum limit of 1MB.');
      return;
    }
    uploadPlaylistCover({ playlistId, file });
  };

  const deleteCoverHandler = () => deletePlaylistCover(playlistId);

  return (
    <div>
      <img src={src} className={s.cover} alt={'cover'} width={250} />
      <input type="file" src={defaultCover} onChange={uploadCoverHandler} accept={'image/jpeg,image/png,image/gif'} />
      {originalCover && <button onClick={deleteCoverHandler}>Delete</button>}
    </div>
  );
};
