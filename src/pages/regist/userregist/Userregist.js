import axios from "axios";
import Button from "components/button/Button";
import Form from "components/form/Form";
import { Label } from "components/label/Label";
import LineStyle from "components/lineStyle/LineStyle";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import Table from "components/table/Table";
import { AuthTitle, GaiderTitle } from "components/title/Title";
import { ToastCont } from "components/toast/ToastCont";
import { showToast } from "components/toast/showToast";
import { API_HEADER, ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_TOKEN } from "store/Auth";
import { setRefreshToken } from "store/Cookie";
import s from "../regist.module.scss";

const Userregist = () => {
  const [authlogins, setAutologins] = useState("");
  let navigate = useNavigate();
  const auth = useSelector((state) => state.authToken);

  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [selectedTags, setSelectedTags] = useState({
    tags: [],
    authJoin: true,
    joinableCount: 1,
  });
  const nicknameRef = useRef(null);
  const profileRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [duplicateNickName, setDuplicateNickName] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const handleCheckboxChange = (event) => {
    setAutoLogin(event.target.checked);
  };

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    if (duplicateNickName === false) {
      console.log(`
      nickname: ${data.nickname},
      skills: ${selectedTags.tags},
      description: ${description},
      profileImageId: ${profileImageId}`);
      axios
        .put(
          `${ROOT_API}/oauth/sign-up`,
          {
            nickname: data.nickname,
            skills: selectedTags.tags,
            description: description,
            profileImageId: profileImageId,
          },
          {
            headers: {
              "Content-Type": "application/json", //NOTE 이건 안됌
              // "X-AUTH-TOKEN": auth.accessToken,
              "X-AUTH-TOKEN": localStorage.getItem("authAtk"),
            },
          }
        )
        .then(function (response) {
          console.log("회원가입 성공:", response);
          setModal(true);
          // if (autoLogin) {
          //NOTE 자동로그인
          localStorage.removeItem("authAtk");
          localStorage.setItem("refreshToken", response.data.refreshToken);
          dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
          navigate("/");
          reset();
          // }
        })
        .catch(function (error) {
          console.log("로그인 실패: ", error.response);
          showToast("error", "😎 로그인 실패되었어요");
        });
    } else {
      showToast("error", "😎 모든 버튼을 클릭하지 않았어요");
    }
  };
  useEffect(() => {
    if (auth.accessToken) {
      setUserEmail(parseJwt(auth.accessToken).sub); //NOTE 이메일 토큰으로 넣기 //ok
      setAutologins(parseJwt(auth.accessToken).provider);
    }
  }, [auth.accessToken, userEmail]);

  const tags = [
    //스킬오류
    "DJANGO",
    "SPRING",
    "JAVASCRIPT",
    "JAVA",
    "PYTHON",
    "CPP",
    "REACT",
    "AWS",
  ];
  const savedescription = (e) => {
    //NOTE 자기소개
    setDescription(e.target.value);
  };
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  const [profileImageId, setProfileImageId] = useState("");
  // const propileSubmit = async (data) => {
  //   try {
  //     if (profileRef.current && profileRef.current.files && profileRef.current.files.length > 0) {
  //       const formData = new FormData(); //NOTE 프로필 이미지
  //       formData.append("file", profileRef.current.files[0]);
  //       const response = await axios.post(`${ROOT_API}/users/profile/image`, formData, {
  //         headers: {
  //           "X-AUTH-TOKEN": auth.accessToken,
  //           "Content-Type": "multipart/form-data",
  //           accept: "application/json",
  //         },
  //       });
  //       console.log(response.data, "dfd,,,fd");
  //       console.log(formData, "dfdfd");
  //       setProfileImageId(response.data.id);
  //     } else {
  //       console.log("파일을 선택해주세요.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const inputRef = useRef(null);

  const validateDuplicate = (data) => {
    //NOTE 중복체크 통신//ok
    const type = data;
    const value = watch(data);
    console.log("넣은 데이터", watch(data));
    axios
      .get(`${ROOT_API}/users/check/${type}/${value}`)
      .then(function (response) {
        if (type === "nickname") {
          if (response.data.duplicated === true) {
            setDuplicateNickName(true);
            showToast("error", "😎 닉네임이 중복되었습니다.");
          } else {
            setDuplicateNickName(false);
            console.log(response.data);
          }
        }
      })
      .catch(function (error) {
        console.log("확인 실패:", error.response.data);
        showToast("error", "😎 중복체크를 제대로 확인해주세요");
      });
  };

  const clickTag = (tag) => {
    console.log(auth.accessToken, "토큰");

    //NOTE 기술 테그/ok
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
    console.log("dd", selectedTags.tags, typeof selectedTags.tags);
  };

  return (
    <div className="userregistname">
      <ToastCont />
      {modal && (
        <BasicModal setOnModal={() => setModal()}>
          회원가입이 완료되었습니다. <br />
          확인을 누르시면 메인으로 이동합니다.
          <button onClick={() => navigate("/")}>확인</button>
        </BasicModal>
      )}
      <Form White className="registIDform" onSubmit={handleSubmit(onSubmit)}>
        <AuthTitle authlogins={authlogins} />
        <div className={s.prople}>
          <div className={s.imgwrap}>
            {imageFile && <img src={imageFile} alt="프로필이미지" />}
            <input accept="image/*" ref={profileRef} type="file" name="프로필이미지" id="profile" />
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            // propileSubmit();
          }}
        >
          버튼
        </button>
        <span>프로필 이미지 선택☝️</span>
        <GaiderTitle />
        <label>관심있는 태그입력</label>
        <div className={s.tagalign}>
          <div className={s.tags}>
            {tags.map((item, index) => (
              <span key={index} onClick={() => clickTag(item)} className={`tag ${selectedTags.tags.includes(item) ? [s.is_select] : ""}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className={s.description}>
          <label>한 줄 내소개</label>
          <input
            type="description"
            id="description"
            value={description}
            onChange={savedescription}
            placeholder="내 소개를 자유롭게 해보세요 80자까지 가능합니다."
            maxLength={80}
          />
        </div>
        <LineStyle text={"회원가입에 필요한 기본정보를 입력해주세요(필수입니다)"} />
        <Table tableTitle={"Developer-Talks 계정 만들기"} tableText={"*필수사항 입니다."}>
          <li className={s.tableAlign}>
            <div className={s.errorcheck}>
              <Label children={"이메일"} htmlFor="userEmail" />
              <input id="userEmail" className="disable" type="text" placeholder={userEmail} readOnly />
            </div>
          </li>
          <li className={s.tableAlign}>
            <div className={s.errorcheck}>
              <Label isRequire children={"닉네임"} htmlFor="nickname" />
              <input
                type="text"
                id="nickname"
                placeholder="닉네임을 입력해주세요"
                tabIndex="2"
                ref={nicknameRef}
                maxLength={15}
                {...register("nickname", {
                  required: "닉네임은 필수 입력입니다.",
                  minLength: {
                    value: 5,
                    message: "5자리 이상 입력해주세요.",
                  },
                })}
              />
              <Button
                title="중복체크"
                onClick={(e) => {
                  e.preventDefault();
                  validateDuplicate("nickname");
                }}
              >
                중복체크
              </Button>
            </div>
            {errors.nickname && <small role="alert">{errors.nickname.message}</small>}
            {!errors.nickname && duplicateNickName !== "" && duplicateNickName === true && <small className="alert">중복된 닉네임입니다.</small>}
            {!errors.nickname && duplicateNickName !== "" && duplicateNickName === false && (
              <small className="true">사용할 수 있는 닉네임입니다.</small>
            )}
          </li>
        </Table>

        <div className="loginbutton">
          <label>자동로그인</label>
          <input type="checkbox" checked={autoLogin} onChange={handleCheckboxChange} />
          <Button FullWidth size="large" type="submit" disabled={isSubmitting}>
            간편 회원가입
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Userregist;
