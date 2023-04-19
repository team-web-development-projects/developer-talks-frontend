import { Route, Routes } from "react-router-dom";
import './App.css';
import logo from './logo.svg';
import Login from './pages/login/Login';
import Mypage from "./pages/mypage/Mypage";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path={"/login"} element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;
