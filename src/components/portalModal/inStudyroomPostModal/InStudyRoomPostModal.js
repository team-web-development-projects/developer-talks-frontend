import axios from "axios";
import Button from "components/button/Button";
import CkEditor from "components/ckeditor/CkEditor";
import { ROOT_API } from "constants/api";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalFrame from "../ModalFrame";
import { postInStudyRoomBoard } from "api/studyroom";

const InStudyRoomPostModal = ({ setOnModal, postId, type }) => {
  const [selectedOption, setSelectedOption] = useState("NORMAL"); // 기본 선택 값을 설정합니다
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
      {type === "detail" && <>detail</>}
    </ModalFrame>
  );
};

export default InStudyRoomPostModal;
