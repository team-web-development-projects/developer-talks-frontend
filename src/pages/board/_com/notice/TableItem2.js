import "../../main/main.scss";

const TableItem2 = ({ data }) => {

    return (
        <li className="flex">
            <div className="w">
                <p className="text">{data.title}</p>
            </div>
            <div className="w">
                <p className="text">{data.content}</p>
            </div>
            <div className="w">
                <p className="text">{data.writer}</p>
            </div>
            <div className="w">
                <p className="text">{data.modifiedDate}</p>
            </div>
            <div className="w">
                <p className="text">{data.viewCount}</p>
            </div>
        </li>
    );
};

export default TableItem2;
