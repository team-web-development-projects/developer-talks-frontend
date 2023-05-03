import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Mypage = () => {
  const [user, setUser] = useState(false);

  return (
    <>
      <div className="mypage-page page">
        {!user ? (
          <div className="not-user">
            <Link to="/login">로그인</Link>
            <Link to="/regist">회원가입</Link>
          </div>
        ) : (
          <div className="is-user">로그인상태</div>
        )}
      </div>
    </>
  );
};

export default Mypage;
