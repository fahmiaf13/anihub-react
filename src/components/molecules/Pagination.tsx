import React from "react";
import { Button } from "@/components/atoms";
import { css } from "@emotion/react";

interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

interface PaginationProps {
  pageInfo: PageInfo;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageInfo, onPageChange }) => {
  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  const generatePageNumbers = () => {
    const maxVisiblePages = 5;
    const pageNumbers = [];
    const startPage = Math.max(1, pageInfo?.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(pageInfo?.lastPage, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        gap: 5px;
      `}
    >
      <Button
        variant="secondary"
        sx={css`
          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}
        onClick={() => handlePageChange(pageInfo?.currentPage - 1)}
        disabled={pageInfo?.currentPage === 1}
      >
        Sebelumnya
      </Button>
      {generatePageNumbers().map((pageNumber) => (
        <Button
          variant="secondary"
          sx={css`
            &:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }
          `}
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          disabled={pageInfo?.currentPage === pageNumber}
        >
          {pageNumber}
        </Button>
      ))}

      <Button
        variant="secondary"
        sx={css`
          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}
        onClick={() => handlePageChange(pageInfo?.currentPage + 1)}
        disabled={!pageInfo?.hasNextPage}
      >
        Selanjutnya
      </Button>
    </div>
  );
};

export default Pagination;
