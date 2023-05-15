import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import NotPage from "pages/NotPage";
import BoardDetail from "pages/board/boardDetail/BoardDetail";
import BoardList from "pages/board/boardList/BoardList";
import BoardPost from "pages/board/boardPost/BoardPost";
import Login from "pages/login/Login";
import Main from "pages/main/Main";
import Regist from "pages/regist/Regist";
import { Outlet, Route, Routes } from "react-router-dom";
import "./assets/style/index.scss";
import Mypage from "pages/mypage/Mypage";
import Account from "pages/mypage/Account";
import BoardUpdate from 'pages/board/boardUpdate/BoardUpdate';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* */}

        <Route path="/" element={<NavigateMain />}>
          <Route index element={<Main />} />
          <Route path="developer-talks-frontend" element={<Main />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="account" element={<Account />} />

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
          <Route path="/board/post" element={<BoardPost type="post" />} />
          <Route path="/qna/post" element={<BoardPost type="questions" />} />
          <Route path="/board/update/:postId" element={<BoardUpdate type="post" />} />
          <Route path="/qna/update/:postId" element={<BoardUpdate type="questions" />} />
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
