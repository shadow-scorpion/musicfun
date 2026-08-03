import { type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister } from 'react-hook-form';
import { type FieldInputArgs, useUpdatePlaylistMutation } from '@/features/playlists';
import { useId } from 'react';
import s from './UpdatePlaylistForm.module.css';
import { Button } from '@/common/components/Button/Button.tsx';

type Props = {
  playlistId: string | null;
  setPlaylistId: (playlistId: string | null) => void;
  register: UseFormRegister<FieldInputArgs>;
  handleSubmit: UseFormHandleSubmit<FieldInputArgs>;
  onClickCancelEdit: (playlist: null) => void;
};

export const UpdatePlaylistForm = ({
  playlistId,
  setPlaylistId,
  handleSubmit,
  register,
  onClickCancelEdit,
}: Props) => {
  const [updatePlaylist] = useUpdatePlaylistMutation();
  const inputTitleId = useId();
  const inputDescriptionId = useId();

  const onSubmit: SubmitHandler<FieldInputArgs> = (data) => {
    if (!playlistId) return;
    setPlaylistId(null);
    updatePlaylist({ playlistId: playlistId, data })
      .unwrap()
      .catch(() => setPlaylistId(playlistId));
  };

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputWrap}>
          <label htmlFor={inputTitleId}>Update title:</label>
          <input id={inputTitleId} type={'text'} {...register('title')} />
        </div>
        <div className={s.inputWrap}>
          <label htmlFor={inputDescriptionId}>Description title:</label>
          <input id={inputDescriptionId} type={'text'} {...register('description')} />
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
