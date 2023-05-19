import axios from 'axios';
import Form from 'components/form/Form';
import BasicModal from 'components/portalModal/basicmodal/BasicModal';

import { setRefreshToken } from 'store/Cookie';
import { API_HEADER, ROOT_API } from 'constants/api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_TOKEN } from 'store/Auth';
import './login.scss';

const Authlogin = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const [autoLogin, setAutoLogin] = useState(false);

  const handleCheckboxChange = (event) => {
    setAutoLogin(event.target.checked);
  };

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
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
        if (autoLogin) {
          setRefreshToken({ refreshToken: response.data.refreshToken });
          dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
          alert('토큰저장');
        }
        setModal(true);
        reset();
      })
      .catch(function (error) {
        console.log('로그인 실패: ', error.response);
      });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: 'onChange' });

  return (
    <>
      {modal && (
        <BasicModal
          setOnModal={() => setModal(false)}
          dimClick={() => navigate('/')}
        >
          로그인이 완료되었습니다. <br />
          확인을 누르시면 메인으로 이동합니다.
          <button onClick={() => navigate('/')}>확인</button>
        </BasicModal>
      )}
      <section className="login-page page">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>로그인페이지</legend>
            <p className="desc">
              Developer-Talks 간편로그인으로
              <br />
              다양한 사람들을 만나보세요!
            </p>

            <ul className="login_main">
              <li>
                <label className="Id" htmlFor="userId">
                  이메일
                </label>
                <input
                  type="email"
                  id="userEmail"
                  placeholder="Developer-Talk Guest"
                  tabIndex="1"
                  aria-invalid={
                    !isDirty ? undefined : errors.userId ? 'true' : 'false'
                  }
                  {...register('userEmail', {
                    required: '닉네임은 필수 입력입니다.',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: '이메일 형식에 맞지 않습니다.',
                    },
                  })}
                />
                {errors.userId && (
                  <small role="alert">{errors.userId.message}</small>
                )}
              </li>
              <li>
                <label className="nickname" htmlFor="userNickname">
                  닉네임
                </label>
                <input
                  type="nickName"
                  id="userNickName"
                  placeholder="닉네임을 입력해주세요"
                  tabIndex="2"
                  aria-invalid={
                    !isDirty ? undefined : errors.password ? 'true' : 'false'
                  }
                  {...register('password', {
                    required: '닉네임은 필수 입력입니다.',
                    minLength: {
                      value: 5,
                      message: '5자리 이상 입력해주세요.',
                    },
                  })}
                />
                {errors.password && (
                  <small role="alert">{errors.password.message}</small>
                )}
                <button>중복체크</button>
              </li>
            </ul>
            <label>자동로그인</label>
            <input
              type="checkbox"
              checked={autoLogin}
              onChange={handleCheckboxChange}
            />
            <div className="button">
              <button type="submit" tabIndex="3" disabled={isSubmitting}>
                {' '}
                로그인
              </button>
            </div>
          </fieldset>
          <br />
        </Form>
      </section>
    </>
  );
};

export default Authlogin;
