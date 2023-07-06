import Button from "components/button/Button";
import s from "./rereplyItem.module.scss";
import { randomProfile } from "hooks/useRandomProfile";
import { useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import { BsLock } from "react-icons/bs";
import { useState } from "react";
import { parseJwt } from 'hooks/useParseJwt';
import { useEffect } from 'react';

const RereplyItem = ({ rr }) => {
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();
  const [isSelf, setIsSelf] = useState(false);

  const handleUpdate = () => {};
  const handleDelete = () => {};

  useEffect(() => {
    if (auth.accessToken !== null) {
      const nickname = parseJwt(auth.accessToken).nickname;
      if (nickname === rr.userInfo.nickname) {
        setIsSelf(true);
      }
    }
  }, []);
  return (
    <div className={s.container}>
      <div className={s.info}>
        {rr.userInfo.userProfile !== null ? (
          <img className={s.profile} src={rr.userInfo.userProfile} alt="프로필 이미지" />
        ) : (
          <div className={s.profile} dangerouslySetInnerHTML={{ __html: randomProfile(auth.accessToken) }} />
        )}
        <div>
          <p className={s.nickname}>{rr.userInfo.nickname}</p>
          <p className={s.date}>{rr.modifiedDate}</p>
        </div>
        {rr.secret && <BsLock size={20} />}
        {isSelf ? (
          <div className={s.btn_wrap}>
            <Button onClick={handleUpdate} size="small">
              수정
            </Button>
            <Button onClick={handleDelete} size="small" theme="cancle">
              삭제
            </Button>
          </div>
        ) : null}
      </div>
      <div className={s.content} dangerouslySetInnerHTML={{ __html: rr.content }}></div>
    </div>
  );
};

export default RereplyItem;
