import { ToastCont } from "components/toast/ToastCont";
import NotPage from "pages/NotPage";
import BoardDetail from "pages/board/boardDetail/BoardDetail";
import BoardList from "pages/board/boardList/BoardList";
import BoardPost from "pages/board/boardPost/BoardPost";
import BoardUpdate from "pages/board/boardUpdate/BoardUpdate";
import FindPassword from "pages/findpassword/FindPassword";
import FindUser from "pages/finduser/FindUser";
import Login from "pages/login/Login";
import Main from "pages/main/Main";
import Index from "pages/mypage";
import Regist from "pages/regist/regist/Regist";
import Userregist from "pages/regist/userregist/Userregist";
import StudyRoomDetail from "pages/studyRoom/studyRoomDetail/StudyRoomDetail";
import StudyRoomInfo from "pages/studyRoom/studyRoomInfo/StudyRoomInfo";
import StudyRoom from "pages/studyRoom/studyRoomList/StudyRoom";
import StudyRoomPost from "pages/studyRoom/studyRoomPost/StudyRoomPost";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useLocation, Outlet } from "react-router-dom";
import useGoogleLoginAuth from "useGoogleLoginAuth";
import useRefreshToken from "useRefreshToken";
// import { NavigateMain, NavigatePost } from "./Outlet";
import Sse from "sse";
import { useEffect } from "react";
import useGetToken from "firebase-get-token";
import Header from "components/header/Header";
import classnames from "classnames";
import Footer from "components/footer/Footer";
import { SET_ROUTER } from "store/PageRouter";

// FCM 테스트
// import "./firebase-get-token";
// import { messaging } from "./firebase-get-token";
// import { getToken } from "firebase/messaging";

function App() {
  const auth = useSelector((state) => state.authToken);

  // async function requestPermission() {
  //   const permission = await Notification.requestPermission();
  //   if (permission === "granted") {
  //     const token = await getToken(messaging, {
  //       vapidKey: "BOWbgLD10kyQ6zwV8RpnBg84oLQCD6Ll1t2u0AWjDxd1-u3sbTNy1DbKHEvJpvgLrUAhinaytkHIDakxn0HETaI",
  //     });
  //     console.log('token : ', token);
  //   } else if (permission === "denied") {
  //     console.log("denied");
  //   }
  // }
  // useEffect(() => {
  //   requestPermission();
  // }, []);

  // console.log("auth", auth.accessToken);

  useGoogleLoginAuth();
  useRefreshToken();
  useGetToken();
  // Sse();
  return (
    <div className="App">
      <ToastCont />
        <Routes>
          <Route path="/" element={<NavigateMain />}>
            <Route index element={<Main />} />
            {/* <Route path="developer-talks-frontend" element={<Main />} /> */}
            {/* <Route exact path="/" element={<Main />} /> */}
            <Route path="showuser" element={<Index />} />

            <Route path="studyroom" element={<StudyRoom />} />
            <Route path="board" element={<BoardList type="post" />} />
            <Route path="board/search/:keyword" element={<BoardList type="post" />} />
            <Route path="/board/:postId" element={<BoardDetail type="post" />} />
            <Route path="studyroom/info/:postId" element={<StudyRoomInfo />} />
            <Route path="/studyroom/:postId" element={<StudyRoomDetail />} />
            <Route path="qna" element={<BoardList type="questions" />} />
            <Route path="qna/search/:keyword" element={<BoardList type="questions" />} />
            <Route path="/qna/:postId" element={<BoardDetail type="questions" />} />
            {/* <Route path="*" element={<NotPage />} /> */}
          </Route>

          <Route element={<NavigatePost />}>
            <Route path="studyroom/post" element={<StudyRoomPost type="studyroom" />} />
            <Route path="/board/post" element={<BoardPost type="post" />} />
            <Route path="/qna/post" element={<BoardPost type="questions" />} />
            <Route path="/board/update/:postId" element={<BoardUpdate type="post" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/finduser" element={<FindUser />} />
            <Route path="/findpassword" element={<FindPassword />} />

            <Route path="/qna/update/:postId" element={<BoardUpdate type="questions" />} />
            <Route path="/regist" element={<Regist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userregist" element={<Userregist />} />
          </Route>
        </Routes>
    </div>
  );
}

const NavigateMain = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pageRouter = useSelector((state) => state.pageRouter);
  const mypage = ["/mypage", "/my-studyroom", "/account"];

  useEffect(() => {
    if (mypage.includes(location.pathname)) {
      dispatch(SET_ROUTER({ state: "mypage" }));
    } else {
      dispatch(SET_ROUTER({ state: null }));
    }
  }, [location, dispatch]);

  return (
    <>
      <Header />
      <div
        className={classnames("page", {
          "is-mypage": pageRouter.state === "mypage",
        })}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

// 헤더 미포함
const NavigatePost = () => {
  return (
    <>
      <div className="page">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};


export default App;
