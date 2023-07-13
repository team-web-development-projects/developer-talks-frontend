import React from "react";
import { BiSearch } from "react-icons/bi";
import s from "./searchInput.module.scss";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const SearchInput = ({ type }) => {
  const t = type === "post" ? "board" : "qna";
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      navigate(`/${t}`);
    } else {
      navigate(`/${t}/search/${text}`);
    }
  };
  useEffect(() => setText(keyword || ""), [keyword]);
  return (
    <form className={s.search} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="원하는 내용을 검색해보세요~!"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>
        <BiSearch size={24} />
      </button>
    </form>
  );
};

export default SearchInput;
