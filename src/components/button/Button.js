import React from "react";
import s from "./button.module.scss";

const Button = ({ children, handleClick }) => {
  return (
    <button className={s.button} onClick={handleClick}>
      <p>{children}</p>
    </button>
  );
};

export default Button;