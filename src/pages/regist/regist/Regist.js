import axios from "axios";
import Button from "components/button/Button";
import Forms from "components/form/Forms";
import LineStyle from "components/lineStyle/LineStyle";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "../regist.module.scss";
import ProfileImg from "components/profileImg/ProfileImg";
import Tags from "components/tags/Tags";

axios.defaults.withCredentials = true;

const Regist = () => {
  let navigate = useNavigate();
  const authlogins = "D-Talks";
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState({
    tags: [],
    authJoin: true,
    joinableCount: 1,
  });
  
  const [modal, setModal] = useState(false);
  const [profileImgData, setProfileImgData] = useState({
    id: "",
    url: "",
    inputName: "",
  });

  const savedescription = (e) => {
    //NOTE 자기소개
    setDescription(e.target.value);
  };

  return (
    <>
      {modal && (
        <BasicModal setOnModal={() => setModal()}>
          회원가입이 완료되었습니다. <br />
          확인을 누르시면 메인으로 이동합니다.
          <Button onClick={() => navigate("/")}>확인</Button>
        </BasicModal>
      )}
      <div className={s.formWrap}>
        <div className={s.headername}>
          <p>{authlogins} 계정 회원가입</p>
          <span>Developer-Talks는 소프트웨어 개발자를 위한 지식공유 플렛폼입니다.</span>
        </div>
        <div className={s.gaider}>
          <span>프로필 이미지 변경</span>은 회원가입 이후에도 가능합니다.
        </div>
        <ProfileImg profileImgData={profileImgData} setProfileImgData={setProfileImgData} type="regist" />
        <Tags setSelectedTags={setSelectedTags} selectedTags={selectedTags} text={"태그를 선택해주세요"} />
        <div className={s.description}>
          <label>한 줄 내소개</label>
          <input
            tabIndex="1"
            type="description"
            id="description"
            value={description}
            onChange={savedescription}
            placeholder="내 소개를 자유롭게 해보세요 80자까지 가능합니다."
            maxLength={80}
          />
        </div>
        <LineStyle text={"회원가입에 필요한 기본정보를 입력해주세요(필수입니다)"} />
      </div>

      <Forms
        tableTitle={"Ddddd"}
        tableText={"Ddd"}
        setModal={setModal}
        selectedTags={selectedTags}
        description={description}
        profileImgData={profileImgData}
      />
    </>
  );
};

export default Regist;
