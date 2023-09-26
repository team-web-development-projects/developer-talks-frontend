import Best from "pages/_com/best/Best";
import News from "pages/_com/news/News";
import "./main.scss";
import Notice from "pages/_com/notice/Notice";

const Main = () => {
  return (
    <div className="main-page">
      <article>
        <Best />
        <News />
      </article>
      <article>
        <Notice />
      </article>
    </div>
  );
};

export default Main;
