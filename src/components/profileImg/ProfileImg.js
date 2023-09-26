import { getUserImage } from "api/user";
import axios from "axios";
import classnames from "classnames";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";
import Gravatar from "react-gravatar";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { getCookie } from "util/authCookie";
import s from "./profileimg.module.scss";

/**
 *
 * @param {string} size 이미지 유형 - small: 게시글, 답변등 닉네임 왼쪽에 붙기 / big: 내 프로필
 * @param {string} nickname 고유한 값, 이 값으로 랜덤 이미지 뿌려줌
 * @returns
 */

const ProfileImg = ({ size = "small", profileImgData, setProfileImgData, nickname, border, type, className }) => {
  const auth = useSelector((state) => state.authToken);
  const user = useSelector((state) => state.userStore);
  const queryClient = useQueryClient();

  // 초기 회원가입때는 프로필 이미지가 없으니 있으면안된다.
  const {
    data,
    isLoading: getLoading,
    error: getImgError,
  } = useQuery({
    queryKey: ["profileImg"],
    queryFn: getUserImage,
    // enabled: auth.accessToken !== null, // 회원가입페이지로 바로 진입시 에는 작동안하게
    enabled: getCookie("dtrtk") !== null,
  });

  const handleChangeFirstProfileImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`${ROOT_API}/users/profile/image`, formData, {
        // headers: { "X-AUTH-TOKEN": auth.accessToken },
      })
      .then((response) => {
        showToast("success", "😎 정보가 수정 되었습니다");
        setProfileImgData({
          id: response.data.id,
          url: response.data.url,
          inputName: response.data.inputName,
        });
      });
  };

  const { isLoading: isPostingTutorial, mutate: chnageImg } = useMutation(
    ["profileChange"],
    (formData) =>
      axios.put(`${ROOT_API}/users/profile/image`, formData, {
        headers: { "X-AUTH-TOKEN": auth.accessToken },
      }),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["profileImg"]);
        showToast("success", "정보가 수정 되었습니다");
      },
    }
  );

  const handleChangeProfileImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    chnageImg(formData);
  };

  return (
    <div
      className={classnames(s.img_wrap, className, {
        [s.is_big]: size === "big",
        [s.is_border]: border === "color",
        [s.regist_page]: type === "regist",
      })}
    >
      {/* 마이페이지에 이미지가 있는 경우, 회원가입 페이지는 포함 안됨. */}
      {auth.accessToken && data && !getLoading && data.url && <img src={data.url} alt="프로필이미지" />}
      {/* 마이페이지에 이미지가 없는 경우, 회원가입 페이지는 포함 안됨. */}
      {auth.accessToken && data && data.url === null && (
        // <div className={s.img} dangerouslySetInnerHTML={{ __html: randomProfile(auth.accessToken) }} />
        <Gravatar email={user.nickname} />
      )}
      {/* {!auth.accessToken && (
        <img
          src={profileImgData.url ? profileImgData.url : defaultUserImage}
          alt="이미지 추가"
          className={classNames("", { [s.is_select]: profileImgData.url })}
        />
      )} */}
      {type !== "header" && (
        <input
          accept="image/*"
          type="file"
          name="프로필이미지 추가 및 변경"
          onChange={auth.accessToken ? handleChangeProfileImage : handleChangeFirstProfileImage}
          id="profile"
        />
      )}
    </div>
  );
};

export default ProfileImg;
