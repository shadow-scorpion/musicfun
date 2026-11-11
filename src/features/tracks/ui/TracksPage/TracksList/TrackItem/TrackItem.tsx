import type { TrackAttributes } from '@/features/tracks/api/tracksApi.types.ts';
import s from '@/features/tracks/ui/TracksPage/TracksList/TrackItem/TrackItem.module.css';


type Props = {
  attributes: TrackAttributes;
  orderTrack: number;
};

export const TrackItem = ({ attributes, orderTrack }: Props) => {
  const { title, images, user, attachments, addedAt } = attributes;

  return (
    <div className={s.track}>
      <div className={s.track_cover_name}>
        <div>{orderTrack}</div>
        <div>
          <img className={s.img} alt={title} />
        </div>
        <div className={s.trackNameWrap}>
          <p className={`${s.titleTrack} ${s.trackEllipses}`}>Title: {title}</p>
          <p className={`${s.nameTrack} ${s.trackEllipses}`}>Name: {user.name}</p>
        </div>
      </div>
      {attachments.length ? <audio controls src={attachments[0].url} /> : 'no file'}
    </div>
  );
};
