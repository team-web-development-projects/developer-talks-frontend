import axios from "axios";
import Button from "components/button/Button";
import CkEditor from "components/ckeditor/CkEditor";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import s from "./studyRoom.module.scss";
import Select from "components/select/Select";

const StudyRoomPost = ({ type }) => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authToken);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    axios
      .post(
        `${ROOT_API}/study-room`,
        {
          title: form.title,
          content: form.content,
          // skills:
          autoJoin: true,
          joinableCount: 1,
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
          dimClick={() => navigate(`/${type}/list`)}
        >
          게시글이 정상적으로 등록되었습니다. <br />
          확인을 눌러주세요.
          <button onClick={() => navigate(`/${type}/list`)}>확인</button>
        </BasicModal>
      )}
      <form onSubmit={handleSubmit}>
        <div className={s.control_wrap}>
          태그 설정:
          <Select init="DJANGO" options={["DJANGO", "react"]} />
          <div>
            <span>참여 제한</span>
            <Select init="바로 참여" options={["바로 참여", "수락 참여"]} />
          </div>
          <div>
            <span>참여인원 수</span>
            <input type="number" name="" id="" />
          </div>
        </div>
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
            <Link to="/board/list" className={s.cancel}>
              취소
            </Link>
            <Button>저장</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default StudyRoomPost;
