import React from 'react';
import { useForm_1 } from 'react-hook-form';
import './Regist.scss';

const Regist = () => {
  const onSubmit = async (data) => {
    // axios
    //   .post(`https://url`, {
    //     modelName: data["modelName"],
    //     brand: data["brand"],
    //     price: data["price"],
    //     // size: data["size"],
    //   })
    //   .then(function (response) {
    //     // console.log("dta", response.data);
    //     alert("회원가입 완료");
    //   })
    //   .catch(function (error) {
    //     // 오류발생시 실행
    //   })
    //   .then(function () {
    //     // 항상 실행
    //   });
    console.log('data', data);
  };

  const {
    register,
    handleSubmit_1,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm_1({ mode: 'onChange' });

  return (
    <div>
      <form onSubmit={handleSubmit_1(onSubmit)}>
        <fieldset className="form_1">
          <legend>정보입력</legend>
          <h2>Developer-Talks 계정 만들기</h2>
          <p className="p1">*필수사항 입니다.</p>

          <table cellPadding="0" cellSpacing="0">
            <tr>
              <th className="line">
                <label htmlFor="Id">이름</label>
                <span className="star" title="필수사항">
                  *
                </span>
              </th>
              <td className="line">
                <input
                  type="text"
                  id="Id"
                  placeholder="Guest"
                  tabIndex="1"
                  size="35"
                  aria-invalid={
                    !isDirty ? undefined : errors.Id ? 'true' : 'false'
                  }
                  {...register('Id', {
                    required: '이름은 필수 입력입니다.',
                    minLength: {
                      value: 4,
                      message: '4글자 이상 입력해주세요.',
                    },
                  })}
                />
                {errors.Id && <small role="alert">{errors.Id.message}</small>}
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="userId">아이디</label>
                <span className="star" title="필수사항">
                  *
                </span>
              </th>
              <td>
                <input
                  type="text"
                  id="userId"
                  placeholder="아이디를 입력해주세요"
                  tabIndex="2"
                  aria-invalid={
                    !isDirty ? undefined : errors.userId ? 'true' : 'false'
                  }
                  {...register('userId', {
                    required: '비밀번호는 필수 입력입니다.',
                    minLength: {
                      value: 8,
                      message: '8자리 이상 비밀번호를 사용해주세요.',
                    },
                  })}
                />
                {errors.userId && (
                  <small role="alert">{errors.userId.message}</small>
                )}
                <button title="중복체크">중복체크</button>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="userNickname">닉네임</label>
                <span className="star" title="필수사항">
                  *
                </span>
              </th>
              <td>
                <input
                  type="text"
                  id="userNickname"
                  placeholder="닉네임을 입력해주세요"
                  tabIndex="3"
                  aria-invalid={
                    !isDirty
                      ? undefined
                      : errors.userNickname
                      ? 'true'
                      : 'false'
                  }
                  {...register('userNickname', {
                    required: '닉네임은 필수 입력입니다.',
                    minLength: {
                      value: 8,
                      message: '8자리 이상 입력해주세요.',
                    },
                  })}
                />
                {errors.userNickname && (
                  <small role="alert">{errors.userNickname.message}</small>
                )}
                <button title="중복체크">중복체크</button>
              </td>
            </tr>
            <tr>
              <th>
                <lable htmlFor="password_1">비밀번호</lable>
                <span className="star" title="필수사항">
                  *
                </span>
              </th>
              <td>
                <input
                  type="password"
                  id="password_1"
                  placeholder="영문,숫자 조합으로 입력해주세요"
                  tabIndex="4"
                  aria-invalid={
                    !isDirty ? undefined : errors.password_1 ? 'true' : 'false'
                  }
                  {...register('password_1', {
                    required: '비밀번호는 필수 입력입니다.',
                    minLength: {
                      value: 8,
                      message: '8자리 이상 비밀번호를 사용해주세요.',
                    },
                  })}
                />
                {errors.password_1 && (
                  <small role="alert">{errors.password_1.message}</small>
                )}
                <input
                  type="password"
                  id="password_2"
                  placeholder="비밀번호를 한 번 더 입력해주세요"
                  tabIndex="5"
                  aria-invalid={
                    !isDirty ? undefined : errors.password_2 ? 'true' : 'false'
                  }
                  {...register('password_2', {
                    required: '비밀번호는 필수 입력입니다.',
                    minLength: {
                      value: 8,
                      message: '8자리 이상 비밀번호를 사용해주세요.',
                    },
                  })}
                />
                {errors.password_2 && (
                  <small role="alert">{errors.password_2.message}</small>
                )}
              </td>
            </tr>
            <tr>
              <th>
                <lable htmlFor="userEmail">이메일</lable>
                <span className="star" title="필수사항">
                  *
                </span>
              </th>
              <td>
                <input
                  type="email"
                  id="userEmail"
                  placeholder="이메일을 입력해주세요"
                  tabIndex="6"
                  aria-invalid={
                    !isDirty ? undefined : errors.userEmail ? 'true' : 'false'
                  }
                  {...register('userEmail', {
                    required: '이메일은 필수 입력입니다.',
                    minLength: {
                      value: 8,
                      message: '8자리 이상 사용해주세요.',
                    },
                  })}
                />
                {errors.userEmail && (
                  <small role="alert">{errors.userEmail.message}</small>
                )}
              </td>
            </tr>
          </table>
        </fieldset>
      </form>
      <div className="submit">
        <button type="submit" tabIndex="7" disabled={isSubmitting}>
          {' '}
          제출하기
        </button>
      </div>
    </div>
  );
};

export default Regist;
