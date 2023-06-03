import React from "react";
import s from './dropdown.module.scss';

const DropDown = ({ children }) => {
  return (
    <div className={s.dropdown}>
      <ul>{children}</ul>
    </div>
  );
};

export default DropDown;
