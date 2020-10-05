//Component to provide the pagination for the DSN list in settings

import React from "react";

export default function Pagination(props) {
  const { 
      itemsPerPage, 
      totalItems, 
      paginate, 
      currentPage 
  } = props;

  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="currentPage">Page: {currentPage}</div>
      <div className="Pagination">
        <ul>
          {pageNumbers.map((number) => {
            return (
              <li key={number}>
                <button onClick={() => paginate(number)}>{number}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
