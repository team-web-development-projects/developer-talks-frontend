import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/header/Header";
import Login from './pages/login/Login';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
