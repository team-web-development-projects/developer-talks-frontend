import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import { Outlet } from "react-router-dom";

export const NavigateMain = () => {
  return (
    <>
      <Header />
      <div className="page">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

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
}
