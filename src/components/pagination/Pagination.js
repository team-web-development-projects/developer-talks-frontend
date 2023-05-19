import React, { useState, useEffect } from "react";
import s from "./pagination.module.scss";
import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Pagination = ({currentPage,totalPage, paginate}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className={s.container}>
        {pageNumbers.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              paginate(item);
            }}
            className={classnames("", {
              [s.is_select]: item === currentPage,
            })}
          >
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Pagination;
