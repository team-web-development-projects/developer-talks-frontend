import React from "react";
import s from "./label.module.scss";

const Label = ({ children, isRequire, ...rest }) => {
  return (
    <label {...rest} className={s.label}>
      {children}
      {isRequire && (
        <span className={s.isRequire} title="필수사항">
          *
        </span>
      )}
    </label>
  );
};

export default Label;
