import { Link } from "react-router-dom";
import types from "./userinfolist.module.scss";
import { useMemo } from "react";
import { HashLink } from "react-router-hash-link";

// import { TAB_ROUTER } from "store/PageRouter";
// import { useDispatch } from "react-redux";

export const MyActivity = (item) => {
  // const dispatch = useDispatch();
  // /studyroom/${item.id}
  switch (item.type) {
    case "QUESTION":
      return (
        <HashLink className={types.text_wrap} to={`/questions/${item.id}`}>
          <div className={types.title}>
            <div>
              <span>질문글</span>을 생성하였습니다.
            </div>
            <div>{item.createDate}</div>
          </div>
          <div className={types.content}>{item.title}</div>
        </HashLink>
      );
    case "ANSWER":
      return (
        <HashLink
          className={types.text_wrap}
          scroll={(el) => el.scrollIntoView({ behavior: "auto", block: "end" })}
          to={`/questions/${item.id}/#${item.subId}`}
        >
          <div className={types.title}>
            <div>
              <span>{item.writer}</span>님의 <span>질문</span>글에 <span>댓글</span>을 달았습니다.
            </div>
            <div>{item.createDate}</div>
          </div>
          <div className={types.content}>{item.title}</div>
        </HashLink>
      );
    case "STUDY_CREATE":
      return (
        <HashLink className={types.text_wrap} to={`/study-rooms/${item.id}`}>
          <div className={types.title}>
            <div>
              <span>스터디룸</span>을 생성하였습니다.
            </div>
            <div>{item.createDate}</div>
          </div>
          <div className={types.content}>{item.title}</div>
        </HashLink>
      );
    case "POST":
      return (
        <HashLink className={types.text_wrap} to={`/post/${item.id}`}>
          <div className={types.title}>
            <div>
              <span>게시글</span>을 생성하였습니다.
            </div>
            <div>{item.createDate}</div>
          </div>
          <div className={types.content}>{item.title}</div>
        </HashLink>
      );
    case "COMMENT":
      return (
        <HashLink className={types.text_wrap} to={`/post/${item.id}/#${item.subId}`}>
          <div className={types.title}>
            <div>
              <span>{item.writer}</span>님의 <span>게시글</span>에 <span>댓글</span>을 달았습니다.
            </div>
            <div>{item.createDate}</div>
          </div>
          <div className={types.content}>{item.title}</div>
        </HashLink>
      );
    default:
      break;
  }
};

export const MyPost = (item) => {
  return (
    <HashLink className={types.text_wrap} to={`/post/${item.id}`}>
      <div className={types.title}>
        <div>
          <span>게시글</span>을 작성하였습니다.
        </div>
        <div>{item.createDate}</div>
      </div>
      <div className={types.content}>{item.title}</div>
    </HashLink>
  );
};

export const MyReply = (item) => {
  return (
    <HashLink className={types.text_wrap} to={`/post/${item.id}/#${item.postId}`}>
      <div className={types.title}>
        <div>
          <span>{item.postTitle}</span>에 <span>댓글</span>을 작성하였습니다.
        </div>
        <div>{item.createDate}</div>
      </div>
      <div className={types.content}>
        <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
        <span className={types.secret}>{item.secret && "비밀글"}</span>
      </div>
    </HashLink>
  );
};

export const MyScrab = (item) => {
  return (
    <HashLink className={types.text_wrap} to={`/post/${item.id}`}>
      <div className={types.title}>
        <div>
          <span>{item.postTitle}</span> <span>게시글</span>을 스크랩하였습니다.
        </div>
        <div>{item.createDate}</div>
      </div>
      <div className={types.content}>
        {item.title}
        <span className={types.img_wrap}>
          {item.thumbnailUrl !== null && <img src={item.thumbnailUrl} alt="썸네일" />}
        </span>
      </div>
    </HashLink>
  );
};
