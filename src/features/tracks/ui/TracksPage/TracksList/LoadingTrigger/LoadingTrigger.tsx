import { useInfiniteScroll } from '@/common/hooks';

type Props = {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetching: boolean;
  isFetchingNextPage: boolean;
};

export const LoadingTrigger = ({ hasNextPage, fetchNextPage, isFetching, isFetchingNextPage }: Props) => {
  const { observerRef } = useInfiniteScroll({ hasNextPage, fetchNextPage, isFetching });
  return (
    <div ref={observerRef}>
      {isFetchingNextPage ? <p>Loading more tracks...</p> : <div style={{ height: '20px' }} />}
    </div>
  );
};
