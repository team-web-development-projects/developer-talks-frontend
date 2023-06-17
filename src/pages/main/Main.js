import axios from "axios";
import { ROOT_API } from "constants/api";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import "./main.scss";
import Best from "pages/_com/best/Best";
import News from "pages/_com/news/News";

const Main = () => {
  return (
    <div className="main-page page">
      <Best />
      <News />
    </div>
  );
};

export default Main;
