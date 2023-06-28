import axios from "axios";
import Button from "components/button/Button";
import Label from "components/label/Label";
import Table from "components/table/Table";
import { showToast } from "components/toast/showToast";
import React, { useState } from "react";
import s from "./finduser.module.scss";
import { useSelector } from "react-redux";
import { parseJwt } from "hooks/useParseJwt";
import { ROOT_API } from "constants/api";
import Form from "components/form/Form"

const FindUser = () => {
  const [email, setEmail] = useState("");
  const auth = useSelector((state) => state.authToken);
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const findUserId = () => {
    axios
      .get(`${ROOT_API}/users/userid?email=${email}`, {
        headers: {
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then((response) => {
      showToast("success", "😎 중복체크를 제대로 확인해주세요");

      });
  };
  return (
    <Form>
      <p className={s.title}>회원정보 찾기</p>
      <Table tableTitle={"Developer-Talks"} tableText={"회원정보찾기"}>
        <Label isRequire htmlFor="userEmail">
          이메일입력하시면 아이디를 찾을 수 있어요
        </Label>
        <input id="userEmail" name="email" value={email} onChange={handleChange} type="text" />
      </Table>
      <Button FullWidth size="large" type="submit" tabIndex="3" onClick={findUserId}>
        {" "}
        찾기
      </Button>
    </Form>
  );
};

export default FindUser;
