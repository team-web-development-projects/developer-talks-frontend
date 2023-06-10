import React from "react";
import s from "./lineStyle.module.scss";

const LineStyle = ({ text }) => {
  return (
    <div className={s.lineStyle}>
      <div className={s.jbDivisionLine}></div>
      <span className={s.linespan}>{text}</span>
      <div className={s.jbDivisionLine}></div>
    </div>
  );
};

export default LineStyle;
