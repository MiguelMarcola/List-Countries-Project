import { PaginationItem, PaginationLink } from "reactstrap";

interface PaginationItemProps {
  numberPage: number
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}


export function PaginateItem({ numberPage, isCurrent = false, onPageChange }: PaginationItemProps) {
  if (isCurrent) {
    return (
      <PaginationItem>
        <PaginationLink
          className="active"
        >
          {numberPage}
        </PaginationLink>
      </PaginationItem>
    )
  } else {
    return (
      <PaginationItem>
        <PaginationLink
          onClick={() => onPageChange(numberPage)}
        >
          {numberPage}
        </PaginationLink>
      </PaginationItem>
    )
  }
}