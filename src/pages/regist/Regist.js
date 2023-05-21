import axios from 'axios';
import Blackbutton from 'components/button/Blacbutton';
import Form from 'components/form/Form';
import BasicModal from 'components/portalModal/basicmodal/BasicModal';
import { API_HEADER, ROOT_API } from 'constants/api';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_TOKEN } from 'store/Auth';
import Footer from '../../components/footer/Footer';
import Inputmodule from './Inputmodule';
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

  const verityEmail = (e) => {
    e.preventDefault();
    console.log('dc', watch().userEmail);
    axios
      .get(`${ROOT_API}/email/verify`, {
        params: { email: watch().userEmail },
      })
      .then(function (response) {
        console.log('이메일 보내기:', response);
        alert('이메일을 전송했습니다.');
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
              <Inputmodule
                id={'userEmail'}
                text={'이메일'}
                placeholder="이메일을 입력해주세요"
                tab={1}
                pattern={{
                  required: '이메일은 필수 입력입니다.',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: '이메일 형식에 맞지 않습니다.',
                  },
                }}
                title={'이메일 인증'}
                buttontab={2}
                onClick={{ verityEmail }}
                errormessage={
                  errors.userEmail && (
                    <small role="alert">{errors.userEmail.message}</small>
                  )
                }
              />
              <Inputmodule
                id={'userEmails'}
                placeholder={'입력해주세요'}
                tab={3}
                title={'확인'}
              />

              <Inputmodule
                id={'userNickname'}
                text={'닉네임'}
                placeholder={'닉네임을 입력해주세요'}
                tab={4}
                ref={usernicknameRef}
                maxLength={15}
                pattern={{
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
                }}
                title={'중복체크'}
                buttontab={5}
                click={() => validateDuplicate('userNickname')}
                errormessage={[
                  errors.userNickname && (
                    <small role="alert">{errors.userNickname.message}</small>
                  ),
                  !errors.userNickname &&
                    duplicateNickName !== '' &&
                    duplicateNickName === 'true' && (
                      <small className="alert">중복된 닉네임입니다.</small>
                    ),
                  !errors.userNickname &&
                    duplicateNickName !== '' &&
                    duplicateNickName === 'false' && (
                      <small className="true">
                        사용할 수 있는 닉네임입니다.
                      </small>
                    ),
                ]}
              />
              <Inputmodule
                id={'userId'}
                text={'아이디'}
                errormessage={[
                  errors.userId && (
                    <small role="alert">{errors.userId.message}</small>
                  ),
                  duplicateId !== '' && duplicateId === 'true' && (
                    <small className="alert">중복된 아이디입니다.</small>
                  ),
                  duplicateId !== '' && duplicateId === 'false' && (
                    <small className="true">사용할 수 있는 아이디입니다.</small>
                  ),
                ]}
                placeholder={'아이디를 입력해주세요'}
                maxLength={15}
                ref={useridRef}
                tab={6}
                pattern={{
                  required: '아이디는 필수 입력입니다.',
                  minLength: {
                    value: 5,
                    message: '5자리 이상 아이디를 사용해주세요.',
                  },
                  maxLength: {
                    value: 15,
                    message: '15자리 이하 아이디를 사용해주세요.',
                  },
                }}
                title={'중복체크'}
                buttontab={7}
                click={() => validateDuplicate('userId')}
              />
              <Inputmodule
                id={'password'}
                text={'비밀번호'}
                placeholder="최소 1개의 특수문자를 포함해주세요"
                maxLength={15}
                pattern={{
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
                }}
                errormessage={
                  errors.password && (
                    <small role="alert">{errors.password.message}</small>
                  )
                }
              />
              <Inputmodule
                id={'passwordChk'}
                text={'비밀번호 확인'}
                placeholder="비밀번호를 한 번 더 입력해주세요"
                tab={8}
                pattern={{
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
                }}
                errormessage={
                  errors.passwordChk && (
                    <small role="alert">{errors.passwordChk.message}</small>
                  )
                }
              />
            </tbody>
          </table>
        </fieldset>
        <div className="submit">
          <Blackbutton
            title={'가입하기'}
            buttontab={9}
            disabled={isSubmitting}
          />
        </div>
      </Form>
      <Footer />
    </div>
  );
};

export default Regist;
