import React from "react";
import s from "./pagination.module.scss";

const Pagination = ({ postPerPage, totalPost, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <ul className={s.container}>
        {pageNumbers.map((number) => (
          <li key={number} onClick={() => paginate(number)}>
            <span>
              {number}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Pagination;
