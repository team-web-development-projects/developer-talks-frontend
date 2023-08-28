import { deleteMessage, getMessage } from "api/user";
import Button from "components/button/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { boardDay } from "util/day";
import s from "./messagelist.module.scss";

const MessageInputBox = ({ type }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getMessageList", type],
    queryFn: () => getMessage(type),
  });

  const deleteMessageMutation = useMutation((id) => deleteMessage(type, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getMessageList"]);
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  const clickDeleteMessage = (id) => {
    deleteMessageMutation.mutate(id);
  };

  console.log('dd', type, data)

  return (
    <div className={s.message_box}>
      <ul className={s.message_list}>
        {data && data.length > 0 ? (
          data.map((item) => (
            <li key={item.id} className={s.messagelist}>
              <div className={s.messageitem}>
                <div className={s.flex}>
                  <span className={s.sender}>{item.receiverNickname}</span>{" "}
                  <span className={s.timestamp}>{boardDay(item.createDate)}</span>
                  <div className={s.content}>
                    <p>{item.text}</p>
                  </div>
                </div>
                <Button onClick={() => clickDeleteMessage(item.id)} size="small" theme="cancle">
                  삭제
                </Button>
              </div>
            </li>
          ))
        ) : (
          <li>받은 쪽지가 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default MessageInputBox;
