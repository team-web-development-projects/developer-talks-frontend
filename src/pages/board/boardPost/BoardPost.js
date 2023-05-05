import Button from "components/button/Button";
import CkEditor from "components/ckeditor/CkEditor";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from "./boardPost.module.scss";
import axios from "axios";
import { ROOT_API } from "constants/api";

export default function BoardPost() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const handleSubmit = async (e) => {
    // console.log(`
    //         제목: ${form.title}
    //         내용: ${form.content}
    //     `);
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    axios
      .post(
        `${ROOT_API}/post`,
        {
          title: form.title,
          content: form.content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        setModal(true);
      })
      .catch((error) => console.log(error));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <>
      {modal && (
        <BasicModal setOnModal={() => setModal()}>
          게시글이 정상적으로 등록되었습니다. <br />
          확인을 눌러주세요.
          <button onClick={() => navigate("/board/list")}>확인</button>
        </BasicModal>
      )}
      {/* TODO: 시연님이 만든 헤더 컴포넌트 사용하기 */}
      <form onSubmit={handleSubmit}>
        <div className={s.container}>
          <input
            className={s.title}
            type="text"
            name="title"
            value={form.title}
            placeholder="제목을 작성해주세요."
            onChange={handleChange}
          />
          <div className={s.editor}>
            {/* TODO: CKEditor 이텔릭체 안먹힘 등의 이슈 해결하기 */}
            <CkEditor form={form} setForm={setForm} />
          </div>
          <div className={s.btnRgn}>
            <Link to="/board/list" className={s.cancel}>
              취소
            </Link>
            <Button>저장</Button>
          </div>
        </div>
      </form>
    </>
  );
}
