import axios from "axios";
import Button from "components/button/Button";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { ROOT_API } from "constants/api";
import { useState } from "react";
import { Link } from "react-router-dom";
import s from "./boardCount.module.scss";
// Q&A api명 scrap에서 favorite으로 변경해줘야 에러 안남
const BoardCount = ({ ttype, type, children, token, isOwner, checkStatus, setCheckStatus, postId, setPost }) => {
  const isFavorite = type === "favorite";
  const checkButton= isFavorite ? checkStatus.favorite : checkStatus.recommend;
  const [modalL, setModalL] = useState(false);
  const [modalS, setModalS] = useState(false);

  const handleClick = async () => {
    console.log("isFavorite: ", isFavorite);
    if (token === null) {
      setModalL(true);
    } else if (isOwner) {
      console.log("본인글 추천 및 즐겨찾기 불가");
      setModalS(true);
    } else {
      if (isFavorite ? !checkStatus.favorite : !checkStatus.recommend) {
        axios
          .post(
            `${ROOT_API}/${ttype}/${type}/${postId}`,
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
      } else {
        handleClickCancle();
      }
    }
  };
  const handleClickCancle = async () => {
    axios
      .delete(`${ROOT_API}/${ttype}/${type}/${postId}`, {
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
        } else {
          setPost((prev) => {
            return { ...prev, recommendCount: data };
          });
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
      <Button
        theme="outline"
        color={checkButton ? "#063eff" : "#9ca3af"}
        size="medium"
        onClick={() => handleClick(type)}
      >
        {children}
      </Button>
    </>
  );
};

export default BoardCount;
