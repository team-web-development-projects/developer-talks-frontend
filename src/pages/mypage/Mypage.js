import axios from 'axios';
import Left from 'components/left/Left';
import { ROOT_API } from 'constants/api';
import { parseJwt } from 'hooks/useParseJwt';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './Mypage.scss';
import { contacts } from './dummyData';
import { SET_TOKEN } from 'store/Auth';
import { setRefreshToken } from 'store/Cookie';

const Mypage = ({ type }) => {
  const auth = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const [select, setSelect] = useState(-1);
  const [favorite, setFavorite] = useState([]);
  const [post, setPost] = useState('post');
  const [types, setTypes] = useState('favorite');
  const { favo } = useParams();
  const dispatch = useDispatch();

  let nickname = '';
  if (auth.accessToken !== null) {
    nickname = parseJwt(auth.accessToken).nickname;
  }

  const onSelect = (type) => {
    setSelect(type);
  };

  useEffect(() => {
    if (select === 3) {
      setPost('post');
      setTypes('favorite');
    } else if (select === 2) {
      setPost('post');
      setTypes('user');
    } else if (select === 1) {
      setPost('comment');
      setTypes('user');
    }
    // console.log(setTypes, 'dddddfsdjfsdlkfjsdklfjsdljsdlkfjsldkfjsdflksf');
  }, [select]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${ROOT_API}/${post}/list/${types}/${nickname}`, //NOTE page=0 ??

        // https://dtalks-api.site/post/list/favorite/11111?page=0 //3번
        // https://dtalks-api.site/post/list/user/11111?page=0 //2번
        // https://dtalks-api.site/comment/list/user/11111 //1번
        {
          params: { favo: favo, page: 0, size: 1 }, //NOTE 파람스??
          headers: {
            accept: '*/*',
            'X-AUTH-TOKEN': auth.accessToken,
          },
        }
      );
      setFavorite(response.data.content);
      console.log(response.data.content, 'ddd');
    };

    if (auth.accessToken === null) {
      navigate('/login', { replace: true });
    } else {
      fetchData();
      dispatch(SET_TOKEN({ accessToken: auth.accessToken }));
    }
  }, [auth.accessToken, navigate, nickname, favo, select]);

  return (
    <>
      {auth.accessToken !== null ? (
        <main className="main">
          <Left />

          <section className="notes">
            <ul>
              {contacts.map((contact, index) => (
                <li key={index}>
                  <button
                    onClick={() => onSelect(index)}
                    className={`${select === index ? 'select' : ''}`}
                  >
                    {contact.type}
                  </button>
                </li>
              ))}
            </ul>
            <div className="">
              {select !== -1 &&
                contacts[select] &&
                favorite !== undefined &&
                favorite.map((item, index) => (
                  <div key={index}>
                    <div className="title">{item.title}</div>
                    <div className="content">{item.content}</div>
                    <div className="nickname">{item.nickname}</div>
                  </div>
                ))}
            </div>
          </section>
        </main>
      ) : null}
    </>
  );
};

export default Mypage;
