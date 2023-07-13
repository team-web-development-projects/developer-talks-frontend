import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { SET_ROUTER } from "store/PageRouter";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import classnames from "classnames";

export const NavigateMain = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pageRouter = useSelector((state) => state.pageRouter);
  const mypage = ["/mypage", "/my-studyroom", "/account"];

  useEffect(() => {
    if (mypage.includes(location.pathname)) {
      dispatch(SET_ROUTER({ state: "mypage" }));
    } else {
      dispatch(SET_ROUTER({ state: null }));
    }
  }, [location, dispatch]);

  return (
    <>
      <Header />
      <div
        className={classnames("page", {
          "is-mypage": pageRouter.state === "mypage",
        })}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

// 헤더 미포함
export const NavigatePost = () => {
  return (
    <>
      <div className="page">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
