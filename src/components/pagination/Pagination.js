import React, { useState, useEffect } from "react";
import s from "./pagination.module.scss";
import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Pagination = ({ postPerPage, totalPost, paginate }) => {
  const pageRouter = useSelector((state) => state.pageRouter);
  const [number, setNumber] = useState(pageRouter.state ? pageRouter.state : 1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
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
              setNumber(item);
              console.log("아이템 값은 ",item, "넘버의 값은", number);
              console.log("페이지넘버",pageNumbers)
            }}
            className={classnames("", {
              [s.is_select]: item === number,
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
