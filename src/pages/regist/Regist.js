import React from 'react';
import './Regist.scss';
import { useForm } from 'react-hook-form';

const Regist = () => {
  return (
    <div>
      <form>
        <fieldset className="form_1">
          <legend>정보입력</legend>
          <h2>Developer-Talks 계정 만들기</h2>
          <p class="p1">*필수사항 입니다.</p>

          <table cellpadding="0" cellspacing="0">
            <tr>
              <th class="line">
                <label for="userName">이름</label>
                <span class="star" title="필수사항">
                  *
                </span>
              </th>
              <td class="line">
                <input
                  type="text"
                  id="userName"
                  placeholder="이름을 입력해주세요"
                  tabindex="1"
                  maxlength="20"
                  required
                  size="35"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label for="userId">아이디</label>
                <span class="star" title="필수사항">
                  *
                </span>
              </th>
              <td>
                <input
                  type="id"
                  id="userId"
                  placeholder="아이디를 입력해주세요"
                  tabindex="2"
                  maxlength="20"
                  required
                  size="20"
                />
                <button title="중복체크">중복체크</button>
              </td>
            </tr>
            <tr>
              <th>
                <label for="userNickname">닉네임</label>
                <span class="star" title="필수사항">
                  *
                </span>
              </th>
              <td>
                <input
                  type="id"
                  id="userNickname"
                  placeholder="닉네임을 입력해주세요"
                  tabindex="3"
                  maxlength="20"
                  required
                  size="20"
                />
                <button title="중복체크">중복체크</button>
              </td>
            </tr>
            <tr>
              <th>
                <lable for="password_1">비밀번호</lable>
                <span class="star" title="필수사항">
                  *
                </span>
              </th>
              <td>
                <input
                  type="password"
                  id="password_1"
                  placeholder="영문,숫자 조합으로 입력해주세요"
                  tabindex="4"
                  maxlength="20"
                  required
                  size="15"
                />
                <input
                  type="password"
                  id="password_2"
                  placeholder="비밀번호를 한 번 더 입력해주세요"
                  tabindex="5"
                  maxlength="20"
                  required
                  size="15"
                />
              </td>
            </tr>
            <tr>
              <th>
                <lable for="email">이메일</lable>
                <span class="star" title="필수사항">
                  *
                </span>
              </th>
              <td>
                <input
                  type="email"
                  id="email"
                  placeholder="이메일을 입력해주세요"
                  tabindex="6"
                  required
                  size="35"
                />
              </td>
            </tr>
          </table>
        </fieldset>
      </form>
      <div class="submit">
        <button type="submit" tabindex="7">
          제출하기
        </button>
      </div>
    </div>
  );
};

export default Regist;
