import React from 'react';
import s from './buttonBlack.module.scss';

const ButtonBlack = ({name}) => {
    return (
        <button className={s.button}>
            <p>{name}</p>
        </button>
    );
};

export default ButtonBlack;