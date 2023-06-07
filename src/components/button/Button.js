import React from "react";
import s from "./button.module.scss";
import classnames from "classnames";
/**
 *
 * @param {size} 크기
 * @param {type} 타입
 * @returns
 */
const Button = ({ children, onClick, classname, type, size = "big" }) => {
  return (
    <button
      className={classnames(`${s.button} ${classname}`, {
        [s.is_success]: type === "success",
        [s.is_cancle]: type === "cancle",
        [s.is_small]: size === "small",
        [s.is_medium]: size === "medium",
        [s.is_big]: size === "big",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
