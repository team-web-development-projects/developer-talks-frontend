import { useEffect } from "react";

// 드롭다운 같은 ui에서 바깥 클릭시 닫히게 하기
// https://designcode.io/react-hooks-handbook-useonclickoutside-hook
export function useOutOfClick(targetRef, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!targetRef.current || targetRef.current.contains(event.target)) {
        //현재선택된게없어도 선택된게있어도 return

        return;
        // console.log('다름');
      }
      handler();
      // console.log('같음');
      // return false;
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [targetRef, handler]);
}
