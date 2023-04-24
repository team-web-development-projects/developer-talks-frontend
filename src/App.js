import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import Regist from "./pages/regist/Regist";
import "./assets/style/index.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/regist"} element={<Regist />} />
      </Routes>
    </div>
  );
}

export default App;
