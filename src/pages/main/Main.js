import Best from "pages/_com/best/Best";
import News from "pages/_com/news/News";
// import Button from "cherry-cock-ui";
import "./main.scss";

const Main = () => {
  return (
    <div className="main-page">
      {/* <Button label="Button" onClick={() => {}} primary /> */}
      <article>
        <Best />
        <News />
      </article>
    </div>
  );
};

export default Main;
