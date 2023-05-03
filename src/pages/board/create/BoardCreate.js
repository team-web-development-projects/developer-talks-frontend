import ButtonBlack from "components/buttonBlack/ButtonBlack";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from "./boardCreate.module.scss";
import CkEditor from "components/ckeditor/CkEditor";

export default function BoardCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const handleSubmit = () => {
    console.log(`
            제목: ${form.title}
            내용: ${form.content}
        `);
    // TODO: 백엔드 통신: post
    navigate("/board/main");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <>
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
            <Link to="/board/main" className={s.cancel}>
              취소
            </Link>
            <ButtonBlack name="저장" />
          </div>
        </div>
      </form>
    </>
  );
}
