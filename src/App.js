import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import NotPage from "pages/NotPage";
import BoardCreate from "pages/board/create/BoardCreate";
import BoardMain from "pages/board/main/BoardMain";
import Individual from "pages/individual/Individual";
import Login from "pages/login/Login";
import Main from "pages/main/Main";
import Regist from "pages/regist/Regist";
import { Outlet, Route, Routes, Link } from "react-router-dom";
import "./assets/style/index.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* */}

        <Route path="/" element={<NavigateMain />}>
          <Route index element={<Main />} />
          <Route path="developer-talks-frontend" element={<Main />} />
          <Route path="individual" element={<Individual />} />
          <Route path="*" element={<NotPage />} />
        </Route>

        <Route element={<NavigatePost />}>
          <Route path="/board/create" element={<BoardCreate />} />
          <Route path="/board/main" element={<BoardMain />} />
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
