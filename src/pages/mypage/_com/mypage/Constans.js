import { Link } from "react-router-dom";
import types from "./mypage.module.scss";

export const MyActivity = (item) => {
  switch (item.type) {
    case "STUDY_CREATE":
      return (
        <Link className={types.text_wrap} to={`/studyroom/${item.id}`}>
          <div className={types.title}>
            <div>
              <span>스터디룸</span>을 생성하였습니다.
            </div>
            <div>{item.createDate}</div>
          </div>
          <div className={types.content}>{item.title}</div>
        </Link>
      );
    case "POST":
      return (
        <Link className={types.text_wrap} to={`/board/${item.id}`}>
          <div className={types.title}>
            <div>
              <span>게시글</span>을 생성하였습니다.
            </div>
            <div>{item.createDate}</div>
          </div>
          <div className={types.content}>{item.title}</div>
        </Link>
      );
    case "COMMENT":
      return (
        <Link className={types.text_wrap}>
          <div className={types.title}>
            <div>
              <span>{item.writer}</span>님의 글에 <span>댓글</span>을 달았습니다.
            </div>
            <div>{item.createDate}</div>
          </div>
          <div className={types.content}>{item.title}</div>
        </Link>
      );
    default:
      break;
  }
};

export const MyPost = (item) => {
  return (
    <Link className={types.text_wrap} to={`/board/${item.id}`}>
      <div className={types.title}>
        <div>
          <span>게시글</span>을 작성하였습니다.
        </div>
        <div>{item.createDate}</div>
      </div>
      <div className={types.content}>{item.title}</div>
    </Link>
  );
};

export const MyReply = (item) => {
  return (
    <Link className={types.text_wrap}>
      <div className={types.title}>
        <div>
          <span>{item.postTitle}</span>에 <span>댓글</span>을 작성하였습니다.
        </div>
        <div>{item.createDate}</div>
      </div>
      <div className={types.content}>
        {item.content}
        <span>{item.secret && "비밀글"}</span>
      </div>
    </Link>
  );
};

export const MyScrab = (item) => {
  return (
    <Link className={types.text_wrap} to={`/board/${item.id}`}>
      <div className={types.title}>
        <div>
          <span>{item.postTitle}</span> <span>게시글</span>을 스크랩하였습니다.
        </div>
        <div>{item.createDate}</div>
      </div>
      <div className={types.content}>
        {item.title}
        <span className={types.img_wrap}>
          <img src={item.thumbnailUrl} alt="썸네일" />
        </span>
      </div>
    </Link>
  );
};
