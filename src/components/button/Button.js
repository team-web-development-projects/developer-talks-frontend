import React from "react";
import s from "./button.module.scss";
import classnames from "classnames";

/**
 *
 * @param {string} theme 버튼 theme - success cancle, 라인만 있는거 outline
 * @param {string} size 버튼 사이즈 - small medium large big
 * @param {boolean} fullWidth width100% 유무
 * @returns
 */

const Button = ({ FullWidth, children, onClick, classname, theme, size = "big", color, ...attr }) => {
  return (
    <button
      className={classnames(`${s.button} ${classname}`, {
        [s.is_success]: theme === "success",
        [s.is_cancle]: theme === "cancle",
        [s.is_outline]: theme === "outline",
        [s.is_small]: size === "small",
        [s.is_medium]: size === "medium",
        [s.is_large]: size === "large",
        [s.is_big]: size === "big",
        [s.is_fullWidth]: FullWidth,
      })}
      style={{ borderColor: color, color: color }}
      onClick={onClick}
      {...attr}
    >
      {children}
    </button>
  );
};

export default Button;
