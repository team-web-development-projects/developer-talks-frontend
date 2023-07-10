import { ToastCont } from "components/toast/ToastCont";
import NotPage from "pages/NotPage";
import BoardDetail from "pages/board/boardDetail/BoardDetail";
import BoardList from "pages/board/boardList/BoardList";
import BoardPost from "pages/board/boardPost/BoardPost";
import BoardUpdate from "pages/board/boardUpdate/BoardUpdate";
import FindPassword from "pages/findpassword/FindPassword";
import FindUser from 'pages/finduser/FindUser';
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
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import useGoogleLoginAuth from "useGoogleLoginAuth";
import useRefreshToken from "useRefreshToken";
import { NavigateMain, NavigatePost } from "./Outlet";
import "./assets/style/index.scss";
import Sse from "sse";
function App() {
  const auth = useSelector((state) => state.authToken);
  const [loading, setLoading] = useState(false);

  // console.log("auth", auth.accessToken);

  useGoogleLoginAuth();
  useRefreshToken();
  Sse();

  //  NOTE: 타이머로 재갱신 테스트 코드
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

  return (
    <div className="App">
      <ToastCont />
      <Routes>
        <Route path="/" element={<NavigateMain />}>
          <Route index element={<Main />} />
          <Route path="developer-talks-frontend" element={<Main />} />
          <Route path="mypage" element={<Index />} />
          <Route path="studyroom" element={<StudyRoom />} />
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

export default App;
