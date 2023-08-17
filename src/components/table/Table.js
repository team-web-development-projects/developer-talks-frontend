import React from "react";
import s from "./table.module.scss";

const Table = ({ children, tableTitle, tableText }) => {
  return (
    <div className={s.table}>
      {tableTitle && <h2>{tableTitle}</h2>}
      {tableText && <p>{tableText}</p>}
      <div className={s.userinfoTable}>{children}</div>
    </div>
  );
};

export default Table;
