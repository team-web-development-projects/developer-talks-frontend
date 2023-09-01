import axios from "axios";
import Button from "components/button/Button";
import CkEditor from "components/ckeditor/CkEditor";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalFrame from "../ModalFrame";
import { postInStudyRoomBoard } from "api/studyroom";

const InStudyRoomPostModal = ({ setOnModal, postId, boardId, type }) => {
  const [selectedOption, setSelectedOption] = useState("NORMAL");
  const [boardDetail, setBoardDetail] = useState();
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    // await new Promise((r) => setTimeout(r, 1000));
    e.preventDefault();
    if (form.title.trim() === "") {
      toast.error("제목을 입력해주세요.");
      return;
    }
    if (form.content.trim() === "") {
      toast.error("내용을 입력해주세요.");
      return;
    }

    const data = postInStudyRoomBoard(postId, form);
    data
      .then((res) => {
        setOnModal("false");
        queryClient.invalidateQueries(["getInStudyRoomPost"]);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (type === "detail") {
      axios
        .get(`${ROOT_API}/study-rooms/posts/${postId}/${boardId}`, {
          headers: {
            "X-AUTH-TOKEN": auth.accessToken,
          },
        })
        .then((res) => {
          console.log("상세정보", res.data);
          setBoardDetail(res.data);
        });
    }
  }, [type]);

  return (
    <ModalFrame setOnModal={setOnModal} onClose isDim classname="basic-modal">
      {type === "post" && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={form.title}
            placeholder="제목을 작성해주세요."
            onChange={handleChange}
          />
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="NOTICE">공지</option>
            <option value="NORMAL">일반글</option>
          </select>
          <CkEditor form={form} setForm={setForm} placeholder={"내용을 입력해주세요."} />
          <Button size="small">저장</Button>
        </form>
      )}
      {type === "detail" && boardDetail && (
        <>
          {parseJwt(auth.accessToken).nickname === boardDetail.writer && (
            <div className={s.btn_wrap}>
              <Button size="small">수정</Button>
              <Button size="small" theme="cancle">
                삭제
              </Button>
            </div>
          )}
          <div>
            <div>제목: {boardDetail.title}</div>
            <div>작성자: {boardDetail.writer}</div>
            <div>작성일: {boardDetail.title}</div>
            <div>내용: {boardDetail.content}</div>
          </div>
        </>
      )}
    </ModalFrame>
  );
};

export default InStudyRoomPostModal;
