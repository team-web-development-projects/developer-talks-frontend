import React from "react";
import s from "./label.module.scss";

const Label = ({ text, star }) => {
  return (

    <label className={s.label}>
      {text}
    {star &&  <span className={s.star} title="필수사항">*</span>}
    </label>
  );
};

export {Label};
