import axios from "axios";
import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import { ROOT_API } from "constants/api";
import NotPage from "pages/NotPage";
import BoardDetail from "pages/board/boardDetail/BoardDetail";
import BoardList from "pages/board/boardList/BoardList";
import BoardPost from "pages/board/boardPost/BoardPost";
import BoardUpdate from "pages/board/boardUpdate/BoardUpdate";
import Login from "pages/login/Login";
import Main from "pages/main/Main";
import Account from "pages/mypage/Account";
import Introduction from "pages/mypage/Introduction";
import Mypage from "pages/mypage/Mypage";
import Regist from "pages/regist/Regist";
import StudyRoomDetqil from "pages/studyRoom/studyRoomDetail/StudyRoomDetail";
import StudyRoom from "pages/studyRoom/studyRoomList/StudyRoom";
import StudyRoomPost from "pages/studyRoom/studyRoomPost/StudyRoomPost";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Agreement from "pages/agreement/Agreement";
import Userregist from "pages/userregist/Userregist";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state.authToken);

  useEffect(() => {
    if (isDev) {
      console.log('dev');
    } else {
      console.log('prod');
    }
    // https://team-web-development-projects.github.io/developer-talks-frontend/userregist?accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJ1c2VyaWQiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJuaWNrbmFtZSI6Iuq5gOyLnOyXsCIsInByb3ZpZGVyIjoiZ29vZ2xlIiwiaWF0IjoxNjg1MjgxNDc5LCJleHAiOjE2ODUyOTIyNzl9.FDTQ6_0RWsBBb4ExIIxD_8_xufTm_GgeXCZSc5q11Wg
    //NOTE 토큰 재갱신
    if (window.location.href.includes('accessToken')) {
      const accessToken = window.location.href.split('accessToken=')[1];
      const refreshToken = window.location.href
        .split('accessToken=')[1]
        .split('&refreshToken=')[0];
      dispatch(SET_TOKEN({ accessToken: accessToken }));
      setRefreshToken({ refreshToken: refreshToken });
      console.log('토큰있음');
      navigate('/', { replace: true }); //NOTE 구글 로그인 시 메인으로 가게 만드는
      console.log("구글 로그인 시 리다이렉션")
    }
  }, [dispatch, navigate, location]);

  useEffect(() => {
    if (auth.accessToken === null && getCookieToken() !== undefined) {
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
    }
  }, [auth.accessToken, dispatch, location]);

  return (
    <div className="App">
      <Routes>
        {/* */}
        <Route path="/" element={<NavigateMain />}>
          <Route index element={<Main />} />
          <Route path="developer-talks-frontend" element={<Main />} />
          <Route path="mypage" element={<Mypage />} />
          <Route
            path="list/favorite/:userId"
            element={<Mypage type="post" />}
          />
          <Route path="account" element={<Account />} />
          <Route path="studyroom" element={<StudyRoom />} />
          <Route path="board" element={<BoardList type="post" />} />
          <Route path="introduction" element={<Introduction />} />
          <Route
            path="board/search/:keyword"
            element={<BoardList type="post" />}
          />
          <Route path="/board/:postId" element={<BoardDetail type="post" />} />
          <Route
            path="/studyroom/:postId"
            element={<StudyRoomDetqil type="post" />}
          />

          <Route path="qna" element={<BoardList type="questions" />} />
          <Route
            path="qna/search/:keyword"
            element={<BoardList type="questions" />}
          />
          <Route
            path="/qna/:postId"
            element={<BoardDetail type="questions" />}
          />
          <Route path="*" element={<NotPage />} />
        </Route>

        <Route element={<NavigatePost />}>
          <Route
            path="studyroom/post"
            element={<StudyRoomPost type="studyroom" />}
          />
          <Route path="/board/post" element={<BoardPost type="post" />} />
          <Route path="/qna/post" element={<BoardPost type="questions" />} />
          <Route
            path="/board/update/:postId"
            element={<BoardUpdate type="post" />}
          />
          <Route
            path="/qna/update/:postId"
            element={<BoardUpdate type="questions" />}
          />
          <Route path="/regist" element={<Regist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agreement" element={<Agreement />} />
          <Route path="/userregist" element={<Userregist />} />
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
