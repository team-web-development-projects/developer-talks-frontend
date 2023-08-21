import React from "react";
import "./form.scss";

const Form = ({ children, onSubmit, White }) => {
  return (
      <form onSubmit={onSubmit} className="form">
        {children}
      </form>
  );
};

export default Form;
