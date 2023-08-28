import { searchMessage } from "api/user";
import s from "./messagesearch.module.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { showToast } from "components/toast/showToast";

const Search = () => {
  const [text, setText] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    const res = searchMessage(text);
    res
      .then((res) => {
        console.log("cc");
      })
      .catch((err) => showToast("error", err.response.data.message));
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className={s.container}>
      <form onSubmit={onSearch}>
        <input type="text" id="name" name="name" onChange={onChange} value={text} />
        <button type="submit">조회</button>
      </form>
    </div>
  );
};
export default Search;
