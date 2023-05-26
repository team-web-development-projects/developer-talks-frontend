import React from "react";
import s from "./boardCount.module.scss";
import Button from "components/button/Button";
import { useState } from "react";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ROOT_API } from "constants/api";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";

const BoardCount = ({
  type,
  children,
  token,
  isOwner,
  checkStatus,
  setCheckStatus,
  postId,
  cnt,
}) => {
  const navigate = useNavigate();
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
  useEffect(() => {}, []);

  const handleClick = async () => {
    console.log(checkStatus);
    if (token === null) {
      setModalL(true);
    } else if (!isOwner) {
      console.log("본인글 추천 및 즐겨찾기 불가");
      setModalS(true);
    } else {
      if (
        type === "favorite" ? !checkStatus.favorite : !checkStatus.recommend
      ) {
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
          .then(() => {
            setCheckStatus({ ...checkStatus, [type]: true });
          })
          .catch((error) => console.log(error));
        // console.log(handleCount);
        // handleCount.mutate();
      } else {
        type === "favorite" ? setModalF(true) : setModalR(true);
      }
    }
  };
  const handleClickCancle = async (type) => {
    await new Promise((r) => setTimeout(r, 1000));
    axios
      .delete(`${ROOT_API}/post/${type}/${postId}`, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      })
      .then(() => {
        setCheckStatus({ ...checkStatus, [type]: false });
        navigate(-1);
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
          <button onClick={() => handleClickCancle("favorite")}>확인</button>
          <br />
        </BasicModal>
      )}
      {modalR && (
        <BasicModal setOnModal={() => setModalR()}>
          추천을 취소하시겠습니까?
          <br />
          <button onClick={() => handleClickCancle("recommend")}>확인</button>
          <br />
        </BasicModal>
      )}
      <Button classname={s.btn} onClick={() => handleClick(type)}>
        {children}
        <p>{cnt}</p>
      </Button>
    </>
  );
};

export default BoardCount;
