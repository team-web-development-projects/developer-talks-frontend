import React from "react";
import s from "./rereplyItem.module.scss";
import ProfileImg from "components/profileImg/ProfileImg";

const RereplyItem = ({ rr }) => {
  return (
    <div className={s.container}>
      <div className={s.nickname}>
        <ProfileImg nickname={rr.nickname}/>
        {rr.nickname}
      </div>
      <div className={s.content} dangerouslySetInnerHTML={{ __html: rr.content }}></div>
    </div>
  );
};

export default RereplyItem;
