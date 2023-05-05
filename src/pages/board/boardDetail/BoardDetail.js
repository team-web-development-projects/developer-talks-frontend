import React from 'react';
import s from './boardDetail.module.scss'
import { Outlet } from 'react-router-dom';

const BoardDetail = () => {
    return (
        <>
          <p>fork test중입니다.</p>
          <Outlet/>
        </>
    );
};

export default BoardDetail;