import axios from "axios";
import Button from "components/button/Button";
import CkEditor from "components/ckeditor/CkEditor";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import s from "./boardPost.module.scss";

export default function BoardPost({ type }) {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authToken);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [getType, setGetType] = useState();

  useEffect(() => {
    switch (type) {
      case "post":
        setGetType("board");
        break;
      case "questions":
        setGetType("qna");
        break;
      default:
        setGetType("");
    }
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    console.log(`
            제목: ${form.title}
            내용: ${form.content}
        `);

    console.log('post auth', auth.accessToken);
    axios
      .post(
        `${ROOT_API}/${type}`,
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
        <BasicModal
          setOnModal={() => setModal()}
          dimClick={() => navigate(`/${getType}/list`)}
        >
          게시글이 정상적으로 등록되었습니다. <br />
          확인을 눌러주세요.
          <button onClick={() => navigate(`/${getType}/list`)}>확인</button>
        </BasicModal>
      )}
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
            <CkEditor
              form={form}
              setForm={setForm}
              placeholder={"내용을 입력해주세요."}
            />
          </div>
          <div className={s.btnRgn}>
            <Link to="/board" className={s.cancel}>
              취소
            </Link>
            <Button>저장</Button>
          </div>
        </div>
      </form>
    </>
  );
}
