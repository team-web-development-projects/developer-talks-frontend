import React from "react";
import s from "./textArea.module.scss";

const TextArea = ({form, setForm}) => {
  const handleSetTab = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      let val = e.target.value;
      let start = e.target.selectionStart;
      let end = e.target.selectionEnd;
      e.target.value = val.substring(0, start) + "\t" + val.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
      setForm({ ...form, ["content"]: e.target.value });
      return false; //  prevent focus
    }
  };
  return (
    <textarea
      className={s.textArea}
      value={form.content}
      cols="50"
      rows="7"
      spellCheck="false"
      onChange={(e) => {
        setForm({ ...form, ["content"]: e.target.value });
      }}
      onKeyDown={(e) => handleSetTab(e)}
    ></textarea>
  );
};

export default TextArea;
