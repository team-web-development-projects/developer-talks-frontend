import axios from "axios";
import Form from "components/form/Form";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { ToastCont } from "components/toast/ToastCont";
import { showToast } from "components/toast/showToast";
import { API_HEADER, ROOT_API } from "constants/api";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_TOKEN } from "store/Auth";
import s from "../regist.module.scss";
import { AuthTitle, GaiderTitle } from "components/title/Title";
import { Label } from "components/label/Label";
import LineStyle from "components/lineStyle/LineStyle";
import Table from "components/table/Table";
import Button from "components/button/Button";

axios.defaults.withCredentials = true;

const Regist = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const authlogins = "D-Talks";
  const useridRef = useRef(null);
  const nicknameRef = useRef(null);
  const [description, setDescription] = useState("");
  const profileRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState({
    tags: [],
    authJoin: true,
    joinableCount: 1,
  });
  const [modal, setModal] = useState(false);
  const [imageFile, setImageFile] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const [duplicateId, setDuplicateId] = useState("");
  const [duplicateNickName, setDuplicateNickName] = useState("");
  let [inputEmail, setInputEmail] = useState("");
  const [verityEmailcheck, setVerityEmailcheck] = useState(false);
  const [compareEmailcheck, setCompareEmailcheck] = useState(false);
  const [typetoggle, setTypetoggle] = useState("password");
  const [code, setCode] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const tags = ["DJANGO", "SPRING", "JAVASCRIPT", "JAVA", "PYTHON", "CPP", "REACT", "AWS"];
  const savedescription = (e) => {
    //NOTE 자기소개
    setDescription(e.target.value);
  };
  const changeprofileImageId = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });
  const [profileImageId, setProfileImageId] = useState("");
  const formData = new FormData();
  formData.append("image", selectedImage);
  // const propileSubmit = () => {
  const propileSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1000));

    axios
      .post(
        `${ROOT_API}/users/profile/image`,
        formData,
        {
          id: selectedImage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    if (verityEmailcheck && compareEmailcheck && duplicateId === false && duplicateNickName === false) {
      //NOTE 버튼 다 클릭하면 실행
      console.log(`
  email: ${data.userEmail},
  nickname: ${data.nickname},
  userid: ${data.userid},
  password: ${data.password},
  skills: ${selectedTags.tags},
  description: ${description},
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
            description: description,
            profileImageId: profileImageId,
          },
          { headers: { API_HEADER } }
        )
        .then(() => {
          axios
            .post(`${ROOT_API}/sign-in`, { userid: data.userid, password: data.password }, { headers: { API_HEADER } })
            .then((response) => {
              dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
              localStorage.setItem("refreshToken", response.data.refreshToken);
              setModal(true);
              navigate("/");
              reset();
            })
            .catch(() => {
              showToast("error", "😎 로그인 실패되었어요");
            });
        })
        .catch(() => {
          showToast("error", "😎 회원가입 절차를 제대로 확인해주세요");
        });
    } else {
      showToast("error", "😎 모든 버튼에 확인되지 않았어요");
    }
  };

  const validateDuplicate = (data) => {
    //NOTE 중복체크 통신//ok
    const type = data;
    const value = watch(data);
    axios
      .get(`${ROOT_API}/users/check/${type}/${value}`)
      .then(function (response) {
        if (type === "userid") {
          if (response.data.duplicated === true) {
            //NOTE 중복체크 수정
            setDuplicateId(true);
            showToast("error", "😎 아이디가 중복되었습니다.");
          } else {
            setDuplicateId(false);
          }
        }
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

  const verityEmail = (e) => {
    //NOTE 이메일 인증//ok
    e.preventDefault();
    axios
      .get(`${ROOT_API}/users/check/email/${watch().userEmail}`) //NOTE 이메일 중복 확인//ok
      .then((response) => {
        if (response.data.duplicated === false) {
          axios
            .get(`${ROOT_API}/email/verify`, {
              params: { email: watch().userEmail },
            })
            .then(() => {
              setVerityEmailcheck(true);
              showToast("success", "😎 인증문자가 발송되었습니다");
            })
            .catch(() => {
              showToast("error", "😎 이메일을 제대로 입력해주세요");
            });
        } else {
          showToast("error", "😎 중복된 이메일입니다.");
        }
      });
  };
  const compareEmail = (e) => {
    //NOTE 인증확인//ok
    e.preventDefault();
    if (code === inputEmail && code) {
      showToast("success", "😎 인증이 확인되었습니다");
      setCompareEmailcheck(true);
    } else {
      showToast("error", "😎 인증을 제대로 확인해주세요");
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
    <>
      <ToastCont />
      {modal && (
        <BasicModal setOnModal={() => setModal()}>
          회원가입이 완료되었습니다. <br />
          확인을 누르시면 메인으로 이동합니다.
          <Button onClick={() => navigate("/")}>확인</Button>
        </BasicModal>
      )}
      <Form White onSubmit={handleSubmit(onSubmit)}>
        <legend>정보입력</legend>
        <AuthTitle authlogins={authlogins} />
        <div className={s.prople}>
          <div className={s.imgwrap}>
            {imageFile && <img src={imageFile} alt="프로필이미지" />}
            <input type="file" accept="image/*" onChange={changeprofileImageId} name="프로필이미지" id="profile" />
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
        <Table tableTitle={"Developer-Talks 계정 만들기"} tableText={"*필수사항 입니다."}>
          {[
            <>
              <div>
                <Label isRequire children={"이메일"} htmlFor="userEmail" />
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
                <Button onClick={verityEmail} tabIndex="3">
                  이메일인증
                </Button>
              </div>
              {errors.userEmail && <small role="alert">{errors.userEmail.message}</small>}
            </>,
            <>
              <div>
                <Label isRequire children={"이메일 인증"} htmlFor="userEmail" />
                <input
                  tabIndex="4"
                  type="text"
                  id="userEmail"
                  placeholder="입력해주세요"
                  {...register("username", { required: true })}
                  onChange={handleInputChange}
                />
                <Button onClick={compareEmail} tabIndex="5">
                  확인
                </Button>
              </div>
            </>,
            <>
              <div>
                <Label isRequire children={"닉네임"} htmlFor="nickname" />
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
                <Button
                  tabIndex="7"
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
            </>,
            <>
              <div>
                <Label isRequire children={"아이디"} htmlFor="userid" />
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
                <Button
                  tabIndex="9"
                  title="중복체크"
                  onClick={(e) => {
                    e.preventDefault();
                    validateDuplicate("userid");
                  }}
                >
                  중복체크
                </Button>
              </div>
              {errors.userid && <small role="alert">{errors.userid.message}</small>}
              {duplicateId !== "" && duplicateId === true && <small className="alert">중복된 아이디입니다.</small>}
              {duplicateId !== "" && duplicateId === false && <small className="true">사용할 수 있는 아이디입니다.</small>}
            </>,
            <>
              <div>
                <Label isRequire children={"비밀번호"} htmlFor="password" />
                <input
                  type={typetoggle}
                  id="password"
                  placeholder="최소 1개의 특수문자를 포함해주세요"
                  maxLength={15}
                  tabIndex="10"
                  autoComplete="password"
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
              </div>
              {errors.password && <small role="alert">{errors.password.message}</small>}
            </>,
            <>
              <div>
                <Label isRequire children={"비밀번호 확인"} htmlFor="passwordChk" />
                <input
                  type={typetoggle}
                  id="passwordChk"
                  placeholder="비밀번호를 한 번 더 입력해주세요"
                  tabIndex="11"
                  maxLength={15}
                  autoComplete="password"
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
                <div className={s.typechange} type="typechange" onClick={typechange}>
                  👀
                </div>
              </div>
              {errors.passwordChk && <small role="alert">{errors.passwordChk.message}</small>}
            </>,
          ]}
        </Table>
        <div className="registSubmit">
          <Button FullWidth size="large" type="submit" tabIndex="12" disabled={isSubmitting}>
            {" "}
            가입하기
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Regist;
