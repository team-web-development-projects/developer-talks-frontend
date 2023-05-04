import React from "react";
import s from "./button.module.scss";

const Button = ({ children }) => {
  return (
    <button className={s.button}>
      <p>{children}</p>
    </button>
  );
};

export default Button;