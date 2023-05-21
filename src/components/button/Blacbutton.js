import React from 'react';
import blackb from './blackButton.module.scss';

const Blackbutton = ({ title, buttontab, click }) => {
  const buttonStyle =
    title === '가입하기'
      ? {
          width: '200px',
          height: '60px',
          borderRadius: '10px',
        }
      : {};

  return (
    <button
      title={title}
      className={blackb.button}
      tabIndex={buttontab}
      style={buttonStyle}
      type={null ? 'button' : 'submit'}
      onClick={click}
    >
      {title}
    </button>
  );
};

export default Blackbutton;
