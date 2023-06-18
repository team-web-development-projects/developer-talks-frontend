import React from "react";
import s from "./table.module.scss";

const Table = ({ children, tableTitle, tableText }) => {
  return (
    <div className={s.table}>
      <h2>{tableTitle}</h2>
      <p>{tableText}</p>
      <ul className={s.userinfoTable}>
        {children.map((child, index) => (
          <li key={child.id || index}>{child}</li>
        ))}
      </ul>
    </div>
  );
};

export default Table;
