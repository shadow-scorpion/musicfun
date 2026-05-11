import { getPaginationPages } from '@/common/utils';
import s from './Pagination.module.css';

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pagesCount: number;
  pageSize: number;
  onChangePageSize: (size: number) => void;
};

export const Pagination = ({ currentPage, setCurrentPage, pagesCount, pageSize, onChangePageSize }: Props) => {
  if (pagesCount <= 1) return null;

  const pages = getPaginationPages(currentPage, pagesCount);
  return (
    <div className={s.container}>
      <div className={s.pagination}>
        {pages.map((page, idx) =>
          page === '...' ? (
            <span className={s.ellipsis} key={`ellipsis-${idx}`}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={page === currentPage ? `${s.pageButton} ${s.pageButtonActive}` : s.pageButton}
              onClick={() => page !== currentPage && setCurrentPage(Number(page))}
              disabled={page === currentPage}
              type="button"
            >
              {page}
            </button>
          ),
        )}
      </div>
      <label className={s.select}>
        Show count
        <select onChange={(e) => onChangePageSize(Number(e.currentTarget.value))} value={pageSize} name={'Size content in tha page'}>
          {[4, 8, 16, 32].map((size) => {
            return (
              <option key={size} value={size}>
                {size}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};
