import React from "react";
import ModalFrame from "../ModalFrame";
import "./studyroomsettingmodal.scss";
import { useMutation, useQueryClient } from "react-query";
import { ROOT_API } from "constants/api";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BasicModal from "../basicmodal/BasicModal";
import CkEditor from "components/ckeditor/CkEditor";
import classnames from "classnames";
import Button from "components/button/Button";

const StudyRoomSettingModal = ({ setOnModal, id, data, setGetData }) => {
  const auth = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const [modals, setModals] = useState(false);
  const [indata, setIndata] = useState(data);

  const tags = ["DJANGO", "SPRING", "JAVASCRIPT", "JAVA", "PYTHON", "CPP", "REACT", "AWS"];

  const deleteRoom = () => {
    axios
      .delete(`${ROOT_API}/study-room/${data.id}`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then(() => {
        setModals(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));

    axios
      .put(
        `${ROOT_API}/study-room/${id}`,
        {
          title: indata.title,
          content: indata.content,
          skills: [...indata.skills],
          autoJoin: indata.autoJoin,
          joinableCount: indata.joinableCount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": auth.accessToken,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        alert("수정되었습니다");
        setGetData(response.data);
      })
      .catch((error) => console.log(error));
  };

  const clickTag = (tag) => {
    console.log('get', tag);
    if (indata.skills.includes(tag)) {
      setIndata({
        ...indata,
        skills: indata.skills.filter((indata) => indata !== tag),
      });
    } else {
      setIndata({
        ...indata,
        skills: [...indata.skills, tag],
      });
    }
  };

  console.log('tags', indata.skills);

  const handleTitle = (e) => {
    const title = e.target.value;
    setIndata({ ...indata, title: title });
  };

  const clickautoJoin = (value) => {
    setIndata({
      ...indata,
      autoJoin: !value,
    });
  };

  const chnageJoinableCount = (e) => {
    const newValue = e.target.value;
    if (newValue <= 100) {
      setIndata({
        ...indata,
        joinableCount: newValue,
      });
    }
  };

  return (
    <>
      {modals && (
        <BasicModal setOnModal={() => setModals()} isDim={false}>
          정말 삭제할까요??
          <br />
          <button
            onClick={() => {
              deleteRoom();
              navigate("/studyroom/");
            }}
          >
            네
          </button>
          <br />
          <button onClick={() => setModals(false)}>아니오</button>
        </BasicModal>
      )}
      <ModalFrame setOnModal={setOnModal} classname="basic-modal studyroom-setting-modal" onClose isDim>
        <div>수정</div>
        <form onSubmit={handleSubmit}>
          <div className="seetring-title">
            제목
            <input type="text" name="title" value={indata.title} onChange={handleTitle} />
          </div>
          <div>
            <label htmlFor="chk">
              <span>참여 제한</span>
              <input
                type="checkbox"
                name="chk"
                id="chk"
                checked={!indata.autoJoin}
                onChange={() => clickautoJoin(indata.autoJoin)}
              />
            </label>
          </div>
          <div className="joinableCount">
            참여인원 수
            <input
              type="number"
              name=""
              id=""
              min="0"
              max="100"
              value={indata.joinableCount}
              onChange={chnageJoinableCount}
              placeholder="100명까지 가능합니다"
            />
          </div>
          <div className="tags">
            {tags.map((item, index) => (
              <span
                key={index}
                onClick={() => clickTag(item)}
                className={classnames("tag", {
                  "is-select": indata.skills.includes(item),
                })}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="content">
            <CkEditor form={indata} setForm={setIndata} placeholder={"내용을 입력해주세요."} />
          </div>
        </form>
        <Button size="small" type="submit" onClick={handleSubmit}>
          저장
        </Button>
        <Button size="small" type="cancle" onClick={() => setModals(true)}>
          삭제
        </Button>
      </ModalFrame>
    </>
  );
};

export default StudyRoomSettingModal;
