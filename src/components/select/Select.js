import React from "react";
import s from "./select.module.scss";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import classnames from 'classnames';

const Select = ({ sendText, options }) => {
  const [select, setSelect] = useState("");
  const [dropdown, setDropDown] = useState(false);

  // console.log("cc", sendText);

  return (
    <div
      className={classnames([s.container], {
        [s.is_open]: dropdown,
      })}
    >
      <div
        className={s.selectedText}
        onClick={() => {
          dropdown ? setDropDown(false) : setDropDown(true);
        }}
      >
        {select ? select : options[0]}
        <AiFillCaretDown className={classnames([s.icon], {
          [s.is_open]: dropdown
        })} />
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
                  if (opt==="최신순") sendText("");
                  else if (opt==="추천순") sendText("recommendCount,desc");
                  else if (opt==="댓글순") sendText("commentCount,desc");
                  else if (opt==="스크랩순") sendText("favoriteCount,desc");
                  else if (opt==="조회순") sendText("viewCount,desc");
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
