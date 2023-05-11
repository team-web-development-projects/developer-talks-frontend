import Left from 'components/left/Left';
import { useState } from 'react';
import './Mypage.scss';

const Mypage = () => {
  const contacts = [
    {
      id: 0,
      type: '최근활동',
      line: [
        {
          id: 0,
          title: '자바스트립트 궁금합니다',
          content: 'ㅣㄴ아ㅓ니아ㅓ니',
          nickname: 'Ann',
        },
      ],
    },
    {
      id: 1,
      type: '내가 쓴 글',
      line: [
        {
          id: 0,
          title: '리액트 궁금합니다',
          content: 'dd',
          nickname: 'Anne',
        },
        {
          id: 1,
          title: '리액트 궁금합니다',
          content: 'dd',
          nickname: 'Anne',
        },
        {
          id: 2,
          title: '리액트 궁금합니다',
          content: 'dd',
          nickname: 'Anne',
        },
      ],
    },
    {
      id: 2,
      type: '댓글',
      line: [
        {
          id: 0,
          title: '요즘 무슨 개발 하시나요?',
          content: '나이러니ㅏ러',
          nickname: 'bee',
        },
      ],
    },
    {
      id: 3,
      type: '스크랩',
      line: [
        {
          id: 0,
          title: '할말이 있습니다1',
          content: 'dd',
          nickname: 'Araaa',
        },
        {
          id: 1,
          title: '할말이 있습니다',
          content: 'dd',
          nickname: 'Araaa',
        },
        {
          id: 2,
          title: '할말이 있습니다',
          content: 'dd',
          nickname: 'Araaa',
        },
      ],
    },
  ];
  const [select, setSelect] = useState(-1);
  const onSelect = (type) => {
    setSelect(type);
  };

  return (
    <main className="main">
      <Left />
      <section className="notes">
        <ul>
          {contacts.map((contact, index) => (
            <li key={index}>
              <button
                onClick={() => onSelect(index)}
                className={`${select === index ? 'select' : ''}`}
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
  );
};

export default Mypage;
