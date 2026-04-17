import { type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister } from 'react-hook-form';
import { type PlaylistData, type UpdatePlaylistInput, useUpdatePlaylistMutation } from '@/features/playlists';
import { useId } from 'react';
import s from './UpdatePlaylistForm.module.css';
import { Button } from '@/common/components/Button/Button.tsx';

type Props = {
  playlistId: string | null;
  setPlaylistId: (playlistId: string | null) => void;
  register: UseFormRegister<UpdatePlaylistInput>;
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistInput>;
  onClickCancelEdit: (playlist: null) => void;
};

export const UpdatePlaylistForm = ({ playlistId, setPlaylistId, handleSubmit, register, onClickCancelEdit }: Props) => {
  const [updatePlaylist] = useUpdatePlaylistMutation();
  const inputTitleId = useId();
  const inputDescrptId = useId();

  const onSubmit: SubmitHandler<UpdatePlaylistInput> = (data) => {
    if (!playlistId) return;
    updatePlaylist({ playlistId, data })
      .unwrap()
      .then(() => setPlaylistId(null));
  };

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputWrap}>
          <label htmlFor={inputTitleId}>Update title:</label>
          <input id={inputTitleId} type={'text'} {...register('title')} />
        </div>
        <div className={s.inputWrap}>
          <label htmlFor={inputDescrptId}>Update description:</label>
          <input id={inputDescrptId} type={'text'} {...register('description')} />
        </div>

        <Button className={s.button} type={'submit'}>
          Save
        </Button>
        <Button className={s.button} type={'reset'} onClick={() => onClickCancelEdit(null)}>
          Cancel
        </Button>
      </form>
    </div>
  );
};
