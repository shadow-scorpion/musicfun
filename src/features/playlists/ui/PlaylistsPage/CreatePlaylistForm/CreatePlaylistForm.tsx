import { type SubmitHandler, useForm } from 'react-hook-form';
import { useId } from 'react';
import s from './CreatePlaylistForm.module.css';
import { type PlaylistInput, useCreatePlaylistMutation } from '@/features/playlists';
import { Button } from '@/common/components/Button/Button.tsx';

export const CreatePlaylistForm = () => {
  const [createPlaylist] = useCreatePlaylistMutation();
  const inputTitleId = useId();
  const inputDescrptId = useId();
  const { register, handleSubmit, reset } = useForm<PlaylistInput>();

  const handleCreatePlaylist: SubmitHandler<PlaylistInput> = (data) => {
    createPlaylist(data)
      .unwrap()
      .then(() => reset());
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(handleCreatePlaylist)}>
      <div className={s.inputWrap}>
        <label htmlFor={inputTitleId}>Create title:</label>
        <input id={inputTitleId} type={'text'} {...register('title')} />
      </div>
      <div className={s.inputWrap}>
        <label htmlFor={inputDescrptId}>Create description:</label>
        <input id={inputDescrptId} type={'text'} {...register('description')} />
      </div>

      <Button className={s.button} type={'submit'}>
        Submit
      </Button>
    </form>
  );
};
