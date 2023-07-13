import React, { useState, useRef, useEffect } from "react";
import s from "./messagemodal.module.scss";

const MessageModal = ({ children, messageForm }) => {
  const [showForm, setShowForm] = useState(false);
  const modalRef = useRef(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <span className={s.userinfowrap} ref={modalRef}>
      <a onClick={toggleForm}>{children}</a>
      {showForm && messageForm}
    </span>
  );
};

export default MessageModal;
