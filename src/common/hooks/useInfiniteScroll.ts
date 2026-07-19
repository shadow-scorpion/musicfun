import { useCallback, useEffect, useRef } from 'react';

type Props = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export const useInfiniteScroll = ({ hasNextPage, isFetchingNextPage, fetchNextPage }: Props) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const loadTracksHandler = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          loadTracksHandler();
        }
      },
      { rootMargin: '50px' },
    );
    const currentObservableRef = observerRef.current;
    if (currentObservableRef) {
      observer.observe(currentObservableRef);
    }

    return () => {
      if (currentObservableRef) {
        observer.unobserve(currentObservableRef);
      }
    };
  }, [loadTracksHandler, observerRef]);
  return { observerRef };
};
