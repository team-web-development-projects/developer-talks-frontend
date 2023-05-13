import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

import { API_HEADER, ROOT_API } from 'constants/api';
import { DELETE_TOKEN } from 'store/Auth';
import { getCookieToken, removeCookieToken } from 'store/Cookie';

const Logout = () => {
  // store에 저장된 Access Token 정보를 받아 온다
  // const { accessToken } = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cookie에 저장된 Refresh Token 정보를 받아 온다
  const refreshToken = getCookieToken();
  const logout = async (data) => {
    // 백으로부터 받은 응답
    axios
      .post(
        `${ROOT_API}/sign-in`,
        {
          userid: data.userId, //FIXME 타입에러
          password: data.password,
        },
        {
          headers: {
            API_HEADER,
          },
        }
      )
      .then(function (response) {
        console.log('로그아웃:', response);
        removeCookieToken({
          refreshToken:
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxQG5hdmVyLmNvbSIsInVzZXJpZCI6IjExMTExIiwibmlja25hbWUiOiIxMTExMSIsImlhdCI6MTY4MzgwNDc0MiwiZXhwIjoxNjgzODE1NTQyfQ.htbOEkkGGpHtmOKuySKWSqNgs_YSkWc5g1Dxt7FyI1o',
        });
        navigate('/login');
        dispatch(
          DELETE_TOKEN({
            accessToken:
              'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxQG5hdmVyLmNvbSIsInVzZXJpZCI6IjExMTExIiwibmlja25hbWUiOiIxMTExMSIsImlhdCI6MTY4MzgwNDc0MiwiZXhwIjoxNjgzODE1NTQyfQ.htbOEkkGGpHtmOKuySKWSqNgs_YSkWc5g1Dxt7FyI1o',
          })
        );
      })
      .catch(function (error) {
        console.log('로그아웃 실패:', error.response.data);
        window.location.reload();
      });
  };
  // const data = await logoutUser({ refresh_token: refreshToken }, accessToken);
  // 해당 컴포넌트가 요청된 후 한 번만 실행되면 되기 때문에 useEffect 훅을 사용
  // useEffect(() => {
  //   logout();
  // }, []);
  return <button onClick={logout}>로그아웃</button>;
};

export default Logout;
