import defaultCover from '@/assets/images/default-playlist-cover.png';
import s from './PlaylistCover.module.css';
import type { Images } from '@/common/types';
import type { ChangeEvent } from 'react';
import {
  useDeletePlaylistCoverMutation,
  useUploadPlaylistCoverMutation,
} from '@/features/playlists/api/playlistsApi.ts';
import { toast } from 'react-toastify';
import { Button } from '@/common/components';

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

    if (!file) return;
    if (!acceptedTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, and GIF files are allowed.');
    }
    if (file.size > maxFileSize) {
      toast.error('File size exceeds the maximum limit of 1MB.');
      return;
    }
    uploadPlaylistCover({ playlistId, file });
  };

  const deleteCoverHandler = () => deletePlaylistCover(playlistId);

  return (
    <div className={s.coverWrapper}>
      <img src={src} className={s.cover} alt={'cover'} width={250} />
      <div className={s.inputWrapper}>
        <label className={s.inputLabel}>
          <input
            type="file"
            src={defaultCover}
            className={s.input}
            onChange={uploadCoverHandler}
            accept={'image/jpeg,image/png,image/gif'}
          />
          <span>Upload cover</span>
        </label>
        {originalCover && (
          <Button onClick={deleteCoverHandler} className={s.deleteButton}>
            Delete cover
          </Button>
        )}
      </div>
    </div>
  );
};
