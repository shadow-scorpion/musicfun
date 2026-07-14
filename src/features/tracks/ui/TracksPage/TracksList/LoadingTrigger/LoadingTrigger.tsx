import { useInfiniteScroll } from '@/common/hooks';

type Props = {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
};

export const LoadingTrigger = ({ hasNextPage, fetchNextPage, isFetchingNextPage }: Props) => {
  const { observerRef } = useInfiniteScroll({ hasNextPage, fetchNextPage, isFetchingNextPage });
  return (
    <div ref={observerRef}>
      {isFetchingNextPage ? <p>Loading more tracks...</p> : <div style={{ height: '20px' }} />}
    </div>
  );
};
