import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { PaginateItem } from "./PaginateItem";

import './styles.scss'

interface PaginationComponent {
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 4;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0);
}

export function PaginationComponent({ currentPage, total, onPageChange }: PaginationComponent) {
  const lastPage = Math.ceil(total / 10);

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  const previousPages = currentPage > 1 && nextPages.length < siblingsCount
    ? generatePagesArray(currentPage - 1 - (siblingsCount - nextPages.length), currentPage - 1)
    : []

  return (
    <div className="container-paginate">
      <div className="px-3">
        <h6>{(currentPage === 1 && total !== 0) ? 1 : total === 0 ? 0 : (currentPage - 1) * 10 + 1} - {currentPage === lastPage ? total : (currentPage === 1 && total < 10) ? total : currentPage * 10} de {total}
        </h6>
      </div>
      <Pagination aria-label="Table Paginate">
        {currentPage > (1) ? (
          <>

            <PaginationItem>
              <PaginationLink
                first
                onClick={() => onPageChange(1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(currentPage - 1)}
                previous
              />
            </PaginationItem>
          </>
        ) : (
          <>
            <PaginationItem>
              <PaginationLink
                first
                disabled
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                previous
                disabled
              />
            </PaginationItem>
          </>
        )}


        {nextPages.length < siblingsCount && previousPages.map(page => {
          return <PaginateItem key={page} numberPage={page} onPageChange={onPageChange} />
        })}

        <PaginateItem numberPage={currentPage} onPageChange={onPageChange} isCurrent />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginateItem key={page} numberPage={page} onPageChange={onPageChange} />
        })}


        {currentPage !== lastPage ? (
          <>
            <PaginationItem>
              <PaginationLink
                next
                onClick={() => onPageChange(currentPage + 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                last
                onClick={() => onPageChange(lastPage)}
              />
            </PaginationItem>
          </>
        ) : (
          <>
            <PaginationItem>
              <PaginationLink
                next
                disabled
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                last
                disabled
              />
            </PaginationItem>
          </>
        )}


      </Pagination>
    </div>
  )
}