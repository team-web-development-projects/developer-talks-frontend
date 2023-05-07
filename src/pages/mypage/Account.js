import Left from "components/left/Left";
import "./Account.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { parseJwt } from "hooks/useParseJwt";
// import { Form } from "react-router-dom";
// import { Link } from 'react-router-dom';

function Account() {
  const auth = useSelector((state) => state.authToken);
  console.log("auth:", auth.accessToken);

  const tabTitle = ["회원정보 수정", "회원 탈퇴"];
  const [select, setSelect] = useState(null);
  const onSelect = (type) => {
    setSelect(type);
  };

  const userData = parseJwt(localStorage.getItem("token"));

  const userEdit = () => {};
  

  return (
    <main className="main">
      <Left />
      <section className="notes">
        <ul>
          {tabTitle.map((item, index) => (
            <li>
              <button
                key={index}
                onClick={() => onSelect(index)}
                className={`${select === index && "select"}`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        {select === 0 && (
          <div>
            비밀번호 선 인증 필요
            <form onSubmit={userEdit}>
              {/*FIXME 이번엔 클릭 시 두개가 똑같이 나오네요  */}
              {/* FIXME key오류, <formImpl>, useSubmitImpl must be used within a data router. 오류 */}
              <div className="">
                <fieldset>
                  <legend>회원정보 수정</legend>
                  <input
                    // value={contacts[select].line.userEmail}
                    value={userData && userData.sub}
                    type="text"
                  />
                  <label>이메일</label>

                  <input
                    // value={contacts[select].line.userName}
                    value={userData && userData.userid}
                    type="text"
                  />
                  <label>아이디</label>

                  <input
                    // value={contacts[select].line.userNickName}
                    value={userData && userData.nickname}
                    type="text"
                  />
                  <label>닉네임</label>

                  <input
                    // value={contacts[select].line.userPassword}
                    value={"비밀번호 선 인증에서 받은 비밀번호"}
                    type="password"
                  />
                  <label> 비밀번호</label>
                </fieldset>
              </div>
            </form>
          </div>
        )}
        {select === 1 && <div>회원탈퇴 버튼</div>}
      </section>
    </main>
  );
}

export default Account;
