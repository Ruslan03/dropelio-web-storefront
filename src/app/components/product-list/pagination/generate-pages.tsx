// this implementation can be a bit jumpy for larger tables, but should be good for most and easily adaptable if not
// this file is where your logic for how when ellipses are shown and other fiddly bits

import { PaginationEllipsis, PaginationItem, PaginationLink } from "@/components/ui/pagination";

export const generatePaginationLinks = (
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
) => {
  const pages: JSX.Element[] = [];
  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={`1-${i}`}>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => onPageChange(i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  } else {
    for (let i = 1; i <= 2; i++) {
      pages.push(
        <PaginationItem key={`2-${i}`}>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => onPageChange(i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    if (2 < currentPage && currentPage < totalPages - 1) {
      pages.push(<PaginationEllipsis key={`ellipsis-${currentPage}`} />)
      pages.push(
        <PaginationItem key={`current-${currentPage}`}>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => onPageChange(currentPage)}
            isActive={true}
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      );
    }
    pages.push(<PaginationEllipsis key={'ellipsis-current'} />)
    for (let i = totalPages - 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={`3-${i}`}>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => onPageChange(i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  }
  return pages;
};