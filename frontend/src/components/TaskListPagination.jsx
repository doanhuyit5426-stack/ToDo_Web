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

const TaskListPagination = ({ handleNext, handlePrev, handlePageChange, page, totalPages }) => {
  if (!totalPages || totalPages <= 1) return null;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination className="justify-center sm:justify-start w-auto mx-0">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            onClick={(e) => {
              e.preventDefault();
              if (page > 1 && handlePrev) handlePrev();
            }}
          />
        </PaginationItem>
        {pageNumbers.map((pageNo) => (
          <PaginationItem key={pageNo}>
            <PaginationLink
              className="cursor-pointer"
              isActive={page === pageNo}
              onClick={(e) => {
                e.preventDefault();
                if (handlePageChange) handlePageChange(pageNo);
              }}
            >
              {pageNo}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext 
            className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages && handleNext) handleNext();
            }}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}

export default TaskListPagination;