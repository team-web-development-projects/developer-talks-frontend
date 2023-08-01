import React from "react";
import s from "./lineStyle.module.scss";

const LineStyle = ({ children }) => {
  return (
    <div className={s.lineStyle}>
      <span>{children}</span>
    </div>
  );
};

export default LineStyle;
