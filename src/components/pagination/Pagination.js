import React, { useState, useEffect } from "react";
import s from "./pagination.module.scss";
import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";

const Pagination = ({ postPerPage, totalPost, paginate }) => {
  const [number, setNumber] = useState(1);
  const location = useLocation();
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    setNumber(1);
  }, [location]);

  return (
    <>
      <ul className={s.container}>
        {pageNumbers.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              paginate(item);
              setNumber(item);
            }}
            className={classnames("", {
              [s.is_select]: index === number - 1,
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
