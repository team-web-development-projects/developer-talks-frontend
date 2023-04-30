import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import Regist from "./pages/regist/Regist";
import "./assets/style/index.scss";
import BoardWrite from "pages/board/write/BoardWrite";
import GoogleConfirm from "pages/GoogleConfirm";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/board/write" element={<BoardWrite />} />
        <Route path="/login/google" element={<GoogleConfirm />} />
      </Routes>
    </div>
  );
}

export default App;
