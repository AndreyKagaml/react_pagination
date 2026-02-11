import cn from 'classnames';

type PaginationProp = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationProp) => {
  const countPages: number = Math.ceil(total / perPage);
  const pageItems = [];

  for (let i = 1; i <= countPages; i++) {
    pageItems.push(i);
  }

  return (
    <ul
      className="pagination"
      onClick={event => {
        const link = event.target as HTMLElement;

        if (link.getAttribute('aria-disabled') === 'false') {
          onPageChange(
            link.dataset.cy === 'prevLink' ? currentPage - 1 : currentPage + 1,
          );
        }

        if (!Number.isNaN(+link.innerText)) {
          onPageChange(+link.innerText);
        }
      }}
    >
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          «
        </a>
      </li>

      {pageItems.map(item => (
        <li
          className={cn('page-item', { active: item === currentPage })}
          key={item}
        >
          <a data-cy="pageLink" className="page-link" href={`#${item}`}>
            {item}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: currentPage === countPages })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === countPages ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
