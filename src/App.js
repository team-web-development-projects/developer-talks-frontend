import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import NotPage from "pages/NotPage";
import BoardDetail from "pages/board/boardDetail/BoardDetail";
import BoardList from "pages/board/boardList/BoardList";
import BoardPost from "pages/board/boardPost/BoardPost";
import Login from "pages/login/Login";
import Main from "pages/main/Main";
import Regist from "pages/regist/Regist";
import { SET_TOKEN } from "store/Auth";
import {
  Outlet,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./assets/style/index.scss";
import Mypage from "pages/mypage/Mypage";
import Account from "pages/mypage/Account";
import axios from "axios";
import { ROOT_API } from "constants/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRefreshToken, getCookieToken } from "store/Cookie";
import { isDev } from "util/Util";
import BoardUpdate from "pages/board/boardUpdate/BoardUpdate";
import StudyRoom from "pages/studyRoom/studyRoomList/StudyRoom";
import StudyRoomPost from "pages/studyRoom/studyRoomPost/StudyRoomPost";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state.authToken);

  useEffect(() => {
    if (isDev) {
      console.log("dev");
    } else {
      console.log("prod");
    }

    if (window.location.href.includes("accessToken")) {
      const accessToken = window.location.href.split("accessToken=")[1];
      const refreshToken = window.location.href
        .split("accessToken=")[1]
        .split("&refreshToken=")[0];
      dispatch(SET_TOKEN({ accessToken: accessToken }));
      setRefreshToken({ refreshToken: refreshToken });
      console.log("토큰있음");
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate, location]);

  axios
    .post(`${ROOT_API}/token/refresh`, {
      params: { refreshToken: getCookieToken().refreshToken },
      // headers: {
        // "Content-Type": "application/json",
        // "X-AUTH-TOKEN": auth.accessToken,
      // },
    })
    .then(function (response) {
      console.log("재갱신 성공:", response);
      // dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
    })
    .catch(function (error) {
      console.log("재갱신 실패: ", error.response.data);
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
          <Route path="studyroom" element={<StudyRoom />} />
          <Route path="/board/list" element={<BoardList type="post" />} />
          <Route
            path="/board/list/:postId"
            element={<BoardDetail type="post" />}
          />

          <Route path="/qna/list" element={<BoardList type="questions" />} />
          <Route
            path="/qna/list/:postId"
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
