import React from "react";

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          disabled={index + 1 === currentPage}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default PaginationComponent;
