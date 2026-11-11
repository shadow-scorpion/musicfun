import s from '@/features/tracks/ui/TracksPage/TracksList/TracksList.module.css';
import { LoadingTrigger } from '@/features/tracks/ui/TracksPage/TracksList/LoadingTrigger/LoadingTrigger.tsx';
import { useFetchTracksInfiniteQuery } from '@/features/tracks/api/tracksApi.ts';
import { TrackItem } from '@/features/tracks/ui/TracksPage/TracksList/TrackItem/TrackItem.tsx';

export const TracksList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchTracksInfiniteQuery();

  const pages = data?.pages.map((page) => page.data).flat() || [];

  return (
    <>
      <div className={s.list}>
        {pages.map((track, index) => {
          return <TrackItem attributes={track.attributes} key={track.id} orderTrack={index + 1} />;
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
