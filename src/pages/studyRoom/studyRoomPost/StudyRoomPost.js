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
import classNames from "classnames";

const StudyRoomPost = ({ type }) => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authToken);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [selectedTags, setSelectedTags] = useState({
    tags: [],
    authJoin: true,
    joinableCount: 1,
  });

  const tags = [
    "DJANGO",
    "SPRING",
    "JAVASCRIPT",
    "JAVA",
    "PYTHON",
    "CPP",
    "REACT",
    "AWS",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    console.log(
      `title: ${form.title}
        content: ${form.content}
        skills: ${selectedTags.tags}
        autoJoin: ${selectedTags.authJoin}
        joinableCount: ${selectedTags.joinableCount}
      `
    );
    axios
      .post(
        `${ROOT_API}/study-room`,
        {
          title: form.title,
          content: form.content,
          skills: selectedTags.tags,
          autoJoin: selectedTags.authJoin,
          joinableCount: selectedTags.joinableCount,
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

  const clickTag = (tag) => {
    if (selectedTags.tags.includes(tag)) {
      setSelectedTags({
        ...selectedTags,
        tags: selectedTags.tags.filter((selectedTag) => selectedTag !== tag),
      });
    } else {
      setSelectedTags({
        ...selectedTags,
        tags: [...selectedTags.tags, tag],
      });
    }
    console.log('dd', selectedTags.tags, typeof(selectedTags.tags))
  };

  const clickauthJoin = () => {
    setSelectedTags({
      ...selectedTags,
      authJoin: !selectedTags.authJoin,
    });
  };

  const handleTitle = (e) => {
    const title = e.target.value;
    setForm({ ...form, title: title });
  };

  const chnageJoinableCount = (e) => {
    const newValue = e.target.value;
    if (newValue <= 100) {
      setSelectedTags({
        ...selectedTags,
        joinableCount: newValue,
      });
    }
  };

  return (
    <>
      {modal && (
        <BasicModal
          setOnModal={() => setModal()}
          dimClick={() => navigate(`/studyroom`)}
        >
          게시글이 정상적으로 등록되었습니다. <br />
          확인을 눌러주세요.
          <button onClick={() => navigate(`/studyroom`)}>확인</button>
        </BasicModal>
      )}
      <div className="board-page">
        <form onSubmit={handleSubmit}>
          <div className={s.container}>
            <input
              className={s.title}
              type="text"
              name="title"
              value={form.title}
              placeholder="제목을 작성해주세요."
              onChange={handleTitle}
            />
            <div className={s.control_wrap}>
              <div>
                <label htmlFor="chk">
                  <span>참여 제한</span>
                  <input
                    type="checkbox"
                    name="chk"
                    id="chk"
                    onChange={clickauthJoin}
                  />
                </label>
              </div>
              <div>
                <span>참여인원 수</span>
                <input
                  type="number"
                  name=""
                  id=""
                  min="0"
                  max="100"
                  value={selectedTags.joinableCount}
                  onChange={chnageJoinableCount}
                  placeholder="100명까지 가능합니다"
                />
              </div>
            </div>
            <div className={s.tags}>
              태그 선택
              {tags.map((item, index) => (
                <span
                  key={index}
                  onClick={() => clickTag(item)}
                  className={`tag ${
                    selectedTags.tags.includes(item) ? [s.is_select] : ""
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className={s.editor}>
              {/* TODO: CKEditor 이텔릭체 안먹힘 등의 이슈 해결하기 */}
              <CkEditor
                form={form}
                setForm={setForm}
                placeholder={"내용을 입력해주세요."}
              />
            </div>
            <div className={s.btnRgn}>
              <Link to="/studyroom" className={s.cancel}>
                취소
              </Link>
              <Button>저장</Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudyRoomPost;
