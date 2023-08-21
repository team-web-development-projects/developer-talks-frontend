import axios from "axios";
import Button from "components/button/Button";
import CkEditor from "components/ckeditor/CkEditor";
import { ROOT_API } from "constants/api";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalFrame from "../ModalFrame";

const InStudyRoomPostModal = ({ setOnModal, postId, type }) => {
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: "",
    content: "",
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
    axios
      .post(
        `${ROOT_API}/study-rooms/posts/${postId}`,
        {
          title: form.title,
          content: form.content,
          category: "NORMAL",
        },
        {
          headers: {
            "X-AUTH-TOKEN": auth.accessToken,
          },
        }
      )
      .then((res) => {
        setOnModal("false");
        console.log("res", res);
        queryClient.invalidateQueries(["getInStudyRoomPost"]);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
          <div>
            <CkEditor form={form} setForm={setForm} placeholder={"내용을 입력해주세요."} />
          </div>
          <Button>저장</Button>
        </form>
      )}
      {
        type === 'detail' && <>detail</>
      }
    </ModalFrame>
  );
};

export default InStudyRoomPostModal;
