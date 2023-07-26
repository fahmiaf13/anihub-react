import React from "react";
import { css } from "@emotion/react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const paginationStyles = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    button {
      padding: 8px 12px;
      margin: 0 5px;
      background-color: #f1f1f1;
      border: 1px solid #ccc;
      cursor: pointer;

      &:hover {
        background-color: #e2e2e2;
      }

      &[disabled] {
        pointer-events: none;
        opacity: 0.5;
      }
    }
  `;

  return (
    <div css={paginationStyles}>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button key={index + 1} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
          {index + 1}
        </button>
      ))}
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
