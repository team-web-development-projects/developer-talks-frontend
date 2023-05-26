import React from "react";
import { useParams } from "react-router-dom";
import "./studyroomdetail.scss";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { ROOT_API } from "constants/api";

const StudyRoomDetqil = () => {
  const { postId } = useParams();
  const auth = useSelector((state) => state.authToken);
  // const socket = io("https://dtalks-api.site", {
  //   cors: {
  //     origin: "*",
  //   },
  // });

  // socket.on("test", (socket) => {
  //   console.log(socket);
  // });

  const handleRequestSocket = () => {
    // socket.emit("test", {
    //   data: "test socket on client",
    // });
  };

  function handleChange() {
    console.log("change handle");
  }

  useEffect(() => {
    axios
      .get(
        `${ROOT_API}/study-room/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": auth.accessToken,
          },
        }
      )
      .then(function (response) {
        console.log("로그인 성공:", response);
      })
      .catch(function (error) {
        console.log("로그인 실패: ", error.response);
      });
  }, [auth.accessToken, postId]);

  return (
    <div className="room-detail">
      <div>설정</div>
      <div className="menu">
        <div className="left-menu">
          <ul>
            <li>채팅룸1</li>
            <li>채팅룸2</li>
          </ul>
        </div>
        <div className="content">
          컨텐츠 test socket connection
          <button onClick={handleRequestSocket}>Request</button>
          <input type="text" onChange={handleChange} />
        </div>
        <div className="right-menu">
          <ul>
            <li>게시판1</li>
            <li>게시판2</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudyRoomDetqil;
