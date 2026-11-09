import { getPaginationPages } from '@/common/utils';
import s from './Pagination.module.css';
import Select, { type StylesConfig, type SingleValue, type ActionMeta } from 'react-select';

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pagesCount: number;
  pageSize: number;
  onChangePageSize: (size: number) => void;
};

type OptionAmountPlType = {
  value: number;
  label: string;
};

const amountPlaylistsRequest: OptionAmountPlType[] = [
  { value: 4, label: '4' },
  { value: 8, label: '8' },
  { value: 16, label: '16' },
  { value: 32, label: '32' },
];

const customStyles: StylesConfig<OptionAmountPlType> = {
  // 1. Главный блок (сам инпут до клика)
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--bg-pagination)', // цвет фона
    borderColor: state.isFocused ? 'var(--accent-color)' : 'none', // цвет рамки (активная/обычная)
    borderWidth: '2px',
    borderRadius: '8px',
    boxShadow: 'none', // убираем стандартную браузерную тень
    '&:hover': {
      borderColor: 'var(--accent-color)', // цвет рамки при наведении на весь блок
    },
  }),

  // 2. Выпадающий список (контейнер меню)
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--bg-pagination)',
    borderRadius: '8px',
    border: '1px solid #334155',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
  }),

  // 3. Отдельные пункты меню (option)
  option: (provided, state) => ({
    ...provided,
    // Меняем цвет фона в зависимости от состояния (выбран, наведен или обычный)
    backgroundColor: state.isSelected
      ? 'var(--accent-color)' // если пункт выбран
      : state.isFocused
        ? '#334155' // цвет при наведении (hover)
        : 'var(--bg-pagination)', // обычный фон
    color: '#ffffff', // цвет текста в пунктах
    cursor: 'pointer',
    padding: '10px 12px',
  }),

  // 4. Текст выбранного значения в самом селекте
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--accent-color)',
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#94a3b8', // Цвет стрелки по умолчанию (серый)
    cursor: 'pointer',
    transition: 'color 0.2s ease', // Плавный переход для ховера

    // Эффект при наведении мыши на саму стрелку
    '&:hover': {
      color: 'var(--accent-color)', // Цвет стрелки при наведении (например, синий)
    },
  }),
};

export const Pagination = ({
  currentPage,
  setCurrentPage,
  pagesCount,
  pageSize,
  onChangePageSize,
}: Props) => {
  if (pagesCount <= 1) return null;

  const handlerChangePageSize = (
    newValue: SingleValue<OptionAmountPlType>,
    _actionMeta: ActionMeta<OptionAmountPlType>,
  ) => {
    if (!newValue) return;
    onChangePageSize(newValue?.value || 4);
  };

  const defaulSelecttValue = amountPlaylistsRequest.find((option) => option.value === pageSize);

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
      <Select<OptionAmountPlType, false>
        options={amountPlaylistsRequest}
        defaultValue={defaulSelecttValue}
        styles={customStyles}
        onChange={handlerChangePageSize}
        menuPortalTarget={document.body}
        menuPosition="fixed"
      />
    </div>
  );
};
