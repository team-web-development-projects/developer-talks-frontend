import Left from 'components/left/Left';
import './Account.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Form } from 'react-router-dom';
// import { Link } from 'react-router-dom';

function Account() {
  const auth = useSelector((state) => state.authToken);
  console.log('auth:', auth.accessToken);

  const contacts = [
    {
      id: 0,
      type: '회원정보',
      line: {
        id: 0,
        userId: 'userid',
        userName: 'name',
        userNickName: 'nickname',
        userEmail: 'useremail',
        userPassword: 'passward',
      },
    },
    {
      id: 1,
      type: '계정 삭제',
      line: { id: 0, userName: 'name', userNickName: 'nickname' },
    },
  ];
  const [select, setSelect] = useState('');
  const onSelect = (type) => {
    setSelect(type);
  };

  return (
    <main className="main">
      <Left />
      <section className="notes">
        <ul>
          {contacts.map((contact, index) => (
            <li>
              <button
                key={contact.id}
                onClick={() => onSelect(index)}
                className={`${select === index && 'select'}`}
              >
                {contact.type}
              </button>
              <Form onSubmit={''}>
                {/*FIXME 이번엔 클릭 시 두개가 똑같이 나오네요  */}
                {/* FIXME key오류, <formImpl>, useSubmitImpl must be used within a data router. 오류 */}
                <div className={`${select === contact.type ? 'selects' : ''}`}>
                  {select === index && (
                    <>
                      <fieldset>
                        <legend>회원정보 수정</legend>
                        <input
                          value={contacts[select].line.userEmail}
                          type="text"
                        />
                        <label>이메일</label>

                        <input
                          value={contacts[select].line.userName}
                          type="text"
                        />
                        <label>이름</label>

                        <input
                          value={contacts[select].line.userNickName}
                          type="text"
                        />
                        <label>닉네임</label>

                        <input
                          value={contacts[select].line.userPassword}
                          type="text"
                        />
                        <label> 비밀번호</label>
                      </fieldset>
                    </>
                  )}
                </div>
              </Form>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Account;
