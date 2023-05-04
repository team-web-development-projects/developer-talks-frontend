import classNames from 'classnames';
import Left from 'components/left/Left';
import { useSelector } from 'react-redux';
// import { Link, useLocation } from "react-router-dom";

const Mypage = () => {
  // const location = useLocation();
  const auth = useSelector((state) => state.authToken);
  console.log('auth:', auth);

  return (
    <div className="app">
      <main>
        {/* <Link
        to="/login"
        className={classNames("", {
          "is-active": location.pathname === "/login",
        })}
      >
        로그인
      </Link>
      {" | "}
      <Link
        to="/regist"
        className={classNames("", {
          "is-active": location.pathname === "/regist",
        })}
      >
        회원가입
      </Link> */}
        <div className="section">
          <Left />
          <section className="notes">
            <h2>개인노트 페이지</h2>
            <form>
              <input type="text" placeholder="글을 적어주세여" />
              <button>입력</button>
            </form>
            <ul className="note">
              <li>
                <p>❌</p>
              </li>
            </ul>
            <button>전체 삭제</button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Mypage;
