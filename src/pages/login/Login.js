import Footer from 'components/footer/Footer';
import Form from 'components/form/Form';
import { useForm } from 'react-hook-form';
import './login.scss';
import { ROOT_API, API_HEADER } from 'constants/api';
import axios from 'axios';
import LoginGoogle from 'components/snsLogin/LoginGoogle';

const handleApiCall = () => {
  axios
    .get('http://43.201.28.200:8080/oauth2/authorization/google')
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const Login = () => {
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));

    console.log('data', data);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: 'onChange' });

  return (
    <div>
      <section className="login-page page">
        <LoginGoogle />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>로그인페이지</legend>
            <p className="desc">
              Developer-Talks 가입으로
              <br />
              다양한 사람들을 만나보세요!
            </p>

            <ul className="login_main">
              <li>
                <label className="Id" htmlFor="userId">
                  아이디
                </label>
                <input
                  type="text"
                  id="userId"
                  placeholder="Developer-Talk Guest"
                  tabIndex="1"
                  maxLength="15"
                  aria-invalid={
                    !isDirty ? undefined : errors.userId ? 'true' : 'false'
                  }
                  {...register('userId', {
                    required: '아이디는 필수 입력입니다.',
                    minLength: {
                      value: 5,
                      message: '5자리 이상 15자리 이하로 입력해주세요.',
                    },
                  })}
                />
                {errors.userId && (
                  <small role="alert">{errors.userId.message}</small>
                )}
              </li>
              <li>
                <label className="Pw" htmlFor="password">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  tabIndex="2"
                  maxLength="15"
                  aria-invalid={
                    !isDirty ? undefined : errors.password ? 'true' : 'false'
                  }
                  {...register('password', {
                    required: '비밀번호는 필수 입력입니다.',
                    minLength: {
                      value: 8,
                      message:
                        '8자리 이상 15자리 이하로 비밀번호를 사용해주세요.',
                    },
                  })}
                />
                {errors.password && (
                  <small role="alert">{errors.password.message}</small>
                )}
              </li>
            </ul>
            <div className="button">
              <button type="submit" tabIndex="3" disabled={isSubmitting}>
                {' '}
                로그인
              </button>
              <button onClick={handleApiCall}>API 호출</button>
            </div>
          </fieldset>
        </Form>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
