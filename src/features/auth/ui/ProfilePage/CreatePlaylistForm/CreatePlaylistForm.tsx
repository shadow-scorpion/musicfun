import { type SubmitHandler, useForm } from 'react-hook-form';
import { useId } from 'react';
import s from './CreatePlaylistForm.module.css';
import { type CreatePlaylistArgs, useCreatePlaylistMutation } from '@/features/playlists';
import { Button } from '@/common/components/Button/Button.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPlaylistSchema } from '@/features/playlists/model/playlists.schemas.ts';

export const CreatePlaylistForm = () => {
  const [createPlaylist] = useCreatePlaylistMutation();
  const inputTitleId = useId();
  const inputDescrptId = useId();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePlaylistArgs>({
    resolver: zodResolver(createPlaylistSchema),
    mode: 'onSubmit',
  });

  const handleCreatePlaylist: SubmitHandler<CreatePlaylistArgs> = (data) => {
    createPlaylist(data)
      .unwrap()
      .then(() => reset());
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(handleCreatePlaylist)}>
      <div className={s.formItem}>
        <div className={s.field}>
          <label htmlFor={inputTitleId}>Create title:</label>
          <input id={inputTitleId} type={'text'} {...register('title')} />
        </div>
        {<p className={s.error}>{errors.title ? errors.title.message : ''}</p>}
      </div>
      <div className={s.field}>
        <label htmlFor={inputDescrptId}>Create description:</label>
        <input id={inputDescrptId} type={'text'} {...register('description')} />
      </div>

      <Button className={s.button} type={'submit'}>
        Submit
      </Button>
    </form>
  );
};
