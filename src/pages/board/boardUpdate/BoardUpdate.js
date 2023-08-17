import axios from "axios";
import Button from "components/button/Button";
import CkEditor from "components/ckeditor/CkEditor";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { ROOT_API } from "constants/api";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import s from "../boardPost/boardPost.module.scss";

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
    userInfo: {},
    files: [],
    imgUrls: state.imgUrls,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.title.trim() === "") {
      toast.error("제목을 입력해주세요.");
      return;
    }
    if (form.content.trim() === "") {
      toast.error("내용을 입력해주세요.");
      return;
    }
    await new Promise((r) => setTimeout(r, 1000));
    form.content = form.content.replace(/<img src=[^>]*>/g, "<img>");
    const frm = new FormData();
    if (form.files.length !== 0) {
      form.files.forEach((file) => {
        frm.append("files", file);
      });
    }
    frm.append("title", form.title);
    frm.append("content", form.content);
    if (form.imgUrls.length !== 0) {
      frm.append("imgUrls", form.imgUrls);
    }

    axios
      .put(`${ROOT_API}/${type}/${postId}`, frm, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
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
          <input className={s.title} type="text" name="title" value={form.title} onChange={handleChange} />
          <div className={s.editor}>
            {/* TODO: CKEditor 이텔릭체 안먹힘 등의 이슈 해결하기 */}
            <CkEditor form={form} setForm={setForm} />
          </div>
          <div className={s.btnRgn}>
            <div className={s.cancel} onClick={() => setModalN(true)}>
              취소
            </div>
            <Button>수정</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default BoardUpdate;
