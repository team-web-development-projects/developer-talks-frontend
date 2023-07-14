import Button from "components/button/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_TOKEN } from "store/Auth";
import s from "./logout.module.scss";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("dtrtk");
    dispatch(DELETE_TOKEN());
    navigate("/");
  };

  return (
    <Button onClick={logout} size="small" theme="cancle" classname={s.logout}>
      로그아웃
    </Button>
  );
};

export default Logout;
