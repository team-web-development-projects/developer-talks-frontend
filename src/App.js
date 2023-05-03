import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Regist from "./pages/regist/Regist";
import "./assets/style/index.scss";
import BoardCreate from "pages/board/create/BoardCreate";
import BoardMain from "pages/board/main/BoardMain";

import Header from "./components/header/Header";
import BoardWrite from "pages/board/write/BoardWrite";
import Individual from "pages/individual/Individual";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/board/create" element={<BoardCreate />} />
        <Route path="/board/main" element={<BoardMain />} />
        <Route path="/board/write" element={<BoardWrite />} />
        <Route path="/individual" element={<Individual />} />
      </Routes>
    </div>
  );
}

export default App;
