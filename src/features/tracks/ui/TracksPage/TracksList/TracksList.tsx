import s from '@/features/tracks/ui/TracksPage/TracksList/TracksList.module.css';
import { LoadingTrigger } from '@/features/tracks/ui/TracksPage/TracksList/LoadingTrigger/LoadingTrigger.tsx';
import { useFetchTracksInfiniteQuery } from '@/features/tracks/api/tracksApi.ts';

export const TracksList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchTracksInfiniteQuery();

  const pages = data?.pages.map((page) => page.data).flat() || [];

  return (
    <>
      <div className={s.list}>
        {pages.map((track) => {
          const { title, user, attachments } = track.attributes;

          return (
            <div key={track.id} className={s.item}>
              <div>
                <p>Title: {title}</p>
                <p>Name: {user.name}</p>
              </div>
              {attachments.length ? <audio controls src={attachments[0].url} /> : 'no file'}
            </div>
          );
        })}
      </div>
      {hasNextPage && (
        <LoadingTrigger
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
      {!hasNextPage && pages.length > 0 && <p>No more tracks</p>}
    </>
  );
};
