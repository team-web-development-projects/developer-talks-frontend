import axios from "axios";
import Button from "components/button/Button";
import Form from "components/form/Form";
import Label from "components/label/Label";
import LineStyle from "components/lineStyle/LineStyle";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import Table from "components/table/Table";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_TOKEN } from "store/Auth";
import s from "../regist.module.scss";

const Userregist = () => {
  const auth = useSelector((state) => state.authToken);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [authlogins, setAutologins] = useState("");
  const [selectedTags, setSelectedTags] = useState({
    tags: [],
    authJoin: true,
    joinableCount: 1,
  });
  const nicknameRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [duplicateNickName, setDuplicateNickName] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const [imageFile, setImageFile] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImageId, setProfileImageId] = useState("");
  const handleCheckboxChange = (event) => {
    setAutoLogin(event.target.checked);
  };
  const handleChangeProfileImage = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImageFile(imageUrl);
    showToast("success", "😎 이미지가 업로드 되었습니다");
  };
  const submit = async (data) => {
    // await new Promise((r) => setTimeout(r, 1000));
    console.log("버튼 클릭", duplicateNickName);
    if (!selectedImage) {
      return;
    }
    console.log(selectedImage);
    const formData = new FormData();
    formData.append("file", selectedImage);
    if (duplicateNickName === false) {
      console.log("dat", data);
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
              "Content-Type": "application/json",
              "X-AUTH-TOKEN": localStorage.getItem("authAtk"),
            },
          }
        )
        .then((response) => {
          console.log("로그인체크", response);
          setModal(true);
          // if (autoLogin) {
          //NOTE 자동로그인
          localStorage.removeItem("authAtk");
          localStorage.setItem("dtrtk", response.data.refreshToken);
          dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
          navigate("/");
          reset();
          // }
        })
        .catch(() => {
          showToast("error", "😎 로그인 실패되었어요");
        });

      axios
        .post(`${ROOT_API}/users/profile/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          setProfileImageId(response.data.id);
          console.log(`
      nickname: ${data.nickname},
      skills: ${selectedTags.tags},
      description: ${description},
      profileImageId: ${profileImageId}`);
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

  const validateDuplicate = (data) => {
    //NOTE 중복체크 통신//ok
    const type = data;
    const value = watch(data);
    axios
      .get(`${ROOT_API}/users/check/${type}/${value}`)
      .then((response) => {
        if (type === "nickname") {
          if (response.data.duplicated === true) {
            setDuplicateNickName(true);
            showToast("error", "😎 닉네임이 중복되었습니다.");
          } else {
            setDuplicateNickName(false);
          }
        }
      })
      .catch(() => {
        showToast("error", "😎 중복체크를 제대로 확인해주세요");
      });
  };

  const clickTag = (tag) => {
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
      {modal && (
        <BasicModal setOnModal={() => setModal()}>
          회원가입이 완료되었습니다. <br />
          확인을 누르시면 메인으로 이동합니다.
          <button onClick={() => navigate("/")}>확인</button>
        </BasicModal>
      )}
      <Form White className="registIDform" onSubmit={handleSubmit(submit)}>
        <div className={s.headername}>
          <p>{authlogins} 계정 회원가입</p>
          <span>Developer-Talks는 소프트웨어 개발자를 위한 지식공유 플렛폼입니다.</span>
        </div>
        <div className={s.prople}>
          <div className={s.imgwrap}>
            {imageFile && <img src={imageFile} alt="프로필이미지" />}
            <input accept="image/*" type="file" name="프로필이미지" onChange={handleChangeProfileImage} id="profile" />
          </div>
        </div>
        <span>프로필 이미지 선택☝️</span>
        <div className={s.gaider}>
          <span>🙏추가 안내</span>
          <ul>
            <li>
              <span>프로필 이미지 변경</span>은 회원가입 이후에도 가능합니다.
            </li>
            <li>
              <span>디톡스</span>를 이용한 프로필 변경은 여기를 참고해주세요.
            </li>
          </ul>
        </div>
        <label>관심있는 태그입력</label>
        <div className={s.tagalign}>
          <div className={s.tags}>
            {tags.map((item, index) => (
              <span
                key={index}
                onClick={() => clickTag(item)}
                className={`tag ${selectedTags.tags.includes(item) ? [s.is_select] : ""}`}
              >
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
        <LineStyle>회원가입에 필요한 기본정보를 입력해주세요(필수입니다)</LineStyle>
        <Table tableTitle={"Developer-Talks 계정 만들기"} tableText={"*필수사항 입니다."}>
          <div>
            <div>
              <Label htmlFor="userEmail">이메일</Label>
              <input id="userEmail" className="disable" type="text" placeholder={userEmail} readOnly />
            </div>
            <div>
              <Label isRequire htmlFor="nickname">
                닉네임
              </Label>
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
                // size="large"
                onClick={(e) => {
                  e.preventDefault();
                  validateDuplicate("nickname");
                }}
              >
                중복체크
              </Button>
            </div>
            {errors.nickname && <small role="alert">{errors.nickname.message}</small>}
            {!errors.nickname && duplicateNickName !== "" && duplicateNickName === true && (
              <small className="alert">중복된 닉네임입니다.</small>
            )}
            {!errors.nickname && duplicateNickName !== "" && duplicateNickName === false && (
              <small className="true">사용할 수 있는 닉네임입니다.</small>
            )}
          </div>
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
