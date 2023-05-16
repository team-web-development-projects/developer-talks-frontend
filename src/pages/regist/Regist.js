import axios from 'axios';
import Form from 'components/form/Form';
import BasicModal from 'components/portalModal/basicmodal/BasicModal';
import { API_HEADER, ROOT_API } from 'constants/api';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_TOKEN } from 'store/Auth';
import Footer from '../../components/footer/Footer';
import './Regist.scss';

axios.defaults.withCredentials = true;

const Regist = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const useridRef = useRef(null);
  const usernicknameRef = useRef(null);

  const [modal, setModal] = useState(false);
  const [duplicateId, setDuplicateId] = useState('');
  const [duplicateNickName, setDuplicateNickName] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    axios
      .post(
        `${ROOT_API}/sign-up`,
        {
          email: data.userEmail,
          nickname: data.userNickname,
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
  };

  let textTemp = '';

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

  const [email, setEmail] = useState('');
  const handleAuthentication = (e) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('올바른 이메일 주소를 입력해주세요.');
    } else {
      // TODO: 인증 이메일 발송
      alert('인증메일이 발송되었습니다. 확인해주세요.');
    }
  };

  const check = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    axios.get(`${ROOT_API}/email/verify`, {
      email: 'djflsn@naser.div',
      code: '9Rj7G61i',
    });
  };

  return (
    <div className="regist-page page">
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
          <h2>Developer-Talks 계정 만들기</h2>
          <p className="chk">*필수사항 입니다.</p>
          <table>
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    {...register('userEmail', {
                      required: '이메일은 필수 입력입니다.',
                      pattern: {
                        value: email,
                        message: '이메일 형식에 맞지 않습니다.',
                      },
                    })}
                  />
                  {errors.userEmail && (
                    <small role="alert">{errors.userEmail.message}</small>
                  )}
                  <button onClick={handleAuthentication}>이메일인증</button>
                </td>
              </tr>
              <tr>
                <th>
                  <label>이메일 인증</label>
                </th>
                <td>
                  <input
                    type="text"
                    id="mails"
                    placeholder="인증번호를 입력해주세요"
                  ></input>
                  <button onClick={''}>확인</button>
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
        <div className="submit">
          <button type="submit" tabIndex="7" disabled={isSubmitting}>
            {' '}
            가입하기
          </button>
        </div>
      </Form>
      <Footer />
    </div>
  );
};

export default Regist;
