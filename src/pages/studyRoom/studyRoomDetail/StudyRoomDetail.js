import React from 'react'
import { useParams } from 'react-router-dom';

const StudyRoomDetqil = () => {
  const { postId } = useParams();

  return (
    <div>
      <div>
        왼쪽 메뉴는 채팅룸, 
        오른쪽 메뉴는 게시판. 

        오른쪽 메뉴 누르면 가운데 컨텐츠가 게시판이 되고,
        왼쪽 메뉴 누르면 가운데 컨텐츠가 채팅룸이 됨

        <div className="left-menu"></div>
        <div className="conten"></div>
        <div className="right-menu"></div>
      </div>
      
    </div>
  )
}

export default StudyRoomDetqil