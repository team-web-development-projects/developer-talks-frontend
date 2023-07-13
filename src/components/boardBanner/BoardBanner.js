import React from "react";
import s from './boardbanner.module.scss';

const BoardBanner = ({ children }) => {
  return <div className={s.banner}>{children}</div>;
};

export default BoardBanner;
