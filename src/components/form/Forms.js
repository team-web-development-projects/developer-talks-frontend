import axios from "axios";
import Button from "../button/Button";
import Form from "../form/Form";
import Label from "../label/Label";
import LineStyle from "../lineStyle/LineStyle";
import BasicModal from "../portalModal/basicmodal/BasicModal";
import { showToast } from "../toast/showToast";
import { API_HEADER, ROOT_API } from "constants/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_TOKEN } from "store/Auth";
import "./forms.scss";
axios.defaults.withCredentials = true;

const Regist = (tableTitle, tableText, selectedTags, description, profileImgData, setModal) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [duplicateId, setDuplicateId] = useState("");
  const [duplicateNickName, setDuplicateNickName] = useState("");
  const [verityEmailcheck, setVerityEmailcheck] = useState(false);
  const [compareEmailcheck, setCompareEmailcheck] = useState(false);
  const [typetoggle, setTypetoggle] = useState("password");
  const [code, setCode] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    if (verityEmailcheck && duplicateId === false && duplicateNickName === false) {
      axios
        .post(
          `${ROOT_API}/sign-up`,
          {
            email: watch().userEmail,
            nickname: watch().nickname,
            userid: watch().userid,
            password: watch().password,
            skills: selectedTags.tags,
            description: description,
            profileImageId: profileImgData.id,
          },
          { headers: { API_HEADER } }
        )
        .then(() => {
          axios
            .post(`${ROOT_API}/sign-in`, { userid: watch().userid, password: watch().password }, { headers: { API_HEADER } })
            .then((response) => {
              dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
              localStorage.setItem("dtrtk", response.data.refreshToken);
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
          console.log("없음");
          axios
            .post(`${ROOT_API}/email/verify`, {
              email: watch().userEmail,
            })
            .then((res) => {
              setVerityEmailcheck(true);
              setCode(res.data.code);
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
  const verityEmailchecking = async (e) => {
    //NOTE 이메일 인증//ok
    e.preventDefault();
    axios
      .get(`${ROOT_API}/email/verify`, {
        params: { code: watch().inputEmail },
      })
      .then((res) => {
        setCompareEmailcheck(true);
        showToast("success", "😎 인증이 확인되었습니다");
      })
      .catch(() => {
        showToast("error", "인증을 정확히 확인해주세요");
      });
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
      {/* <p>{tableTitle}</p> */}
      {/* <span>{tableText}</span> */}
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <li>
            <div>
              <Label isRequire htmlFor="userEmail">
                이메일
              </Label>
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
          </li>
          <li>
            {" "}
            <div>
              <Label isRequire htmlFor="inputEmail">
                이메일 인증
              </Label>
              <input tabIndex="4" type="text" id="inputEmail" placeholder="인증번호를 입력해주세요" {...register("inputEmail", { required: true })} />
              <Button onClick={verityEmailchecking} tabIndex="5">
                확인
              </Button>
            </div>
          </li>
          <li>
            {" "}
            <div>
              <Label isRequire htmlFor="nickname">
                닉네임
              </Label>
              <input
                type="text"
                id="nickname"
                placeholder="닉네임을 입력해주세요"
                tabIndex="6"
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
          </li>
          <li>
            {" "}
            <div>
              <Label isRequire htmlFor="userid">
                아이디
              </Label>
              <input
                type="text"
                id="userid"
                placeholder="아이디를 입력해주세요"
                maxLength={15}
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
          </li>
          <li>
            {" "}
            <div>
              <Label isRequire htmlFor="password">
                비밀번호
              </Label>
              <input
                type={typetoggle}
                id="password"
                placeholder="비밀번호 최소 1개의 특수문자를 포함해주세요"
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
          </li>
          <li>
            {" "}
            <div>
              <Label isRequire htmlFor="passwordChk">
                비밀번호 확인
              </Label>
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
              <div type="typechange" onClick={typechange}>
                👀
              </div>
            </div>
            {errors.passwordChk && <small role="alert">{errors.passwordChk.message}</small>}
          </li>
        </ul>
        <div className="registSubmit">
          <Button FullWidth size="large" type="submit" tabIndex="12" disabled={isSubmitting}>
            {" "}
            가입하기
          </Button>
        </div>
      </form>
    </>
  );
};

export default Regist;
