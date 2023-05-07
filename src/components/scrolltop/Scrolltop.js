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
    <div className="scroll__container">
      <button id="bottom" onClick={scrollToBottom} type="button">
        {' '}
        Bottom
      </button>
    </div>
  );
}
export default Scrolltop;
