import axios from 'axios';
import Form from 'components/form/Form';
import BasicModal from 'components/portalModal/basicmodal/BasicModal';
import { API_HEADER, ROOT_API } from 'constants/api';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_TOKEN } from 'store/Auth';

import './Regist.scss';
import s from "../studyRoom/studyRoomPost/studyRoom.module.scss";
// import { ToastContainer, toast } from 'react-toastify';

axios.defaults.withCredentials = true;

const Regist = () => {
  // const notify = () => toast("Wow so easy !");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const useridRef = useRef(null);
  const usernicknameRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState({
    tags: [],
    authJoin: true,
    joinableCount: 1,
  });
  const [modal, setModal] = useState(false);
  const [imageFile, setImageFile] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const [duplicateId, setDuplicateId] = useState('');
  const [duplicateNickName, setDuplicateNickName] = useState('');
  let [inputEmail, setInputEmail] = useState('');
  const [verityEmailcheck, setVerityEmailcheck] = useState(false);
  const [compareEmailcheck, setCompareEmailcheck] = useState(false);

  const [code, setCode] = useState("")
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
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {

    await new Promise((r) => setTimeout(r, 1000));
    if (verityEmailcheck && compareEmailcheck && duplicateId && duplicateNickName) {
      axios
        .post(
          `${ROOT_API}/sign-up`,
          {
            email: data.userEmail,
            nickname: data.userNickname,
            userid: data.userId,
            password: data.password,
            skills: "DJANGO",
            "description": "string",
            "registrationId": "string"
          },
          {
            headers: {
              API_HEADER,
            },
          }
        )
        .then(function (response) {
          console.log('회원가입 성공:', response);
          axios
            .post(
              `${ROOT_API}/sign-in`,
              {
                userid: data.userId,
                password: data.password,
              },
              {
                headers: {
                  API_HEADER,
                },
              }
            )
            .then(function (response) {
              console.log('로그인 성공:', response);
              dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
              localStorage.setItem('token', response.data.accessToken);
              setModal(true);
              reset();
            })
            .catch(function (error) {
              console.log('로그인 실패: ', error.response.data);
            });
        })
        .catch(function (error) {
          console.log('회원가입 실패:', error.response.data);
        });
      // NOTE: 이곳에서 통신
    } else {
      alert("중복체크나 인증을 안했어요")
    }
  };

  let textTemp = '';
  const authlogins = 'D-Talks'; //TODO auth 구글,네이버, 카카오
  const validateDuplicate = (data) => {
    const type = data;
    const value = watch(data);
    console.log('넣은 데이터', watch(data));
    // setTextTemp(watch(data));
    textTemp = watch(data);
    axios.get(`${ROOT_API}/user/check/${value}`).then(function (response) {
      if (type === 'userId') {
        response.data.duplicated === true
          ? setDuplicateId('true')
          : setDuplicateId('false');
      }
      if (type === 'userNickname') {
        response.data.duplicated === true
          ? setDuplicateNickName('true')
          : setDuplicateNickName('false');
      }
    });
  };
  const uploadImage = (imageFile) => {//NOTE 프로필 이미지
    const formData = new FormData();
    formData.append('image', imageFile);
    console.log(imageFile, "ddddddd")

    return axios.post(`${ROOT_API}/users/profile/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file, "dkfjdkjf")
    console.log(file.name, "dkfjdkjf")
    if (file.name) {
      uploadImage(file.name)
        .then((response) => {
          // 업로드 성공 시 수행할 작업
          console.log('Upload success:', response.data); //TODO 콘솔창에 정보까지는 나오는데 500에러
          return setImageFile(file.name);
        })
        .catch((error) => {
          // 업로드 실패 시 수행할 작업
          console.error('Upload error:', error);
        });
    }

  };
  const verityEmail = (e) => { //NOTE 이메일 인증
    e.preventDefault();
    console.log('dc', watch().userEmail);
    axios
      .get(`${ROOT_API}/email/verify`, {
        params: { email: watch().userEmail },
      })
      .then(function (response) {
        setVerityEmailcheck(true);
        console.log('이메일 보내기:', response);
        setCode(response.data.code)
        alert('이메일을 전송했습니다.');
      });
  };
  const compareEmail = (e) => { //NOTE 확인
    setCompareEmailcheck(true);
    e.preventDefault();
    inputEmail = code ? alert("인증완료") : alert("인증실패")

  }
  const handleInputChange = (e) => {
    setInputEmail(e.target.value);
  };
  const clickTag = (tag) => { //NOTE 기술 테그
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
    console.log('dd', selectedTags.tags, typeof (selectedTags.tags))
  };

  // toast('🦄 Wow so easy!', {
  //   position: "top-right",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",
  // });
  return (

    <div className="regist-page page">
      {/* <button onClick={notify}>Notify !</button>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
      {modal && (
        <BasicModal setOnModal={() => setModal()}>
          회원가입이 완료되었습니다. <br />
          확인을 누르시면 메인으로 이동합니다.
          <button onClick={() => navigate('/')}>확인</button>
        </BasicModal>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="form_1">
          <legend>정보입력</legend>

          <div className='userregistpage'></div>
          <div className="headername">
            <p>{authlogins}계정 회원가입</p>
            <span>Developer-Talks는 소프트웨어 개발자를 위한 지식공유 플렛폼입니다.</span>
          </div>
          <div className="prople">
            <div className="imgwrap">
              <img src={imageFile} alt="프로필이미지" />
              <input
                accept="image/*"
                // ref={inputRef}
                type="file"
                name="프로필이미지"
                id=""
                onChange={handleFileChange}
              />
            </div>
          </div>
          <span>프로필 이미지 선택☝️</span>

          <div className="gaider">
            <span>🙏추가 안내</span>
            <ul>
              <li><span>프로필 이미지 변경</span>은 회원가입 이후에도 가능합니다.</li>
              <li><span>Gravartar</span>를 이용한 프로필 변경은 여기를 참고해주세요.</li>
            </ul>
          </div>

          <label>관심있는 태그입력</label>
          <div className='tagalign'>
            <div className={s.tags}>
              {tags.map((item, index) => (
                <span
                  key={index}
                  onClick={() => clickTag(item)}
                  className={`tag ${selectedTags.tags.includes(item) ? [s.is_select] : ""
                    }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="line-style">
            <div className="jb-division-line"></div>
            <span>회원가입에 필요한 기본정보를 입력해주세요(선택입니다)</span>
            <div className="jb-division-line"></div>
          </div>
          <h2>Developer-Talks 계정 만들기</h2>
          <p className="chk">*필수사항 입니다.</p>
          <table className='userinfoTable'>
            <thead />
            <tbody>
              <tr>
                <th>
                  <label htmlFor="userEmail">이메일</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="email"
                    id="userEmail"
                    placeholder="이메일을 입력해주세요"
                    tabIndex="1"
                    {...register('userEmail', {
                      required: '이메일은 필수 입력입니다.',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: '이메일 형식에 맞지 않습니다.',
                      },
                    })}
                  />
                  <button onClick={verityEmail}>이메일인증</button>
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
                    type="text"
                    id="userEmails"
                    placeholder="입력해주세요"
                    tabIndex="1"
                    {...register('username', { required: true })} onChange={handleInputChange}
                  />
                  <button onClick={compareEmail}>확인</button>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="userNickname">닉네임</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="text"
                    id="userNickname"
                    placeholder="닉네임을 입력해주세요"
                    tabIndex="2"
                    ref={usernicknameRef}
                    maxLength={15}
                    {...register('userNickname', {
                      required: '닉네임은 필수 입력입니다.',
                      minLength: {
                        value: 5,
                        message: '5자리 이상 입력해주세요.',
                      },
                      // pattern: {
                      //   value:
                      //     /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
                      //   message:
                      //     "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!",
                      // },
                    })}
                  />
                  <button
                    title="중복체크"
                    onClick={() => validateDuplicate('userNickname')}
                  >
                    중복체크
                  </button>
                  {errors.userNickname && (
                    <small role="alert">{errors.userNickname.message}</small>
                  )}
                  {!errors.userNickname &&
                    duplicateNickName !== '' &&
                    duplicateNickName === 'true' && (
                      <small className="alert">중복된 닉네임입니다.</small>
                    )}
                  {!errors.userNickname &&
                    duplicateNickName !== '' &&
                    duplicateNickName === 'false' && (
                      <small className="true">
                        사용할 수 있는 닉네임입니다.
                      </small>
                    )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="userId">아이디</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="text"
                    id="userId"
                    placeholder="아이디를 입력해주세요"
                    maxLength={15}
                    ref={useridRef}
                    tabIndex="3"
                    {...register('userId', {
                      required: '아이디는 필수 입력입니다.',
                      minLength: {
                        value: 5,
                        message: '5자리 이상 아이디를 사용해주세요.',
                      },
                      maxLength: {
                        value: 15,
                        message: '15자리 이하 아이디를 사용해주세요.',
                      },
                    })}
                  />
                  <button
                    title="중복체크"
                    onClick={() => validateDuplicate('userId')}
                  >
                    중복체크
                  </button>
                  {errors.userId && (
                    <small role="alert">{errors.userId.message}</small>
                  )}
                  {duplicateId !== '' && duplicateId === 'true' && (
                    <small className="alert">중복된 아이디입니다.</small>
                  )}
                  {duplicateId !== '' && duplicateId === 'false' && (
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
                    type="password"
                    id="password"
                    placeholder="최소 1개의 특수문자를 포함해주세요"
                    maxLength={15}
                    tabIndex="4"
                    {...register('password', {
                      required: '비밀번호는 필수 입력입니다.',
                      minLength: {
                        value: 8,
                        message: '8자리 이상 비밀번호를 사용해주세요.',
                      },
                      maxLength: {
                        value: 15,
                        message: '15자리 이히 비밀번호를 사용해주세요.',
                      },
                      pattern: {
                        value: /.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*/,
                        message: '특수문자를 포함해주세요',
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
                    type="password"
                    id="passwordChk"
                    placeholder="비밀번호를 한 번 더 입력해주세요"
                    tabIndex="5"
                    maxLength={15}
                    {...register('passwordChk', {
                      required: '비밀번호는 필수 입력입니다.',
                      minLength: {
                        value: 8,
                        message: '8자리 이상 비밀번호를 사용해주세요.',
                      },
                      maxLength: {
                        value: 15,
                        message: '15자리 이히 비밀번호를 사용해주세요.',
                      },
                      pattern: {
                        value: /.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*/,
                        message: '특수문자를 포함해주세요',
                      },
                      validate: (val) => {
                        if (watch('password') !== val) {
                          return '비밀번호가 일치하지 않습니다.';
                        }
                      },
                    })}
                  />
                  {errors.passwordChk && (
                    <small role="alert">{errors.passwordChk.message}</small>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

        </fieldset>
        <div className="registSubmit">
          <button type="submit" tabIndex="7" disabled={isSubmitting}>
            {' '}
            가입하기
          </button>
        </div>
      </Form>
    </div >
  );
};

export default Regist;
