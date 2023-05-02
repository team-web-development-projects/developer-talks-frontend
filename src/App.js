import { Route, Routes, Outlet, BrowserRouter, Link } from "react-router-dom";
// import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import Regist from "./pages/regist/Regist";
import "./assets/style/index.scss";
import BoardWrite from "pages/board/write/BoardWrite";
import Main from "pages/main/Main";
import Mypage from "pages/mypage/Mypage";
import NotPage from "pages/NotPage";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavigateMain />}>
          <Route index element={<Main />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="*" element={<NotPage />} />
        </Route>

        <Route path="/" element={<NavigatePost />}>
          <Route path="board/write" element={<BoardWrite />} />
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
