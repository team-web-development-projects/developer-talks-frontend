import React from "react";
import s from "./label.module.scss";

const Label = ({ children, isRequire, ...attr }) => {
  return (
    <label className={s.label} {...attr}>
      {children}
      {isRequire && (
        <span className={s.isRequire} title="필수사항">
          *
        </span>
      )}
    </label>
  );
};

export {Label};
