import Userside from 'components/userside/Userside';
import './Account.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';
// import { parseJwt } from 'hooks/useParseJwt';
import Form from 'components/form/Form';
import Button from 'components/button/Button';
// import { useNavigate } from 'react-router-dom';

function Account() {
  const auth = useSelector((state) => state.authToken);
  console.log('auth:', auth.accessToken);
  // const userData = parseJwt(localStorage.getItem('token')); //NOTE - 토큰

  const tabTitle = ['회원정보 수정', '회원 탈퇴'];
  const [select, setSelect] = useState(null);
  const onSelect = (type) => {
    setSelect(type);
  };

  const initialFormState = {
    username: '김모양',
    usernickname: '1111',
    usersub: '1@naver.com',
    userid: '11111',
    userpass: '!1111111',
  };

  const [userData, setUserData] = useState(initialFormState);

  const userEdit = (e) => {
    //NOTE 수정
    e.preventDefault();
    console.log(`
      이름: ${userData.username}
      닉네임: ${userData.usernickname}
      이메일: ${userData.usersub}
      아이디: ${userData.userid}
      비밀번호: ${userData.userpass}   
    `);
  };

  const reset = () => {
    //NOTE 리셋
    setUserData(initialFormState);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <main className="main">
      <Userside />
      <section className="notes">
        <ul>
          {tabTitle.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => onSelect(index)}
                className={`${select === index && 'select'}`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        {select === 0 && (
          <div>
            <Form onSubmit={userEdit}>
              <div className="">
                <fieldset>
                  <legend>회원정보 수정</legend>
                  <label>
                    이름 : {''}
                    <input
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                      type="text"
                    />
                  </label>
                  <br />
                  <label>
                    이메일 : {''}
                    <input
                      name="usersub"
                      value={userData.usersub}
                      onChange={handleChange}
                      type="text"
                    />
                  </label>
                  <br />
                  <label>
                    아이디 : {''}
                    <input
                      name="userid"
                      value={userData.userid}
                      onChange={handleChange}
                      type="text"
                    />
                  </label>
                  <br />
                  <label>
                    닉네임 : {''}
                    <input
                      name="usernickname"
                      value={userData.usernickname}
                      onChange={handleChange}
                      type="text"
                    />
                  </label>
                  <br />
                  <label>
                    비밀번호 : {''}
                    <input
                      name="userpass"
                      value={userData.userpass}
                      onChange={handleChange}
                      type="password"
                    />
                  </label>
                  <hr />
                  <Button>저장</Button>
                  <Button onClick={reset}>리셋</Button>
                </fieldset>
              </div>
            </Form>
          </div>
        )}
        {select === 1 &&
          <form className='delete'>
            <div className='deletgaider'>
              회원 탈퇴일로부터 계정과 닉네임을 포함한 계정 정보(아이디/이메일/닉네임)는
              개인정보 보호방침에 따라 60일간 보관(잠김)되며, 60일 경과된 후에는 모든 개인 정보는 완전히 삭제되며 더 이상 복구할 수 없게 됩니다.

              작성된 게시물은 삭제되지 않으며, 익명처리 후 OKKY 로 소유권이 귀속됩니다.
            </div>
            <input type='checkbox' />
            <label>계정 삭제에 관한 정책을 읽고 이에 동의합니다</label>
            <br />
            <Button>회원탈퇴 버튼</Button>
          </form>
        }
      </section>
    </main>
  );
}

export default Account;
