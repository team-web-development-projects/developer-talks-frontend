import axios from 'axios';
import Left from 'components/left/Left';
import { parseJwt } from 'hooks/useParseJwt';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './Mypage.scss';
import { contacts } from './dummyData';

const Mypage = ({ type }) => {
  const auth = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const [select, setSelect] = useState(-1);
  const [favorite, setFavorite] = useState([]);
  const dispatch = useDispatch();

  let nickname = '';
  if (auth.accessToken !== null) {
    nickname = parseJwt(auth.accessToken).nickname;
  }

  const onSelect = (type) => {
    setSelect(type);
  };

  useEffect(() => {
    switch (select) {
      case 0:
        // axios.get(
        //   'https://dtalks-api.site/comment/list/user/11111' //1번
        //   {
        //     params: { favo: favo, page: 0, size: 1 }, //NOTE 파람스??
        //     headers: {
        //       'X-AUTH-TOKEN': auth.accessToken,
        //     },
        //   }
        // );
        break;
      case 1:
        axios
          .get(
            'https://dtalks-api.site/post/list/user/11111', //1번
            {
              params: { page: 0, size: 10 }, //NOTE 파람스??
              headers: {
                'X-AUTH-TOKEN': auth.accessToken,
              },
            }
          )
          .then((res) => {
            setFavorite(res.data.content);
            console.log('2', res);
          });
        break;
      case 2:
        axios
          .get(
            'https://dtalks-api.site/post/list/favorite/11111', //1번
            {
              params: { page: 0, size: 10 }, //NOTE 파람스??
              headers: {
                'X-AUTH-TOKEN': auth.accessToken,
              },
            }
          )
          .then((res) => {
            setFavorite(res.data.content);
            console.log('21', res);
          });
        break;
      case 3:
        axios
          .get(
            'https://dtalks-api.site/post/list/favorite/11111', //1번
            {
              params: { page: 0, size: 10 }, //NOTE 파람스??
              headers: {
                'X-AUTH-TOKEN': auth.accessToken,
              },
            }
          )
          .then((res) => {
            setFavorite(res.data.content);
            console.log('21', res);
          });
        break;
      default:
    } //FIXME 정렬이 이상함

    if (auth.accessToken === null) {
      navigate('/login', { replace: true });
    }
  }, [auth.accessToken, navigate, select, nickname]);

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
                favorite &&
                favorite.map((item, index) => <div key="index">{item.title}</div>)}
              {console.log(select)}
            </div>
          </section>
        </main>
      ) : null}
    </>
  );
};

export default Mypage;
