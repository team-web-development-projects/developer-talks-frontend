import { Link } from 'react-router-dom';
import axios from 'axios';
import Logout from 'components/logout/Logout';
import { ROOT_API } from 'constants/api';
import { parseJwt } from 'hooks/useParseJwt';
import { useSelector } from 'react-redux';
import './Userside.scss';
import { useState } from 'react';

const Userside = () => {
  const [isActive, setIsActive] = useState(false);
  const [imageFile, setImageFile] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    axios
      .post(
        `${ROOT_API}/users/profile/image`,
        {
          id: 0,
          name: 'string',
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'X-AUTH-TOKEN': auth.accessToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  const handleClick = () => {
    setIsActive(!isActive);
  };

  // 'file=@logo192.png;type=image/png'
  const auth = useSelector((state) => state.authToken).accessToken;
  const userinfo = parseJwt(auth);

  // const [file,setFile]= useState();

  return (
    <>
      <section className="sidebackground"></section>
      <section className="side">
        <div className="imgwrap">
          <img src={imageFile} alt="" />
          <input type="file" name="" id="" />
        </div>
        <p>{userinfo.nickname} 님 </p>
        <ul>
          {/* <li>
            <Link to="/introduction" className={isActive ? 'active' : ''} onClick={handleClick}>🎆 내소개</Link>
          </li> */}
          <li>
            <Link to="/mypage" className={isActive ? 'active' : ''} onClick={handleClick}>🧥 활동내역</Link>
          </li>
          <li>
            <Link to="/account" className={isActive ? 'active' : ''} onClick={handleClick}>🐹 회원정보수정 및 탈퇴</Link>
          </li>
          <li>
            <Logout />

          </li>
        </ul>
      </section>
    </>
  );
};

export default Userside;
