import React from "react";
import s from "./select.module.scss";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

const Select = ({ init, options }) => {
  const [select, setSelect] = useState(init);
  const [dropdown, setDropDown] = useState(false);

  return (
    <div className={s.container}>
      <div onClick={() => {dropdown?setDropDown(false):setDropDown(true)}}>
        <label>{select}</label>
        <AiFillCaretDown className={s.icon} />
      </div>
      {dropdown && (
        <ul className={s.selectBox}>
          {options.map((opt) => (
            <li
              key={opt.id}
              onClick={() => {
                setDropDown(false);
                setSelect(opt.text);
              }}
            >
              <p>{opt.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
