import React from "react";
import s from "./label.module.scss";

const Label = ({ text, htmlFor, star }) => {
  return (

    <label className={s.label} htmlFor={htmlFor}>
      {text}
    {star &&  <span className={s.star} title="필수사항">*</span>}
    </label>
  );
};

export {Label};
