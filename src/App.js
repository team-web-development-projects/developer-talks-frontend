import axios from 'axios';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { ROOT_API } from 'constants/api';
import NotPage from 'pages/NotPage';
import BoardDetail from 'pages/board/boardDetail/BoardDetail';
import BoardList from 'pages/board/boardList/BoardList';
import BoardPost from 'pages/board/boardPost/BoardPost';
import Login from 'pages/login/Login';
import Main from 'pages/main/Main';
import Account from 'pages/mypage/Account';
import Introduction from 'pages/mypage/Introduction';
import Mypage from 'pages/mypage/Mypage';
import Regist from 'pages/regist/Regist';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { SET_TOKEN } from 'store/Auth';
import { getCookieToken, setRefreshToken } from 'store/Cookie';
import { isDev } from 'util/Util';
import './assets/style/index.scss';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (isDev) {
      console.log('dev');
    } else {
      console.log('prod');
    }
    if (window.location.href.includes('accessToken')) {
      const accessToken = window.location.href.split('accessToken=')[1];
      const refreshToken = window.location.href
        .split('accessToken=')[1]
        .split('&refreshToken=')[0];
      dispatch(SET_TOKEN({ accessToken: accessToken }));
      setRefreshToken({ refreshToken: refreshToken });
      console.log('토큰있음');
      navigate('/', { replace: true });
    }
  }, [dispatch, navigate, location]);

  // localStorage.getItem('token')
  //         ? localStorage.getItem('token')
  //         : { refreshToken: getCookieToken() }
  axios
    .post(`${ROOT_API}/token/refresh`, {
      refreshToken: getCookieToken().refreshToken,
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      console.log('재갱신 성공:', response);
      dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
    })
    .catch(function (error) {
      console.log('재갱신 실패: ', error.response.data);
    });

  return (
    <div className="App">
      <Routes>
        {/* */}
        <Route path="/" element={<NavigateMain />}>
          <Route index element={<Main />} />
          <Route path="developer-talks-frontend" element={<Main />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="account" element={<Account />} />
          <Route path="introduction" element={<Introduction />} />

          <Route path="/board/list" element={<BoardList type="board" />} />
          <Route
            path="/board/list/:postId"
            element={<BoardDetail type="board" />}
          />

          <Route path="/qna/list" element={<BoardList type="qna" />} />
          <Route
            path="/qna/list/:postId"
            element={<BoardDetail type="qna" />}
          />
          <Route path="*" element={<NotPage />} />
        </Route>

        <Route element={<NavigatePost />}>
          <Route path="/board/post" element={<BoardPost type="post" />} />
          <Route path="/qna/post" element={<BoardPost type="qna" />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

// 헤더 포함
function NavigateMain() {
  return (
    <>
      <Header />
      <div className="page">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

// 헤더 미포함
function NavigatePost() {
  return (
    <>
      <div className="page">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
