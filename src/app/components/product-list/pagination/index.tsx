import React from 'react'
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination"
import { generatePaginationLinks } from './generate-pages'

interface IProductPagination {
   currentPage: number
   totalPage: number
   onPageChange: (_: number) => void
}
const ProductPagination = ({ currentPage, totalPage, onPageChange }: IProductPagination) => {
   return (
      <Pagination >
         <PaginationContent>
            <PaginationItem onClick={() => onPageChange(1)}>
               <PaginationPrevious href="#" />
            </PaginationItem>
            {generatePaginationLinks(currentPage, totalPage, onPageChange)}
            <PaginationItem onClick={() => onPageChange(totalPage)}>
               <PaginationNext href="#" />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   )
}

export default ProductPagination