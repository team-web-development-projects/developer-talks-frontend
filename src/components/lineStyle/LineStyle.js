import React from "react";
import s from "./lineStyle.module.scss";

const LineStyle = ({ text }) => {
  return (
    <div className={s.lineStyle}>
      <span className={s.gray}>{text}</span>
    </div>
  );
};

export default LineStyle;
