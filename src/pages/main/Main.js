import axios from "axios";
import { ROOT_API } from "constants/api";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import "./main.scss";
import Best from "pages/_com/best/Best";
import News from "pages/_com/news/News";
import Chat from "components/chat/Chat";
import Chat2 from "components/chat/Chat2";
import Chat3 from "components/chat/Chat3";
import Chat4 from "components/chat/Chat4";
import { useSelector } from "react-redux";
import RednerTest from "components/chat/RenderTest";

const Main = () => {
  return (
    <div className="main-page">
      <article>
        <Best />
        <News />
      </article>
      {/*
      <RednerTest/>
    */}
    <Chat3 />
    </div>
  );
};

export default Main;
