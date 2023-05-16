import React from "react";
import s from "./select.module.scss";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

const Select = ({ sendText, options }) => {
  const [select, setSelect] = useState('');
  const [dropdown, setDropDown] = useState(false);

  return (
    <div className={s.container}>
      <div
        onClick={() => {
          dropdown ? setDropDown(false) : setDropDown(true);
        }}
      >
        <label>{select ? select : options[0]}</label>
        <AiFillCaretDown className={s.icon} />
      </div>
      {dropdown && (
        <ul className={s.selectBox}>
          {options &&
            options.map((opt, index) => (
              <li
                key={index}
                onClick={() => {
                  setDropDown(false);
                  setSelect(opt);
                }}
              >
                <p>{opt}</p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
