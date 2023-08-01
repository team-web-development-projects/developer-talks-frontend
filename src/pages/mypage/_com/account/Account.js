import axios from "axios";
import Button from "components/button/Button";
import Form from "components/form/Form";
import Label from "components/label/Label";
import LineStyle from "components/lineStyle/LineStyle";
import Private from "components/private/Private";
import Table from "components/table/Table";
import { showToast } from "components/toast/showToast";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import Description from "pages/mypage/_com_Account/Description";
import Email from "pages/mypage/_com_Account/Email";
import Nickname from "pages/mypage/_com_Account/Nickname";
import Password from "pages/mypage/_com_Account/Password";
import Userid from "pages/mypage/_com_Account/Uerid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import s from "../../mypagecontent.module.scss";
import account from "./account.module.scss";
import { useDeleteUser } from "hooks/useDeleteUser";

function Account() {
  const auth = useSelector((state) => state.authToken);
  const provider = parseJwt(auth.accessToken).provider;
  const navigate = useNavigate();

  let disabled;
  if (provider) {
    disabled = true;
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const tabTitle = ["회원정보 수정", "회원 탈퇴"];
  const [select, setSelect] = useState(0);
  const [userData, setUserData] = useState(""); //유저데이터 가져오기
  const onSelect = (type) => {
    setSelect(type);
  };
  const [selectedTags, setSelectedTags] = useState({
    tags: [],
    authJoin: true,
    joinableCount: 1,
  });

  const handleChange = (e) => {
    console.log(userData.userid);
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`${ROOT_API}/users/info`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then(({ data }) => {
        setUserData(data);
        setSelectedTags({ ...selectedTags, tags: data.skills });
      });
  }, [auth.accessToken]);

  const { mutate: DeleteUser } = useDeleteUser(navigate, watch().password, auth.accessToken);
//요청 URL 수정 필요
  const onSubmits = (data) => {
    DeleteUser();
  };

  return (
    <>
      <section className={s.contentWrap}>
        <ul className={s.nav}>
          {tabTitle.map((item, index) => (
            <li key={index}>
              <button onClick={() => onSelect(index)} className={`${select === index ? `${s.select}` : ""}`}>
                {item}
              </button>
            </li>
          ))}
        </ul>
        {select === 0 && (
          <>
            <Private />
            {/* <ProfileImg nickname={"aa"} size="big" profileImgData={profileImgData} setProfileImgData ={setProfileImgData}/> */}
            <Description
              auth={auth}
              ROOT_API={ROOT_API}
              axios={axios}
              userData={userData}
              handleChange={handleChange}
              account={account}
              showToast={showToast}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <LineStyle>기본정보를 입력해주세요</LineStyle>
            <Nickname
              auth={auth}
              ROOT_API={ROOT_API}
              axios={axios}
              userData={userData}
              showToast={showToast}
              handleChange={handleChange}
            />
            <Email
              auth={auth}
              ROOT_API={ROOT_API}
              axios={axios}
              disabled={disabled}
              showToast={showToast}
              userData={userData}
              handleChange={handleChange}
            />
            <Userid
              auth={auth}
              ROOT_API={ROOT_API}
              axios={axios}
              disabled={disabled}
              userData={userData}
              showToast={showToast}
              handleChange={handleChange}
            />
            <Password
              auth={auth}
              ROOT_API={ROOT_API}
              axios={axios}
              disabled={disabled}
              showToast={showToast}
              userData={userData}
              handleChange={handleChange}
            />
          </>
        )}
        {select === 1 && (
          <Form onSubmit={handleSubmit(onSubmits)}>
            <div className={s.deletgaider}>
              회원 탈퇴일로부터 모든 개인 정보는 완전히 삭제되며 더 이상 복구할 수 없게 됩니다. 작성된 게시물은 삭제되지
              않으며, 익명처리 후 디톡스로 소유권이 귀속됩니다.
            </div>
            {/* <input type="checkbox" /> */}
            {/* <label>계정 삭제에 관한 정책을 읽고 이에 동의합니다</label> */}
            <Table>
              {[
                <div>
                  <Label isRequire htmlFor="password">
                    비밀번호
                  </Label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="*******"
                    autoComplete="password"
                    maxLength={15}
                    {...register("password", {
                      required: "공백일 수 없습니다.",
                      minLength: {
                        value: 8,
                        message: "8자리 이상 비밀번호를 사용해주세요.",
                      },
                      maxLength: {
                        value: 15,
                        message: "15자리 이히 비밀번호를 사용해주세요.",
                      },
                      pattern: {
                        value: /.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*/,
                        message: "특수문자를 포함해주세요",
                      },
                    })}
                  />
                  {errors.password && <small role="alert">{errors.password.message}</small>}
                </div>,
              ]}
            </Table>
            <br />
            <Button FullWidth size="large" type="submit">
              회원탈퇴 버튼
            </Button>
          </Form>
        )}
      </section>
    </>
  );
}

export default Account;
