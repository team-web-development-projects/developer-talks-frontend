import './Scrolltop.scss';
import { useState, useEffect } from 'react';

function Scrolltop() {
  const [showButton, setShowButton] = useState(false);

  console.log(window.scrollY);

  const scrollToBottom = () => {
    //아래
    window.scroll({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const scrollToTop = () => {
    //위
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    //FIXME 이것도 DOM이던데 이렇게 써도 될까요?
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return showButton ? (
    <div className="scroll__container">
      <button id="top" onClick={scrollToTop} type="button">
        {' '}
        Top
      </button>
    </div>
  ) : (
    <div>
      <button id="bottom" onClick={scrollToBottom} type="button">
        {' '}
        Bottom
      </button>
    </div>
  );
}
//FIXME 버튼이 위에서는 맨 밑으로 가는 버튼이 보이고 버튼이 아래에서는 위로가는 버튼을 만들고 싶었었습니다
export default Scrolltop;
