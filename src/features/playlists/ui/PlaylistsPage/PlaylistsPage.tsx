import s from './PlaylistsPage.module.css';
import { type ChangeEvent, useRef, useState } from 'react';
import { useGetPlaylistsQuery } from '@/features/playlists';
import { useDebounceValue } from '@/common/hooks';
import { Pagination } from '@/common/components';
import { PlaylistsList } from '@/features/playlists/ui/PlaylistsPage/PlaylistsList/PlaylistsList.tsx';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonPlaylistPage } from '@/features/playlists/ui/PlaylistsPage/SkeletonPlaylistPage/SkeletonPlaylistPage.tsx';
import { IoMdSearch } from 'react-icons/io';

export const PlaylistsPage = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const debounceSearch = useDebounceValue(search, 2000);

  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useGetPlaylistsQuery({
    search: debounceSearch,
    pageNumber: currentPage,
    pageSize,
  });

  const changePageSizeHandler = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlerWrapperClick = () => {
    inputRef.current?.focus();
  };

  if (isLoading) {
    return <SkeletonPlaylistPage playlistItemCount={8} />;
  }

  return (
    <div className={s.container}>
      <h1 className={s.heading}>All Playlists</h1>
      <div className={s.searchWrapper} onClick={handlerWrapperClick}>
        <IoMdSearch className={s.iconSearch} size={25} color={'white'} />
        <input
          className={s.input}
          type="search"
          ref={inputRef}
          placeholder={'Search playlist'}
          onChange={searchPlaylistHandler}
        />
      </div>

      <PlaylistsList playlist={data?.data || []} isLoading={isLoading} />
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        onChangePageSize={changePageSizeHandler}
      />
    </div>
  );
};
