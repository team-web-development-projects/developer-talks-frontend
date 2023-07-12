import DropDown from "components/dropdown/DropDown";
import { parseJwt } from "hooks/useParseJwt";
import { useRef } from "react";
import { forwardRef } from "react";
import { useSelector } from "react-redux";

const ShowUserInfo = forwardRef(({ recieverNick, setShowUserInfo, setMeesageModal, ref }) => {
  const auth = useSelector((state) => state.authToken);

  return (
    <DropDown>
      <li>유저정보보기</li>
      {parseJwt(auth.accessToken).nickname !== recieverNick && (
        <li
          onClick={(e) => {
            e.stopPropagation();
            setMeesageModal(true);
            setShowUserInfo(false);
          }}
        >
          쪽지보내기
        </li>
      )}
    </DropDown>
  );
});

export default ShowUserInfo;
