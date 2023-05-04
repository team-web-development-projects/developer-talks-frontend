import React from "react";
import s from "./buttonBlack.module.scss";
import { PropTypes } from "prop-types";
import classNames from "classnames";

const ButtonBlack = (props) => {
  return (
    <button
    // 클래스명을 동적으로 변화시키고 싶을때 
    className={classNames([s.button], {
      'is-black': props.color && 'black'})}
      // 테마처럼 색상이 정해져있을때는 
      style={props.color}
      // className={props.classname}
    >
      <p>{props.name}</p>
      <p>{props.age}</p>
    </button>
  );
};

// ButtonBlack.propTypes = {
//   name: PropTypes.string,
//   age: PropTypes.number,
// };

export default ButtonBlack;
