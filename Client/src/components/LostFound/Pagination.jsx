import React from "react";
import Pagination from "react-bootstrap/Pagination";

function CustomPagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => paginate(1)} />
      <Pagination.Prev
        onClick={() =>
          paginate(currentPage > 1 ? currentPage - 1 : currentPage)
        }
      />
      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => paginate(number)}
        >
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() =>
          paginate(
            currentPage < Math.ceil(totalPosts / postsPerPage)
              ? currentPage + 1
              : currentPage
          )
        }
      />
      <Pagination.Last
        onClick={() => paginate(Math.ceil(totalPosts / postsPerPage))}
      />
    </Pagination>
  );
}

export default CustomPagination;
