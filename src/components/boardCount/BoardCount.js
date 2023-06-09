import axios from "axios";
import Button from "components/button/Button";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { ROOT_API } from "constants/api";
import { useState } from "react";
import { Link } from "react-router-dom";
import s from "./boardCount.module.scss";

const BoardCount = ({
  type,
  children,
  token,
  isOwner,
  checkStatus,
  setCheckStatus,
  postId,
  setPost,
}) => {
  const isFavorite = type === "favorite";
  const [modalL, setModalL] = useState(false);
  const [modalS, setModalS] = useState(false);
  const [modalF, setModalF] = useState(false);
  const [modalR, setModalR] = useState(false);
  // async function postCount() {
  //   await axios.post(
  //     `${ROOT_API}/post/${type}/${postId}`,
  //     {},
  //     {
  //       headers: {
  //         "X-AUTH-TOKEN": token,
  //       },
  //     }
  //   );
  // }
  // async function deleteCount() {
  //   await axios.delete(`${ROOT_API}/post/${type}/${postId}`, {
  //     params: {},
  //     headers: {
  //       "X-AUTH-TOKEN": token,
  //     },
  //   });
  // }
  // const handleCount = useMutation(postCount, {
  //   onSuccess: () => {
  //     console.log("post success");
  //     setCheckStatus({ ...checkStatus, [type]: true });
  //   },
  //   onError: () => {
  //     console.log("error");
  //   },
  // });

  const handleClick = async () => {
    console.log("isFavorite: ", isFavorite);
    if (token === null) {
      setModalL(true);
    } else if (isOwner) {
      console.log("본인글 추천 및 즐겨찾기 불가");
      setModalS(true);
    } else {
      if (isFavorite ? !checkStatus.favorite : !checkStatus.recommend) {
        await new Promise((r) => setTimeout(r, 1000));
        axios
          .post(
            `${ROOT_API}/post/${type}/${postId}`,
            {
              //요청데이터
            },
            {
              headers: {
                "X-AUTH-TOKEN": token,
              },
            }
          )
          .then(({ data }) => {
            setCheckStatus({ ...checkStatus, [type]: true });
            isFavorite
              ? setPost((prev) => {
                  return { ...prev, favoriteCount: data };
                })
              : setPost((prev) => {
                  return { ...prev, recommendCount: data };
                });
          })
          .catch((error) => console.log(error));
        // console.log(handleCount);
        // handleCount.mutate();
      } else {
        isFavorite ? setModalF(true) : setModalR(true);
      }
    }
  };
  const handleClickCancle = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    axios
      .delete(`${ROOT_API}/post/${type}/${postId}`, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      })
      .then(({ data }) => {
        setCheckStatus({ ...checkStatus, [type]: false });
        if (isFavorite) {
          setPost((prev) => {
            return { ...prev, favoriteCount: data };
          });
          setModalF(false);
        } else {
          setPost((prev) => {
            return { ...prev, recommendCount: data };
          });
          setModalR(false);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      {modalL && (
        <BasicModal setOnModal={() => setModalL()}>
          로그인한 사용자만 이용할 수 있어요☺️
          <br />
          <Link to="/login">[로그인 하러 가기]</Link>
          <br />
        </BasicModal>
      )}
      {modalS && (
        <BasicModal setOnModal={() => setModalS()}>
          본인이 작성한 글은 즐겨찾기 및 추천을 할 수 없어요🥲
          <br />
        </BasicModal>
      )}
      {modalF && (
        <BasicModal setOnModal={() => setModalF()}>
          즐겨찾기를 취소하시겠습니까?
          <br />
          <button onClick={handleClickCancle}>확인</button>
          <br />
        </BasicModal>
      )}
      {modalR && (
        <BasicModal setOnModal={() => setModalR()}>
          추천을 취소하시겠습니까?
          <br />
          <button onClick={handleClickCancle}>확인</button>
          <br />
        </BasicModal>
      )}
      <Button classname={s.btn} onClick={() => handleClick(type)}>
        {children}
      </Button>
    </>
  );
};

export default BoardCount;
