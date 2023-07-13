import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (message, text) => {
  //NOTE message에 error, info, success, warning 가능, 예시는 Regist.js
  toast[message](text, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export { showToast };
