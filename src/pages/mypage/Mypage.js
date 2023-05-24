import Left from "components/left/Left";
import { useEffect, useState } from "react";
import "./Mypage.scss";
import { useNavigate } from "react-router-dom";
import { contacts } from "./dummyData";
import { useSelector } from "react-redux";
import { getCookieToken } from "store/Cookie";

const Mypage = () => {
  const navigate = useNavigate();
  const [select, setSelect] = useState(-1);
  const auth = useSelector((state) => state.authToken);
  const onSelect = (type) => {
    setSelect(type);
  };

  useEffect(() => {
    if (auth.accessToken == null && getCookieToken() == null) {
      navigate("/login", { replace: true });
    }
  }, [auth.accessToken, navigate]);

  return (
    <>
      {auth.accessToken !== null ? (
        <main className="mypage">
          <Left />
          <section className="notes">
            <ul>
              {contacts.map((contact, index) => (
                <li key={index}>
                  <button
                    onClick={() => onSelect(index)}
                    className={`${select === index ? "select" : ""}`}
                  >
                    {contact.type}
                  </button>
                </li>
              ))}
            </ul>
            <div className="">
              {select !== -1 &&
                contacts[select].line.map((item, index) => (
                  <div key={index}>
                    <div className="title">{item.title}</div>
                    <div className="content">{item.content}</div>
                    <div className="nickname">{item.nickname}</div>
                  </div>
                ))}
            </div>
          </section>
        </main>
      ) : (
        null
      )}
    </>
  );
};

export default Mypage;
