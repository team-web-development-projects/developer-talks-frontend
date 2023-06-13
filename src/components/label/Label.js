import React from "react";
import s from "./label.module.scss";

const Label = ({ text, isRequire }) => {
  return (
    <label className={s.label}>
      {text}
      {isRequire && (
        <span className={s.isRequire} title="필수사항">
          *
        </span>
      )}
    </label>
  );
};

export {Label};
