import Button from 'components/button/Button';
import './Userregist.scss';
const Userregist = () => {
  const authlogins = 'naver';
  return (
    <div className='userregistname'>
      <div className="headername">
        <p>{authlogins}계정을이용한 회원가입</p>
        <span>Developer-Talks는 소프트웨어 개발자를 위한 지식공유 플렛폼입니다.</span>
      </div>

      <div className="prople">
        <span>프로필 이미지 선택</span>
        <img src="" alt="" />
      </div>

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
      <form className='registIDform'>
        <label>이메일</label>
        <input type="text" />
        <label>닉네임</label>
        <input type="text" />
        <label>관심있는 기술 태그입력</label>
        <select>
          <option>DJANGO</option>
          <option>SPRING</option>
          <option>JAVASCRIPT</option>
          <option>JAVA</option>
          <option>PYTHON</option>
          <option>CPP</option>
          <option>REACT</option>
          <option>AWS</option>
        </select>
        <Button>저장하기</Button>
      </form>


    </div>
  );
};

export default Userregist;
