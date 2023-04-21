import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/header/Header";
import Login from './pages/login/Login';
import Regist from "./pages/regist/Regist";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/regist"} element={<Regist/>} />
      </Routes>
    </div>
  );
}

export default App;
