import React from "react";
import s from "./lineStyle.module.scss";

const LineStyle = ({ text, gray }) => {
  return (
    <div className={s.lineStyle}>
      <span className={`${gray ? s.gray : ""}`}>{text}</span>
    </div>
  );
};

export default LineStyle;