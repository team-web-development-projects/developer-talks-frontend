import React from "react";
import s from "./select.module.scss";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

const Select = ({ options }) => {
  const [select, setSelect] = useState("자유");
  const [dropdown, setDropDown] = useState(false);
  const handleChange = (opt) => {
    setSelect(opt.text);
    setDropDown(false);
  };
  return (
    <div className={s.container}>
      <label>{select}</label>
      <AiFillCaretDown className={s.icon} onClick={() => setDropDown(true)} />
      {dropdown && (
        <ul className={s.selectBox} onClick={handleChange}>
          {options.map((opt) => (
            <li key={opt.id}>
              <p>{opt.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
