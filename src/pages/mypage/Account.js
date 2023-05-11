import Left from 'components/left/Left';
import './Account.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';
// import { parseJwt } from 'hooks/useParseJwt';
import Form from 'components/form/Form';
import { useNavigate } from 'react-router-dom';

function Account() {
  const auth = useSelector((state) => state.authToken);
  console.log('auth:', auth.accessToken);

  // const userData = parseJwt(localStorage.getItem('token')); //NOTE - 토큰
  const [userData, setUserData] = useState({
    id: 1,
    username: '김모양',
    usernickname: '1111',
    usersub: '1@naver.com',
    userid: '11111',
    userpass: '!1111111',
  });

  const tabTitle = ['회원정보 수정', '회원 탈퇴'];
  const [select, setSelect] = useState(null);
  const onSelect = (type) => {
    setSelect(type);
  };
  const [username, setUsername] = useState(userData.username);
  const [usernickname, setUsernickname] = useState(userData.usernickname);
  const [usersub, setUsersub] = useState(userData.usersub);
  const [userid, setUserid] = useState(userData.userid);
  const [userpass, setUserpass] = useState(userData.userpass);
  // 객체로 만들어서 관리 보드는 참고하기

  const navigate = useNavigate();
  const submit = () => {
    //NOTE - 저장
    const updateData = {
      id: userData.id,
      userid: userid,
      usernickname: usernickname,
      userpass: userpass,
      username: username,
      usersub: usersub,
    };
    setUserData(updateData);
    console.log(updateData);
    navigate('/mypage');
  };

  const reset = (e) => {
    //NOTE - 리셋
    setUserid(userData.userid);
    setUsernickname(userData.usernickname);
    setUserpass(userData.userpass);
    setUsername(userData.username);
    setUsersub(userData.usersub);
    e.preventDefault();
    console.log(userData);
  };

  return (
    <main className="main">
      <Left />
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
            {/* 비밀번호 선 인증 필요*/}
            {/* FIXME 버튼 말고 폼에 연결해야 할까요 */}
            {/* <Form onSubmit={userEdit}> */}
            <Form>
              <div className="">
                <fieldset>
                  <legend>회원정보 수정</legend>
                  <label>
                    이름 : {''}
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                    />
                  </label>
                  <br />
                  <label>
                    이메일 : {''}
                    <input
                      value={usersub}
                      onChange={(e) => setUsersub(e.target.value)}
                      type="text"
                    />
                  </label>
                  <br />
                  <label>
                    아이디 : {''}
                    <input
                      value={userid}
                      onChange={(e) => setUserid(e.target.value)}
                      type="text"
                    />
                  </label>
                  <br />
                  <label>
                    닉네임 : {''}
                    <input
                      value={usernickname}
                      onChange={(e) => setUsernickname(e.target.value)}
                      type="text"
                    />
                  </label>
                  <br />
                  <label>
                    비밀번호 : {''}
                    <input
                      value={userpass}
                      onChange={(e) => setUserpass(e.target.value)}
                      type="password"
                    />
                  </label>
                  <hr />
                  <button onClick={submit}>저장</button>
                  <button onClick={reset}>리셋</button>
                </fieldset>
              </div>
            </Form>
          </div>
        )}
        {select === 1 && <div>회원탈퇴 버튼</div>}
      </section>
    </main>
  );
}

export default Account;
