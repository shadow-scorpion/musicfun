import Skeleton from 'react-loading-skeleton';
import s from './SkeletonPlaylistPage.module.css';

type Props = {
  playlistItemCount: number;
};

export const SkeletonPlaylistPage = ({ playlistItemCount }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '10px',
      }}
    >
      <Skeleton height={22} width={180} />
      <div className={s.createPlaylistFormWrap}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <Skeleton height={16} width={120} />
          <Skeleton height={16} width={170} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <Skeleton height={16} width={120} />
          <Skeleton height={16} width={170} />
        </div>
        <Skeleton count={1} height={30} width={100} />
      </div>
      <Skeleton count={1} height={20} />
      <div className={s.playlistItemsWrap}>
        {Array.from({ length: playlistItemCount }).map((_, index) => (
          <div className={s.playlistItem} key={index}>
            <div className={s.coverSection}>
              <Skeleton className={s.cover} />
            </div>

            <div className={s.descriptionSection}>
              <Skeleton count={1} height={14} width={110} />
              <Skeleton count={1} height={14} width={110} />
              <Skeleton count={1} height={14} width={110} />
            </div>

            <div className={s.buttons}>
              <Skeleton count={1} height={20} width={50} />
              <Skeleton count={1} height={20} width={50} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
