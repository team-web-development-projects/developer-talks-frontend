import axios from "axios";
import Button from "components/button/Button";
import { API_HEADER, ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SET_TOKEN } from "store/Auth";
import { setRefreshToken } from "store/Cookie";
import s from "../studyRoom/studyRoomPost/studyRoom.module.scss";
import "./Userregist.scss";

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
  const [description, setDescription] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [duplicateNickName, setDuplicateNickName] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const handleCheckboxChange = (event) => {
    setAutoLogin(event.target.checked);
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
  const propileSubmit = async (data) => {
    try {
      if (
        profileRef.current &&
        profileRef.current.files &&
        profileRef.current.files.length > 0
      ) {
        const formData = new FormData(); //NOTE 프로필 이미지
        formData.append("file", profileRef.current.files[0]);
        const response = await axios.post(`${ROOT_API}/users/profile/image`, formData, {
          headers: {
            "X-AUTH-TOKEN": auth.accessToken,
            "Content-Type": "multipart/form-data",
            accept: "application/json",
          },
        });
        console.log(response.data, "dfd,,,fd");
        console.log(formData, "dfdfd");
        setProfileImageId(response.data.id);
      } else {
        console.log("파일을 선택해주세요.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    if (!duplicateNickName) {
      console.log(`
      nickname: ${data.nickname},
      skills: ${selectedTags.tags},
      description: ${description},
      profileImageId: ${profileImageId}`);
      axios
        .post(
          `${ROOT_API}/oauth/sign-up`,
          {
            nickname: data.nickname,
            skills: selectedTags.tags,
            description: description,
            profileImageId: profileImageId, //NOTE 용후님이 선택으로 수정
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-AUTH-TOKEN": auth.accessToken,
            },
          }
        )
        .then(function (response) {
          console.log("회원가입 성공:", response);
          if (autoLogin) {
            //NOTE 자동로그인
            setRefreshToken({ refreshToken: response.data.refreshToken });
            dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
            alert("토큰저장");
            navigate("/");
            reset();
          }
        })
        .catch(function (error) {
          console.log("로그인 실패: ", error.response);
          toast.error("😎 로그인 절차를 확인해주세요", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    } else {
      toast.error("😎 인증을 확인해주세요", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

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
          response.data.duplicated === true
            ? setDuplicateNickName(true)
            : setDuplicateNickName(false);
        }
      })
      .catch(function (error) {
        console.log("확인 실패:", error.response.data);
        toast.error("😎 중복체크를 제대로 확인해주세요", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
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
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="center">
        <div className="headername">
          <p>{authlogins}계정을이용한 회원가입</p>
          <span>
            Developer-Talks는 소프트웨어 개발자를 위한 지식공유 플렛폼입니다.
          </span>
        </div>
        <div className="prople">
          <div className="imgwrap">
            {imageFile && <img src={imageFile} alt="프로필이미지" />}
            <input
              accept="image/*"
              ref={profileRef}
              type="file"
              name="프로필이미지"
              id="profile"
            />
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            propileSubmit();
          }}
        >
          버튼
        </button>
        <span>프로필 이미지 선택☝️</span>

        <div className="gaider">
          <span>🙏추가 안내</span>
          <ul>
            <li>
              <span>프로필 이미지 변경</span>은 회원가입 이후에도 가능합니다.
            </li>
            <li>
              <span>Gravartar</span>를 이용한 프로필 변경은 여기를 참고해주세요.
            </li>
          </ul>
        </div>
      </div>
      <div className="line-style">
        <div className="jb-division-line"></div>
        <span>회원가입에 필요한 기본정보를 입력해주세요</span>
        <div className="jb-division-line"></div>
      </div>
      <form className="registIDform" onSubmit={handleSubmit(onSubmit)}>
        <div className="emailmodule">
          <label>이메일</label>
          <input
            className="disable"
            type="text"
            placeholder={userEmail}
            readOnly
          />
        </div>
        <div className="labelmodule">
          <div className="labeltitle">
            <label>닉네임</label>
            <span className="star" title="필수사항">
              *
            </span>
          </div>
          <div className="inputcont">
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
          {errors.nickname && (
            <small role="alert">{errors.nickname.message}</small>
          )}
          {!errors.nickname &&
            duplicateNickName !== "" &&
            duplicateNickName === true && (
              <small className="alert">중복된 닉네임입니다.</small>
            )}
          {!errors.nickname &&
            duplicateNickName !== "" &&
            duplicateNickName === false && (
              <small className="true">사용할 수 있는 닉네임입니다.</small>
            )}
        </div>
        <div className="tagmodule">
          <label>관심있는 태그입력</label>
          <div className="tagalign">
            <div className={s.tags}>
              {tags.map((item, index) => (
                <span
                  key={index}
                  onClick={() => clickTag(item)}
                  className={`tag ${
                    selectedTags.tags.includes(item) ? [s.is_select] : ""
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="description">
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
        <div className="loginbutton">
          <label>자동로그인</label>
          <input
            type="checkbox"
            checked={autoLogin}
            onChange={handleCheckboxChange}
          />
          <Button type="submit" disabled={isSubmitting}>
            간편 회원가입
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Userregist;
