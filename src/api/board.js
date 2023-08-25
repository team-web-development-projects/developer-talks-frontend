import axios from "axios";
import { ROOT_API } from "constants/api";
import { useGetAuth } from "hooks/useAuth";
import { useSelector } from "react-redux";

const getBoardList = async () => {
  // const auth = useSelector((state) => state.authToken);
  // const { data } = await axios.get(`${ROOT_API}/${type}/all`, {
  //   params: { page: currentPage - 1, size: 10, sort: selectText },
  //   headers: {
  //     "Content-Type": "application/json",
  //     "X-AUTH-TOKEN": useGetAuth(),
  //   },
  // });
  // return data;
};


export default getBoardList