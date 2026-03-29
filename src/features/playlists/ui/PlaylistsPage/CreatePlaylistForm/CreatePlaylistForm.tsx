import { type SubmitHandler, useForm } from 'react-hook-form';
import { useId } from 'react';
import s from './CreatePlaylistForm.module.css';

type InputsPlaylist = {
  title: string;
  description: string;
};

export const CreatePlaylistForm = () => {
  const inputTitleId = useId();
  const inputDescrptId = useId();
  const { register, handleSubmit, reset } = useForm<InputsPlaylist>();

  const handleCreatePlaylist: SubmitHandler<InputsPlaylist> = (data) => {
    const { title, description } = data;
    // удаление в случае успешно созданого плейлиста
    reset();
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

      <button className={s.button} type={'submit'}>
        Submit
      </button>
    </form>
  );
};
