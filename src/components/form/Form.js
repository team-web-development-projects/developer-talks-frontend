import React from "react";
import "./form.scss";

const Form = ({ children, onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit} className="user-form">
        {children}
      </form>
    </div>
  );
};

export default Form;