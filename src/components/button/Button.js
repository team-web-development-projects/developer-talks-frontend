import React from "react";
import s from "./button.module.scss";
import classnames from 'classnames';

const Button = ({ children, onClick, classname, type }) => {
  return (
    <button
      className={classnames(`${s.button} ${classname}`, {
        "is-success": type === "success",
        "is-cancle": type === "cancle",
      })}
      onClick={onClick}
    >
      <p>{children}</p>
    </button>
  );
};

export default Button;
