import axios from "axios";
import { ROOT_API } from "constants/api";
import NotPage from "pages/NotPage";
import BoardDetail from "pages/board/boardDetail/BoardDetail";
import BoardList from "pages/board/boardList/BoardList";
import BoardPost from "pages/board/boardPost/BoardPost";
import BoardUpdate from "pages/board/boardUpdate/BoardUpdate";
import Login from "pages/login/Login";
import Main from "pages/main/Main";
import Account from "pages/mypage/Account";
import MyStudyRoom from "pages/mypage/MyStudyRoom";
import Mypage from "pages/mypage/Mypage";
import Regist from "pages/regist/regist/Regist";
import StudyRoomDetail from "pages/studyRoom/studyRoomDetail/StudyRoomDetail";
import StudyRoomInfo from "pages/studyRoom/studyRoomInfo/StudyRoomInfo";
import StudyRoom from "pages/studyRoom/studyRoomList/StudyRoom";
import StudyRoomPost from "pages/studyRoom/studyRoomPost/StudyRoomPost";
import Userregist from "pages/regist/userregist/Userregist";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SET_TOKEN } from "store/Auth";
import { getCookieToken, removeCookieToken } from "store/Cookie";
import { NavigateMain, NavigatePost } from "./Outlet";
import "./assets/style/index.scss";
import { setRefreshToken } from "store/Cookie";
import { parseJwt } from "hooks/useParseJwt";
import { ToastCont } from "components/toast/ToastCont";
import epochConvert from "util/epochConverter";

function App() {
  const auth = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  console.log("auth", auth);

  useEffect(() => {
    // 구글 로그인 토큰 인증
    if (window.location.href.includes("accessToken")) {
      // if (window.location.href.includes("accessToken") && window.location.href.includes("refreshToken")) {
      // const accessToken = window.location.href.split("accessToken=")[1].split("&refreshToken=")[0];
      // const refreshToken = window.location.href.split("accessToken=")[1].split("&refreshToken=")[1];
      const searchParams = new URLSearchParams(window.location.search);
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");
      if (parseJwt(accessToken).nickname) {
        dispatch(SET_TOKEN({ accessToken: accessToken }));
        navigate("/", { replace: true });
      } else {
        localStorage.setItem("authAtk", accessToken);
        navigate("/userregist", { replace: true });
      }
      dispatch(SET_TOKEN({ accessToken: accessToken }));
      localStorage.setItem("refreshToken", refreshToken);
    }
  }, [dispatch, navigate, location, auth.accessToken]);

  // useEffect(() => {
  //   let timer;

  //   const startTimer = () => {
  //     timer = setTimeout(performAction, 1500);
  //   };

  //   const stopTimer = () => {
  //     clearTimeout(timer);
  //   };

  //   if (auth.accessToken === null) {
  //     startTimer();
  //   } else {
  //     stopTimer();
  //   }

  //   return stopTimer;
  // }, [auth.accessToken]);

  // const performAction = () => {
  //   return setLoading(true);
  //   // 실행시 로딩중일때
  // };

  useEffect(() => {
    // 토큰 재갱신
    removeCookieToken();
    console.log('c', localStorage.getItem('refreshToken'))
    if (auth.accessToken === null && localStorage.getItem("refreshToken") !== undefined) {
      axios
        .post(`${ROOT_API}/token/refresh`, {
          refreshToken: localStorage.getItem("refreshToken"),
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log("재갱신 성공:", response);
          dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
          setLoading(false); // 재갱신 완료 후 로딩 상태를 false로 설정
        })
        .catch(function (error) {
          console.log("재갱신 실패: ", error.response.data);
        });
    }
  }, [auth.accessToken, dispatch, location]);

  // useEffect(() => {
  //   // 리프레쉬 토큰 만료 재갱신
  //   console.log("rr", epochConvert(parseJwt(localStorage.getItem("refreshToken")).exp));
  //   if (epochConvert(parseJwt(localStorage.getItem("refreshToken")).exp)) {
  //     localStorage.removeItem("refreshToken");
  //     navigate('/login');
  //   }
  // }, [location]);

  return (
    <div className="App">
      <ToastCont />
      <Routes>
        {/* */}
        <Route path="/" element={<NavigateMain />}>
          <Route index element={<Main />} />
          <Route path="developer-talks-frontend" element={<Main />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="list/favorite/:userId" element={<Mypage type="post" />} />
          <Route path="account" element={<Account />} />
          <Route path="studyroom" element={<StudyRoom />} />
          <Route path="my-studyroom" element={<MyStudyRoom />} />
          <Route path="board" element={<BoardList type="post" />} />
          <Route path="board/search/:keyword" element={<BoardList type="post" />} />
          <Route path="/board/:postId" element={<BoardDetail type="post" />} />
          <Route path="/studyroom/info/:postId" element={<StudyRoomInfo />} />
          <Route path="/studyroom/:postId" element={<StudyRoomDetail />} />
          <Route path="qna" element={<BoardList type="questions" />} />
          <Route path="qna/search/:keyword" element={<BoardList type="questions" />} />
          <Route path="/qna/:postId" element={<BoardDetail type="questions" />} />
          <Route path="*" element={<NotPage />} />
        </Route>

        <Route element={<NavigatePost />}>
          <Route path="studyroom/post" element={<StudyRoomPost type="studyroom" />} />
          <Route path="/board/post" element={<BoardPost type="post" />} />
          <Route path="/qna/post" element={<BoardPost type="questions" />} />
          <Route path="/board/update/:postId" element={<BoardUpdate type="post" />} />
          <Route path="/login" element={<Login />} />

          <Route path="/qna/update/:postId" element={<BoardUpdate type="questions" />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userregist" element={<Userregist />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
