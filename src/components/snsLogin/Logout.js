import axios from "axios";
import { useSelector } from "react-redux";

const Logout = () => {
  const authToken = useSelector((state) => state.authToken);
  const handleLogout = async () => {
    // console.log('dd', authToken);
    await axios
      .post(`https://oauth2.googleapis.com/revoke?token=${authToken}`, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(() => {
        window.location.assign("http://localhost:3000/");
      })
      .catch(() => {
        alert("로그아웃에 실패했습니다.");
      });
  };

  return <button onClick={handleLogout}>logout</button>;
};

export default Logout;
