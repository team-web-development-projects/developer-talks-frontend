import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import Regist from "./pages/regist/Regist";
import "./assets/style/index.scss";
import BoardCreate from 'pages/boardCreate/BoardCreate';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/regist"} element={<Regist />} />
        <Route path={"/boardCreate"} element={<BoardCreate/>}/>
      </Routes>
    </div>
  );
}

export default App;
