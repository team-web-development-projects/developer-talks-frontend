import Button from "components/button/Button";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import s from "../boardPost/boardPost.module.scss";
import CkEditor from "components/ckeditor/CkEditor";
import axios from "axios";
import { ROOT_API } from "constants/api";

const BoardUpdate = ({ type }) => {
  const [modalY, setModalY] = useState(false);
  const [modalN, setModalN] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { state } = useLocation();
  const auth = useSelector((state) => state.authToken);
  const [form, setForm] = useState({
    title: state.title,
    content: state.content,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    axios
      .put(
        `${ROOT_API}/post/${postId}`,
        {
          title: form.title,
          content: form.content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": auth.accessToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setModalY(true);
      })
      .catch((error) => console.log(error));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <>
      {modalY && (
        <BasicModal setOnModal={() => setModalY()}>
          게시글이 정상적으로 수정되었습니다.
          <br />
          확인을 눌러주세요.
          <button onClick={() => navigate(-1)}>확인</button>
        </BasicModal>
      )}
      {modalN && (
        <BasicModal setOnModal={() => setModalY()}>
          글 수정을 취소하시겠습니까?
          <br />
          수정된 내용은 저장되지 않습니다.
          <button onClick={() => navigate(-1)}>확인</button>
        </BasicModal>
      )}
      <form onSubmit={handleSubmit}>
        <div className={s.container}>
          <input
            className={s.title}
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <div className={s.editor}>
            {/* TODO: CKEditor 이텔릭체 안먹힘 등의 이슈 해결하기 */}
            <CkEditor form={form} setForm={setForm} />
          </div>
          <div className={s.btnRgn}>
            <div className={s.cancel} onClick={()=>setModalN(true)}>취소</div>
            <Button>수정</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default BoardUpdate;
