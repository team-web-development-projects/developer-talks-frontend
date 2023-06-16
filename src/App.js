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

function App() {
  const auth = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //NOTE 구글 로그인 시 메인으로 가게 만드는
    // if (window.location.href.includes("accessToken") && !window.location.href.includes("refreshToken")) {
    //   const searchParams = new URLSearchParams(window.location.search);
    //   const accessToken = searchParams.get("accessToken");
    //   navigate("/userregist", { replace: true });
    //   dispatch(SET_TOKEN({ accessToken: accessToken }));
    //   console.log(accessToken);
    // }
    if (window.location.href.includes("accessToken")) {
      const accessToken = window.location.href.split("accessToken=")[1].split("&refreshToken=")[0];
      const refreshToken = window.location.href.split("accessToken=")[1].split("&refreshToken=")[1];
      if (parseJwt(accessToken).nickname) {
        dispatch(SET_TOKEN({ accessToken: accessToken }));
        navigate("/", { replace: true });
      } else {
        localStorage.setItem("authAtk", accessToken);
        navigate("/userregist", { replace: true });
      }
      dispatch(SET_TOKEN({ accessToken: accessToken }));
      localStorage.setItem("refreshToken", refreshToken);
      // console.log("atk: ", accessToken);
      // console.log("rtk: ", refreshToken);
      // console.log("auth: ", auth);
    }

    // if (window.location.href.includes("accessToken")) {
    //   const accessToken = window.location.href.split("accessToken=")[1];
    //   const refreshToken = window.location.href.split("accessToken=")[1].split("&refreshToken=")[0];
    //   dispatch(SET_TOKEN({ accessToken: accessToken }));
    //   console.log("토큰있음");
    //   navigate("/", { replace: true });
    // }

    // if (window.location.href.includes("accessToken") && window.location.href.includes("refreshToken")) {
    //   const searchParams = new URLSearchParams(window.location.search);
    //   const accessToken = searchParams.get("accessToken");
    //   const refreshToken = searchParams.get("refreshToken");
    //   navigate("/", { replace: true });
    //   dispatch(SET_TOKEN({ accessToken: accessToken }));
    //   setRefreshToken(refreshToken);
    // }
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
    removeCookieToken();
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

// 헤더 포함
// function NavigateMain() {
//   return (
//     <>
//       <Header />
//       <div className="page">
//         <Outlet />
//       </div>
//       <Footer />
//     </>
//   );
// }

// 헤더 미포함
// function NavigatePost() {
//   return (
//     <>
//       <div className="page">
//         <Outlet />
//       </div>
//       <Footer />
//     </>
//   );
// }

export default App;
