import React from "react";
import s from "./button.module.scss";
import classnames from "classnames";

/**
 *
 * @param {string} type 버튼 유형 - success cancle
 * @param {string} size 버튼 사이즈 - small medium large big
 * @param {boolean} fullWidth width100% 유무
 * @returns
 */

const Button = ({ FullWidth, children, onClick, classname, type, size = "big" }) => {
  return (
    <button
      className={classnames(`${s.button} ${classname}`, {
        [s.is_success]: type === "success",
        [s.is_cancle]: type === "cancle",
        [s.is_small]: size === "small",
        [s.is_medium]: size === "medium",
        [s.is_large]: size === "large",
        [s.is_big]: size === "big",
        [s.is_fullWidth]: FullWidth,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
