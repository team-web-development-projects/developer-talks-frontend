import classNames from "classnames";
import Left from "components/left/Left";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./Mypage.scss";

import { Link, useLocation } from "react-router-dom";

const Mypage = () => {
  const location = useLocation();
  const auth = useSelector((state) => state.authToken);
  console.log("auth:", auth.accessToken);

  let [user, setUser] = useState([
    {
      id: "1",
      amount: "test1",
      data: "사랑의 앞이 튼튼하며, 거친 사막이다. 청춘의 보배를 기쁘며, 날카로우나 구하지 하여도 그러므로 뿐이다. 이상 무엇을 목숨을 그들에게 천하를 능히 위하여, 그들은 듣기만 부패뿐이다. 내는 오직 실로 두손을 봄바람이다. 어디 무엇이 소금이라 있으며, 예가 기관과 인류의 뿐이다. 풀이 청춘의 지혜는 창공에 인간은 때까지 봄바람이다. 인류의 피는 주며, 자신과 쓸쓸하랴? 돋고, 그들의 것은 위하여, 그와 위하여서. 수 웅대한 설레는 피가 청춘이 피고, 것이다. 이는 이상이 구하기 생생하며, 천하를 운다.",
      nickname: "Ann",
    },
    {
      id: "2",
      amount: "test2",
      data: "bbbbbbbbbbbbbbb",
      nickname: "Tree",
    },
    {
      id: "3",
      amount: "test3",
      data: "ccccccccccccccccccccc",
      nickname: "Lotto",
    },
  ]);

  const contacts = [
    {
      id: 0,
      type: "최근활동",
      line: [
        {
          id: 0,
          title: "자바스트립트 궁금합니다",
          content: "ㅣㄴ아ㅓ니아ㅓ니",
          nickname: "Ann",
        },
      ],
    },
    //FIXME line배열 3가지 리스트들이 다 보였으면 하는데 안보입니다!
    {
      id: 2,
      type: "내가 쓴 글",
      line: [
        {
          id: 0,
          title: "리액트 궁금합니다",
          content: "dd",
          nickname: "Anne",
        },
        {
          id: 1,
          title: "리액트 궁금합니다",
          content: "dd",
          nickname: "Anne",
        },
        {
          id: 2,
          title: "리액트 궁금합니다",
          content: "dd",
          nickname: "Anne",
        },
      ],
    },
    {
      id: 3,
      type: "댓글",
      line: [
        {
          id: 0,
          title: "요즘 무슨 개발 하시나요?",
          content: "나이러니ㅏ러",
          nickname: "bee",
        },
      ],
    },
    {
      id: 4,
      type: "스크랩",
      line: [
        {
          id: 0,
          title: "할말이 있습니다",
          content: "dd",
          nickname: "Araaa",
        },
      ],
    },

    // { id: 1, type: '내가 쓴 글', line: '최근 내가 쓴 글들' },
    // { id: 2, type: '댓글', line: '최근 댓글' },
    // { id: 3, type: '스크랩', line: '스크랩 한 글들' },
  ];
  const [select, setSelect] = useState("");
  const onSelect = (type) => {
    setSelect(type);
  };

  const LoginRegist = () => {
    return (
      <div>
        <Link
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
        </Link>
      </div>
    );
  };

  return (
    <main className="main">
      {auth ? "로그아웃" : <LoginRegist />}
      <Left />
      <section className="notes">
        <ul>
          {contacts.map((contact, index) => (
            <li>
              <button
                key={contact.id}
                onClick={() => onSelect(index)}
                className={`${select === index ? "select" : ""}`}
              >
                {contact.type}
              </button>
            </li>
          ))}
        </ul>
        <div className="">
          {select &&
            contacts[select].line.map((item, index) => (
              <div>
                <div className="title">{item.title}</div>
                <div className="content">{item.content}</div>
                <div className="nickname">{item.nickname}</div>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
};

export default Mypage;

// {/* <div> {contacts[select].line.time}</div> */}
// {/* <div className="title">
//     {select === index && contacts[select].line.title}
//   </div>
//   <div className="content">
//     {select === index && contacts[select].line.content}
//   </div>
//   <div className="title">
//     {select === index && contacts[select].line.title}
//   </div>
//   <div className="content">
//     {select === index && contacts[select].line.content}
//   </div>
//   <div className="title">
//     {select === index && contacts[select].line.title}
//   </div>
//   <div className="content">
//     {select === index && contacts[select].line.content}
//   </div> */}
