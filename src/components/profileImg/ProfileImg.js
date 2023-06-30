import axios from "axios";
import classnames from "classnames";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";
import { randomProfile } from "hooks/useRandomProfile";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import s from "./profileimg.module.scss";

/**
 *
 * @param {string} size 이미지 유형 - small: 게시글, 답변등 닉네임 왼쪽에 붙기 / big: 내 프로필
 * @param {string} nickname 고유한 값, 이 값으로 랜덤 이미지 뿌려줌
 * @returns
 */

const ProfileImg = ({ size = "small", profileImgData, setProfileImgData, nickname, border }) => {
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["profileImg"],
    async () => {
      const res = await axios.get(`${ROOT_API}/users/profile/image`, {
        headers: { "X-AUTH-TOKEN": auth.accessToken },
      });
      return res.data;
    },
    {
      enabled: auth.accessToken !== null
    }
  );

  const handleChangeFirstProfileImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log('form', formData);
    axios
      .post(`${ROOT_API}/users/profile/image`, formData, {
        headers: { "X-AUTH-TOKEN": auth.accessToken },
      })
      .then((response) => {
        showToast("success", "😎 정보가 수정 되었습니다");
        console.log('res', response);
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

    // axios
    //   .put(`${ROOT_API}/users/profile/image`, formData, {
    //     headers: { "X-AUTH-TOKEN": auth.accessToken },
    //   })
    //   .then((response) => {
    //     setProfileImgData({
    //       id: response.data.id,
    //       url: response.data.url,
    //       inputName: response.data.inputName,
    //     });
    //   });
  };

  return (
    <div
      className={classnames(s.img_wrap, {
        [s.is_big]: size === "big",
        [s.is_border]: border === "color",
      })}
    >
      {/*
       */}
      {data && !isLoading && data.url && <img src={data.url} alt="프로필이미지" />}
      {data && !isLoading && data.url === "" && (
        <div className={s.img} dangerouslySetInnerHTML={{ __html: randomProfile(nickname) }} />
      )}
      
      <input accept="image/*" type="file" name="프로필이미지" onChange={ auth.accessToken ? handleChangeProfileImage : handleChangeFirstProfileImage} id="profile" />
    </div>
  );
};

export default ProfileImg;
