import axios from "axios";
import Form from "components/form/Form";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { API_HEADER, ROOT_API } from "constants/api";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_TOKEN } from "store/Auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "../studyRoom/studyRoomPost/studyRoom.module.scss";
import "./Regist.scss";

axios.defaults.withCredentials = true;

const Regist = () => {
  const notify = () => toast("Wow so easy !");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const authlogins = "D-Talks";
  const useridRef = useRef(null);
  const nicknameRef = useRef(null);
  const discriptionref = useRef(null);
  const profileRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState({
    tags: [],
    authJoin: true,
    joinableCount: 1,
  });
  const [modal, setModal] = useState(false);
  const [imageFile, setImageFile] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [duplicateId, setDuplicateId] = useState("");
  const [duplicateNickName, setDuplicateNickName] = useState("");
  let [inputEmail, setInputEmail] = useState("");
  const [verityEmailcheck, setVerityEmailcheck] = useState(false);
  const [compareEmailcheck, setCompareEmailcheck] = useState(false);
  const [typetoggle, setTypetoggle] = useState("password");
  const [code, setCode] = useState("");
  const tags = [
    "DJANGO",
    "SPRING",
    "JAVASCRIPT",
    "JAVA",
    "PYTHON",
    "CPP",
    "REACT",
    "AWS",
  ];
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
        const response = await axios.post(
          `${ROOT_API}/users/profile/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              accept: "application/json",
            },
            file: "file=@22.JPG;type=image/jpeg",
          }
        );
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
    if (
      verityEmailcheck &&
      compareEmailcheck &&
      !duplicateId &&
      !duplicateNickName
    ) {
      //NOTE 버튼 다 클릭하면 실행
      console.log(`
  email: ${data.userEmail},
  nickname: ${data.nickname},
  userid: ${data.userid},
  password: ${data.password},
  skills: ${selectedTags.tags},
  description: ${data.description},
  profileImageId: ${profileImageId}`);
      axios
        .post(
          `${ROOT_API}/sign-up`,
          {
            email: data.userEmail,
            nickname: data.nickname,
            userid: data.userid,
            password: data.password,
            skills: selectedTags.tags,
            description: data.discription,
            profileImageId: profileImageId,
          },
          {
            headers: {
              API_HEADER,
            },
          }
        )
        .then(function (response) {
          console.log("회원가입 성공:", response);
          axios
            .post(
              `${ROOT_API}/sign-in`,
              {
                userid: data.userid,
                password: data.password,
              },
              {
                headers: {
                  API_HEADER,
                },
              }
            )
            .then(function (response) {
              console.log("로그인 성공:", response);
              dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
              localStorage.setItem("token", response.data.accessToken);
              setModal(true);
              navigate("/");
              reset();
            })
            .catch(function (error) {
              console.log("로그인 실패: ", error.response.data);
            });
        })
        .catch(function (error) {
          console.log("회원가입 실패:", error.response.data);
        });
    } else {
      alert("중복체크나 인증을 안했어요");
    }
  };

  const validateDuplicate = (data) => {
    //NOTE 중복체크 통신//ok
    const type = data;
    const value = watch(data);
    console.log("넣은 데이터", watch(data));
    axios
      .get(`${ROOT_API}/users/check/${type}/${value}`)
      .then(function (response) {
        if (type === "userid") {
          response.data.duplicated === true
            ? setDuplicateId(true)
            : setDuplicateId(false);
        }
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

  const verityEmail = (e) => {
    //NOTE 이메일 인증//ok
    e.preventDefault();
    console.log("dc", watch().userEmail);
    axios
      .get(`${ROOT_API}/email/verify`, {
        params: { email: watch().userEmail },
      })
      .then(function (response) {
        setVerityEmailcheck(true);
        setCode(response.data.code);
        toast.success("😎 인증문자가 발송되었습니다", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch(function (error) {
        console.log("인증 실패: ", error.response.data);
        toast.error("😎 이메일을 제대로 입력해주세요", {
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
  const compareEmail = (e) => {
    //NOTE 인증확인//ok
    e.preventDefault();
    if (code === inputEmail && code) {
      toast.success("😎 인증이 확인되었습니다", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setCompareEmailcheck(true);
    } else {
      toast.error("😎 인증을 제대로 확인해주세요", {
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
  const handleInputChange = (e) => {
    setInputEmail(e.target.value);
  };

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
  const typechange = () => {
    //NOTE 비밀번호 토글//ok
    setTypetoggle("text");

    setTimeout(() => {
      setTypetoggle("password");
    }, 1000);
  };

  return (
    <div className="regist-page page">
      {/* 경고창  */}
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
      {modal && (
        <BasicModal setOnModal={() => setModal()}>
          회원가입이 완료되었습니다. <br />
          확인을 누르시면 메인으로 이동합니다.
          <button onClick={() => navigate("/")}>확인</button>
        </BasicModal>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="form_1">
          <legend>정보입력</legend>

          <div className="userregistpage"></div>
          <div className="headername">
            <p>{authlogins}계정 회원가입</p>
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
                <span>Gravartar</span>를 이용한 프로필 변경은 여기를
                참고해주세요.
              </li>
            </ul>
          </div>

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
          <div className="description">
            <label>한 줄 내소개</label>
            <input
              tabIndex="1"
              type="description"
              id="description"
              ref={discriptionref}
              placeholder="내 소개를 자유롭게 해보세요 80자까지 가능합니다."
              maxLength={80}
              // {...register('description', { required: true })} //NOTE 필수에서 선택으로 변경
            />
          </div>
          <div className="line-style">
            <div className="jb-division-line"></div>
            <span>회원가입에 필요한 기본정보를 입력해주세요(필수입니다)</span>
            <div className="jb-division-line"></div>
          </div>
          <h2>Developer-Talks 계정 만들기</h2>
          <p className="chk">*필수사항 입니다.</p>
          <table className="userinfoTable">
            <thead />
            <tbody>
              <tr>
                <th>
                  <label htmlFor="userEmail">이메일</label>{" "}
                  {/* TODO 쓴 이메일은 다시 못씀, //TODO 이메일 인증완료 후 다른 이메일 작업할 시 로그인 가능.. */}
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="email"
                    id="userEmail"
                    placeholder="이메일을 입력해주세요"
                    tabIndex="2"
                    {...register("userEmail", {
                      required: "이메일은 필수 입력입니다.",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "이메일 형식에 맞지 않습니다.",
                      },
                    })}
                  />

                  <button onClick={verityEmail} tabIndex="3">
                    이메일인증
                  </button>
                  {errors.userEmail && (
                    <small role="alert">{errors.userEmail.message}</small>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label>이메일 인증</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    tabIndex="4"
                    type="text"
                    id="userEmails"
                    placeholder="입력해주세요"
                    {...register("username", { required: true })}
                    onChange={handleInputChange}
                  />
                  <button onClick={compareEmail} tabIndex="5">
                    확인
                  </button>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="nickname">닉네임</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="text"
                    id="nickname"
                    placeholder="닉네임을 입력해주세요"
                    tabIndex="6"
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
                  <button
                    tabIndex="7"
                    title="중복체크"
                    onClick={(e) => {
                      e.preventDefault();
                      validateDuplicate("nickname");
                    }}
                  >
                    중복체크
                  </button>
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
                      <small className="true">
                        사용할 수 있는 닉네임입니다.
                      </small>
                    )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="userid">아이디</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="text"
                    id="userid"
                    placeholder="아이디를 입력해주세요"
                    maxLength={15}
                    ref={useridRef}
                    tabIndex="8"
                    {...register("userid", {
                      required: "아이디는 필수 입력입니다.",
                      minLength: {
                        value: 5,
                        message: "5자리 이상 아이디를 사용해주세요.",
                      },
                      maxLength: {
                        value: 15,
                        message: "15자리 이하 아이디를 사용해주세요.",
                      },
                    })}
                  />
                  <button
                    tabIndex="9"
                    title="중복체크"
                    onClick={(e) => {
                      e.preventDefault();
                      validateDuplicate("userid");
                    }}
                  >
                    중복체크
                  </button>
                  {errors.userid && (
                    <small role="alert">{errors.userid.message}</small>
                  )}
                  {duplicateId !== "" && duplicateId === true && (
                    <small className="alert">중복된 아이디입니다.</small>
                  )}
                  {duplicateId !== "" && duplicateId === false && (
                    <small className="true">사용할 수 있는 아이디입니다.</small>
                  )}
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="password">비밀번호</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type={typetoggle}
                    id="password"
                    placeholder="최소 1개의 특수문자를 포함해주세요"
                    maxLength={15}
                    tabIndex="10"
                    {...register("password", {
                      required: "비밀번호는 필수 입력입니다.",
                      minLength: {
                        value: 8,
                        message: "8자리 이상 비밀번호를 사용해주세요.",
                      },
                      maxLength: {
                        value: 15,
                        message: "15자리 이히 비밀번호를 사용해주세요.",
                      },
                      pattern: {
                        value: /.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*/,
                        message: "특수문자를 포함해주세요",
                      },
                    })}
                  />
                  {errors.password && (
                    <small role="alert">{errors.password.message}</small>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="passwordChk">비밀번호 확인</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type={typetoggle}
                    id="passwordChk"
                    placeholder="비밀번호를 한 번 더 입력해주세요"
                    tabIndex="11"
                    maxLength={15}
                    {...register("passwordChk", {
                      required: "비밀번호는 필수 입력입니다.",
                      minLength: {
                        value: 8,
                        message: "8자리 이상 비밀번호를 사용해주세요.",
                      },
                      maxLength: {
                        value: 15,
                        message: "15자리 이히 비밀번호를 사용해주세요.",
                      },
                      pattern: {
                        value: /.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*/,
                        message: "특수문자를 포함해주세요",
                      },
                      validate: (val) => {
                        if (watch("password") !== val) {
                          return "비밀번호가 일치하지 않습니다.";
                        }
                      },
                    })}
                  />
                  {errors.passwordChk && (
                    <small role="alert">{errors.passwordChk.message}</small>
                  )}
                  <div
                    className="typechange"
                    type="typechange"
                    onClick={typechange}
                  >
                    👀
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
        <div className="registSubmit">
          <button type="submit" tabIndex="12" disabled={isSubmitting}>
            {" "}
            가입하기
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Regist;
