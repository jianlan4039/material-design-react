import React from "react";
import './index.scss';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                 totalItems,
                                                 itemsPerPage,
                                                 currentPage,
                                                 onPageChange,
                                               }) => {

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 创建页码显示逻辑，使用省略号
  const getPageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // 页数少于或等于5，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 页数大于5，显示首尾和当前页附近的页码
      const leftBoundary = Math.max(1, currentPage - 1);
      const rightBoundary = Math.min(totalPages, currentPage + 1);

      if (leftBoundary > 2) {
        pageNumbers.push(1, "...");
      } else {
        for (let i = 1; i <= leftBoundary; i++) {
          pageNumbers.push(i);
        }
      }

      for (let i = leftBoundary; i <= rightBoundary; i++) {
        if (i > 1 && i < totalPages) {
          pageNumbers.push(i);
        }
      }

      if (rightBoundary < totalPages - 1) {
        pageNumbers.push("...", totalPages);
      } else {
        for (let i = rightBoundary + 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }
    }
    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z"/>
        </svg>
      </button>
      {
        getPageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              className={page === currentPage ? "active" : ""}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="ellipsis">
            {page}
          </span>
          )
        )
      }
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z"/>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
