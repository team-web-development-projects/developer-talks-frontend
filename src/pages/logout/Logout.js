import axios from 'axios';
// import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { DELETE_TOKEN } from 'store/Auth';
import { removeCookieToken } from 'store/Cookie';

axios.defaults.withCredentials = true;

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    removeCookieToken();
    dispatch(DELETE_TOKEN());
    navigate('/login');
  };

  return <button onClick={logout}>로그아웃</button>;
};

export default Logout;
