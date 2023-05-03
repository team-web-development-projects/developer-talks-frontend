import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import NotPage from "pages/NotPage";
import BoardCreate from "pages/board/create/BoardCreate";
import BoardMain from "pages/board/main/BoardMain";
import BoardWrite from "pages/board/write/BoardWrite";
import Individual from "pages/individual/Individual";
import Login from "pages/login/Login";
import Main from "pages/main/Main";
import Mypage from "pages/mypage/Mypage";
import Regist from "pages/regist/Regist";
import { Outlet, Route, Routes } from "react-router-dom";
import "./assets/style/index.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* */}
        <Route path="/login" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/individual" element={<Individual />} />

        <Route path="/" element={<NavigateMain />}>
          <Route index element={<Main />} />
          <Route path="/developer-talks-frontend" element={<Main />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="*" element={<NotPage />} />
        </Route>

        <Route path="/" element={<NavigatePost />}>
          <Route path="board/write" element={<BoardWrite />} />
          <Route path="/board/create" element={<BoardCreate />} />
          <Route path="/board/main" element={<BoardMain />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
      </Routes>
    </div>
  );
}

function NavigateMain() {
  return (
    <>
      <Header />
      <div className="page">
        {/*
      <Link to="board/write">글쓰기</Link>
     */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

function NavigatePost() {
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

export default App;
