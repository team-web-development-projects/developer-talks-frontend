import axios from 'axios';
import Button from 'components/button/Button';
import { API_HEADER, ROOT_API } from 'constants/api';
import { parseJwt } from "hooks/useParseJwt"; //TODO 배포후 정보 가져오기
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { SET_TOKEN } from 'store/Auth';
import { setRefreshToken } from 'store/Cookie';
import s from "../studyRoom/studyRoomPost/studyRoom.module.scss";
import './Userregist.scss';
import { useNavigate } from 'react-router-dom';



const Userregist = () => {
  const authlogins = 'naver'; //TODO auth 구글,네이버, 카카오
  let navigate = useNavigate();
  const auth = useSelector((state) => state.authToken);

  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const [selectedTags, setSelectedTags] = useState({
    tags: [],
    authJoin: true,
    joinableCount: 1,
  });
  const nicknameRef = useRef(null);
  const profileRef = useRef(null);
  const discriptionref = useRef(null);
  const [userEmail, setUserEmail] = useState('')
  const [duplicateNickName, setDuplicateNickName] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const handleCheckboxChange = (event) => {
    setAutoLogin(event.target.checked);
  };
  if (auth.accessToken !== null) {
    setUserEmail(parseJwt(auth.accessToken).sub, "ㅇㅇㅇ");
    console.log(parseJwt(auth.accessToken).sub, "ㅇㅇ")
    // }else{
    // console.log(parseJwt(auth.accessToken).sub)

  }
  // https://team-web-development-projects.github.io/developer-talks-frontend/userregist?accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJ1c2VyaWQiOiJkamFnbWx3bm4xMkBnbWFpbC5jb20iLCJuaWNrbmFtZSI6Iuq5gOyLnOyXsCIsInByb3ZpZGVyIjoiZ29vZ2xlIiwiaWF0IjoxNjg1MjgxNDc5LCJleHAiOjE2ODUyOTIyNzl9.FDTQ6_0RWsBBb4ExIIxD_8_xufTm_GgeXCZSc5q11Wg
  //NOTE 토큰 재갱신
  if (window.location.href.includes('accessToken')) {
    const accessToken = window.location.href.split('accessToken=')[1];
    dispatch(SET_TOKEN({ accessToken: accessToken }));
    console.log('토큰있음');
    // navigate('/', { replace: true }); //NOTE 구글 로그인 시 메인으로 가게 만드는
    console.log(accessToken)
  }

  const tags = [
    "DJANGO",
    "SPRING",
    "JAVASCRIPT",
    "JAVA",
    "PYTHON",
    "CPP",
    "REACT",
    "AWS",
  ];
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: 'onChange' });

  const [profileImageId, setProfileImageId] = useState('')
  const propileSubmit = async (data) => {
    try {
      if (profileRef.current && profileRef.current.files && profileRef.current.files.length > 0) {
        const formData = new FormData();//NOTE 프로필 이미지
        formData.append("file", profileRef.current.files[0]);
        const response = await axios.post(
          `${ROOT_API}/users/profile/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              accept: "application/json",
            },
            file: 'file=@22.JPG;type=image/jpeg'
          })
        console.log(response.data, "dfdfd");
        console.log(formData, "dfdfd");
        setProfileImageId(response.data.id);
      } else {
        console.log("파일을 선택해주세요.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit = async (data) => {

    console.log(duplicateNickName)
    await new Promise((r) => setTimeout(r, 1000));
    if (duplicateNickName) {//NOTE 버튼 다 클릭하면 실행 //TODO duplicateId 유저 아이디 중복 체크???
      axios
        .post(
          `${ROOT_API}/sign-up`,
          {
            nickname: data.nickname,
            skills: selectedTags.tags,
            description: data.description,
            profileImageId: profileImageId
          },
          {
            headers: {
              API_HEADER,
            },
          }
        )
        .then(function (response) {
          console.log('회원가입 성공:', response);
          if (autoLogin) {//NOTE 자동로그인
            setRefreshToken({ refreshToken: response.data.refreshToken });
            dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
            alert('토큰저장');
            navigate('/')
            reset();
          }
        })
        .catch(function (error) {
          console.log('로그인 실패: ', error.response.data);
        });
    } else {
      alert("중복체크나 인증을 안했어요")
    }
  };


  // const inputRef = useRef(null);

  let textTemp = ''; //NOTE 중복체크
  const validateDuplicate = (data) => {
    const type = data;
    const value = watch(data);
    console.log('넣은 데이터', watch(data));
    // setTextTemp(watch(data));
    textTemp = watch(data);
    axios.get(`${ROOT_API}/user/check/${value}`).then(function (response) {
      if (type === 'nickname') {
        response.data.duplicated === true
          ? setDuplicateNickName(true)
          : setDuplicateNickName(false);
      }
    });
  };

  const clickTag = (tag) => { //NOTE 기술 테그
    if (selectedTags.tags.includes(tag)) {
      setSelectedTags({
        ...selectedTags,
        tags: selectedTags.tags.filter((selectedTag) => selectedTag !== tag),
      });
    } else {
      setSelectedTags({
        ...selectedTags,
        tags: [...selectedTags.tags, tag],
      });
    }
    console.log('dd', selectedTags.tags, typeof (selectedTags.tags))
  };
  return (
    <div className='userregistname'>
      <div className="headername">
        <p>{authlogins}계정을이용한 회원가입</p>
        <span>Developer-Talks는 소프트웨어 개발자를 위한 지식공유 플렛폼입니다.</span>
      </div>
      <div className="prople">
        <div className="imgwrap">
          {imageFile && (
            <img src={imageFile} alt="프로필이미지" />
          )}
          <input
            accept="image/*"
            ref={profileRef}
            type="file"
            name="프로필이미지"
            id="profile"
          />
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          propileSubmit();
        }}
      >버튼</button >
      <span>프로필 이미지 선택☝️</span>

      <div className="gaider">
        <span>🙏추가 안내</span>
        <ul>
          <li><span>프로필 이미지 변경</span>은 회원가입 이후에도 가능합니다.</li>
          <li><span>Gravartar</span>를 이용한 프로필 변경은 여기를 참고해주세요.</li>
        </ul>
      </div>
      <div className="line-style">
        <div className="jb-division-line"></div>
        <span>회원가입에 필요한 기본정보를 입력해주세요</span>
        <div className="jb-division-line"></div>
      </div>
      <form className='registIDform' onSubmit={handleSubmit(onSubmit)}>
        <label>이메일</label>
        <input className='disable' type="text" value={userEmail} readOnly />
        <label>닉네임</label>
        <span className="star" title="필수사항">
          *
        </span>
        <input
          type="text"
          id="nickname"
          placeholder="닉네임을 입력해주세요"
          tabIndex="2"
          ref={nicknameRef}
          maxLength={15}
          {...register('nickname', {
            required: '닉네임은 필수 입력입니다.',
            minLength: {
              value: 5,
              message: '5자리 이상 입력해주세요.',
            },
            // pattern: {
            //   value:
            //     /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
            //   message:
            //     "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!",
            // },
          })}
        />
        <Button
          title="중복체크"
          onClick={() => validateDuplicate('nickname')}
        >
          중복체크</Button>
        {errors.nickname && (
          <small role="alert">{errors.nickname.message}</small>
        )}
        {!errors.nickname &&
          duplicateNickName !== '' &&
          duplicateNickName === 'true' && (
            <small className="alert">중복된 닉네임입니다.</small>
          )}
        {!errors.nickname &&
          duplicateNickName !== '' &&
          duplicateNickName === 'false' && (
            <small className="true">
              사용할 수 있는 닉네임입니다.
            </small>
          )}
        <label>관심있는 태그입력</label>
        <div className='tagalign'>
          <div className={s.tags}>
            {tags.map((item, index) => (
              <span
                key={index}
                onClick={() => clickTag(item)}
                className={`tag ${selectedTags.tags.includes(item) ? [s.is_select] : ""
                  }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className='description'>
          <label>한 줄 내소개</label>
          <input
            type='description'
            id='description'
            ref={discriptionref}
            placeholder='내 소개를 자유롭게 해보세요 80자까지 가능합니다.'
            maxLength={80}
          />
        </div>
        <label>자동로그인</label>
        <input
          type="checkbox"
          checked={autoLogin}
          onChange={handleCheckboxChange}
        />
        <Button type='submt' disabled={isSubmitting} >간편 로그인</Button>
      </form>


    </div>
  );
};

export default Userregist;
