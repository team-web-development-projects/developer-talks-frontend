import Button from "components/button/Button";
import Form from "components/form/Form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Account.scss";
import MypageContent from "./MyPageContent";
import { ROOT_API } from "constants/api";
import axios from "axios";
import s from "../studyRoom/studyRoomPost/studyRoom.module.scss";

// import { useNavigate } from 'react-router-dom';

function Account() {
  const auth = useSelector((state) => state.authToken);
  const [selectedTags, setSelectedTags] = useState({
    tags: [],
    authJoin: true,
    joinableCount: 1,
  });

  const clickTag = (tag) => {
    //NOTE 기술 테그
    if (selectedTags.tags.includes(tag)) {
      setSelectedTags({
        ...selectedTags,
        tags: selectedTags.tags.filter((selectedTag) => selectedTag !== tag),
      });
    } else {
      setSelectedTags({
        ...selectedTags,
        tags: [...selectedTags.tags, tag],
      });
    }
  };
  const tags = ["DJANGO", "SPRING", "JAVASCRIPT", "JAVA", "PYTHON", "CPP", "REACT", "AWS"];

  const tabTitle = ["회원정보 수정", "회원 탈퇴"];
  const [select, setSelect] = useState(null);
  const onSelect = (type) => {
    setSelect(type);
  };

  const [userData, setUserData] = useState("");
  useEffect(() => {
    axios
      .get(`${ROOT_API}/users/info`, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then(({ data }) => {
        console.log("cc정보 성공:", data);
        setUserData(data);
      })
      .catch(function (error) {
        console.log("cc정보:실패 ", error.response);
      });
  }, []);

  const reset = () => {
    //TODO 리셋
    setUserData("");
  };

  const userEdit = (e) => {
    //NOTE 수정
    e.preventDefault();
    console.log(`
    아이디: ${userData.description}
      닉네임: ${userData.nickname}
      이메일: ${userData.email}
      아이디: ${userData.userid}
      비밀번호: ${userData.password}   
    `);
  };

  const handleChange = (e) => {
    console.log(userData.description);
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const saveUser = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));

    axios
      .put(
        `${ROOT_API}/users/profile/description`,
        {
          description: userData.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": auth.accessToken,
          },
        }
      )
      .then(function (data) {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  // if (userData.description.includes("description")) {
  //   JSON.parse(setUserData({ ...userData, description: userData.description }));
  // }

  return (
    <MypageContent>
      <section className="notes">
        <ul className="notetitle">
          {tabTitle.map((item, index) => (
            <li key={index}>
              <button onClick={() => onSelect(index)} className={`${select === index && "select"}`}>
                {item}
              </button>
            </li>
          ))}
        </ul>
        {select === 0 && (
          <div>
            <Form onSubmit={userEdit}>
              {/* TODO 프로필이랑 관심있는 태그입력 넣기 */}
              <div className="description">
                <label>한 줄 내소개</label>
                <input
                  type="description"
                  id="description"
                  name="description"
                  value={userData.description}
                  placeholder="내 소개를 자유롭게 해보세요 80자까지 가능합니다."
                  maxLength={80}
                  onChange={handleChange}
                />
                <Button onClick={saveUser}>저장</Button>
              </div>
              <label>관심있는 태그입력</label>
              <div className="tagalign">
                <div className={s.tags}>
                  {tags.map((item, index) => (
                    <span key={index} onClick={() => clickTag(item)} className={`tag ${selectedTags.tags.includes(item) ? [s.is_select] : ""}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="line-style">
                <div className="jb-division-line"></div>
                <span>회원가입에 필요한 기본정보를 입력해주세요(필수입니다)</span>
                <div className="jb-division-line"></div>
              </div>
              <fieldset className="useraccount">
                <legend>정보수정</legend>
                <div className="">
                  <table className="userinfoTable">
                    <thead />
                    <tbody>
                      <tr>
                        <th>
                          <label>이메일 : {""}</label>
                        </th>
                        <td>
                          <input name="email" value={userData.email} onChange={handleChange} type="text" />
                          <Button>저장</Button>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <label>아이디 : {""}</label>
                        </th>
                        <td>
                          <input name="userid" value={userData.userid} onChange={handleChange} type="text" />
                          <Button>저장</Button>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <label>닉네임 : {""}</label>
                        </th>
                        <td>
                          <input name="nickname" value={userData.nickname} onChange={handleChange} type="text" />
                          <Button>저장</Button>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <label>비밀번호 : {""}</label>
                        </th>
                        <td>
                          <input name="password" autoComplete="password" value={userData.password} onChange={handleChange} type="password" />
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <label>비밀번호확인 : {""}</label>
                        </th>
                        <td>
                          <input name="password" autoComplete="password" value={userData.password} onChange={handleChange} type="password" />
                          <Button>저장</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Button onClick={reset}>리셋</Button>
                </div>
              </fieldset>
            </Form>
          </div>
        )}
        {select === 1 && (
          <form className="delete">
            <div className="deletgaider">
              회원 탈퇴일로부터 계정과 닉네임을 포함한 계정 정보(아이디/이메일/닉네임)는 개인정보 보호방침에 따라 60일간 보관(잠김)되며, 60일 경과된
              후에는 모든 개인 정보는 완전히 삭제되며 더 이상 복구할 수 없게 됩니다. 작성된 게시물은 삭제되지 않으며, 익명처리 후 디톡스로 소유권이
              귀속됩니다.
            </div>
            <input type="checkbox" />
            <label>계정 삭제에 관한 정책을 읽고 이에 동의합니다</label>
            <br />
            <Button>회원탈퇴 버튼</Button>
          </form>
        )}
      </section>
    </MypageContent>
  );
}

export default Account;
