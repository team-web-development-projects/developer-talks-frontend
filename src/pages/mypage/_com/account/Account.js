import axios from "axios";
import Button from "components/button/Button";
import LineStyle from "components/lineStyle/LineStyle";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MypageContent from "../../MyPageContent";
import s from "../../mypagecontent.module.scss";
import account from "./account.module.scss";
import { parseJwt } from "hooks/useParseJwt";
import ProfileImg from "components/profileImg/ProfileImg";
import Description from "pages/mypage/_com_Account/Description";
import Email from "pages/mypage/_com_Account/Email";
import Userid from "pages/mypage/_com_Account/Uerid";
import Password from "pages/mypage/_com_Account/Password";
import Nickname from "pages/mypage/_com_Account/Nickname";
import Private from "components/private/Private";


function Account() {
  const auth = useSelector((state) => state.authToken);
  const provider = parseJwt(auth.accessToken).provider;
  let disabled;
  if (provider) {
    disabled = true;
  }
  const tabTitle = ["회원정보 수정", "회원 탈퇴"];
  const [select, setSelect] = useState(0);
  const [userData, setUserData] = useState(""); //유저데이터 가져오기
  const onSelect = (type) => {
    setSelect(type);
  };
    // const [profileImgData, setProfileImgData] = useState({
    //   id: "",
    //   url: "",
    //   inputName: "",
    // });
  const [selectedTags, setSelectedTags] = useState({
    tags: [],
    authJoin: true,
    joinableCount: 1,
  });

  const handleChange = (e) => {
    console.log(userData.userid);
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`${ROOT_API}/users/info`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then(({ data }) => {
        setUserData(data);
        setSelectedTags({ ...selectedTags, tags: data.skills });
      });
  }, [auth.accessToken]);

  // const validateDuplicate = (data) => {
  //   //NOTE 중복체크 통신//ok
  //   const type = data;
  //   const value = watch(data);
  //   axios
  //     .get(`${ROOT_API}/users/check/${type}/${value}`)
  //     .then(function (response) {
  //       if (type === "userid") {
  //         if (response.data.duplicated === true) {
  //           setDuplicateId(true);
  //           showToast("error", "😎 아이디가 중복되었습니다.");
  //         } else {
  //           setDuplicateId(false);
  //         }
  //       }
  //       if (type === "nickname") {
  //         if (response.data.duplicated === true) {
  //           setDuplicateNickName(true);
  //           showToast("error", "😎 닉네임이 중복되었습니다.");
  //         } else {
  //           setDuplicateNickName(false);
  //         }
  //       }
  //     })
  //     .catch(() => {
  //       showToast("error", "😎 중복체크를 제대로 확인해주세요");
  //     });
  // };

  return (
    <>
      <section className={s.contentWrap}>
        <ul className={s.nav}>
          {tabTitle.map((item, index) => (
            <li key={index}>
              <button onClick={() => onSelect(index)} className={`${select === index ? `${s.select}` : ""}`}>
                {item}
              </button>
            </li>
          ))}
        </ul>
        {select === 0 && (
          <>
          <Private/>
            {/* <ProfileImg nickname={"aa"} size="big" profileImgData={profileImgData} setProfileImgData ={setProfileImgData}/> */}
            <Description
              auth={auth}
              ROOT_API={ROOT_API}
              axios={axios}
              userData={userData}
              handleChange={handleChange}
              account={account}
              showToast={showToast}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <LineStyle gray text={" 기본정보를 입력해주세요"} />
            <Nickname auth={auth} ROOT_API={ROOT_API} axios={axios} userData={userData} showToast={showToast} handleChange={handleChange} />
            <Email
              auth={auth}
              ROOT_API={ROOT_API}
              axios={axios}
              disabled={disabled}
              showToast={showToast}
              userData={userData}
              handleChange={handleChange}
            />
            <Userid
              auth={auth}
              ROOT_API={ROOT_API}
              axios={axios}
              disabled={disabled}
              userData={userData}
              showToast={showToast}
              handleChange={handleChange}
            />
            <Password
              auth={auth}
              ROOT_API={ROOT_API}
              axios={axios}
              disabled={disabled}
              showToast={showToast}
              userData={userData}
              handleChange={handleChange}
            />
          </>
        )}
        {select === 1 && (
          <form className={account.delete}>
            <div className={s.deletgaider}>
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
    </>
  );
}

export default Account;
