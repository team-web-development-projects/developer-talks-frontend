import Best from "pages/_com/best/Best";
import News from "pages/_com/news/News";
import "./main.scss";

const Main = () => {
  return (
    <div className="main-page">
      <article>
        <Best />
        <News />
      </article>
    </div>
  );
};

export default Main;
