import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { SET_PAGING } from "store/PagiNation";
import s from "./pagination.module.scss";

const Pagination = ({ totalPage, name }) => {
  const pageNumber = useSelector((state) => state.paginationStore);
  const dispatch = useDispatch();

  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className={s.container}>
        {pageNumbers.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              dispatch(SET_PAGING({ name, item }));
              // console.log("클릭", pageNumber[name]);
            }}
            className={classnames("", {
              [s.is_select]: item === pageNumber[name].item,
            })}
          >
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Pagination;
