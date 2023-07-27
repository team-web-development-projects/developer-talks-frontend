// import Button from "components/button/Button";
// import Label from "components/label/Label";
// import { useForm } from "react-hook-form";

// const Forms = ({ tableTitle, tableText }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { isSubmitting, isDirty, errors },
//   } = useForm({ mode: "onChange" });

//   return (
//     <>
//       <h2>{tableTitle}</h2>
//       <p>{tableText}</p>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <ul>
//           <li>
//             <div>
//               <Label isRequire htmlFor="userEmail">
//                 이메일
//               </Label>
//               <input
//                 type="email"
//                 id="userEmail"
//                 placeholder="이메일을 입력해주세요"
//                 tabIndex="2"
//                 {...register("userEmail", {
//                   required: "이메일은 필수 입력입니다.",
//                   pattern: {
//                     value: /\S+@\S+\.\S+/,
//                     message: "이메일 형식에 맞지 않습니다.",
//                   },
//                 })}
//               />
//               <Button onClick={verityEmail} tabIndex="3">
//                 이메일인증
//               </Button>
//             </div>
//             {errors.userEmail && <small role="alert">{errors.userEmail.message}</small>}
//           </li>
//           <li>
//             <div>
//               <Label isRequire htmlFor="inputEmail">
//                 이메일 인증
//               </Label>
//               <input tabIndex="4" type="text" id="inputEmail" placeholder="인증번호를 입력해주세요" {...register("inputEmail", { required: true })} />
//               <Button onClick={verityEmailchecking} tabIndex="5">
//                 확인
//               </Button>
//             </div>
//           </li>
//           <li>
//             <div>
//               <Label isRequire htmlFor="nickname">
//                 닉네임
//               </Label>
//               <input
//                 type="text"
//                 id="nickname"
//                 placeholder="닉네임을 입력해주세요"
//                 tabIndex="6"
//                 maxLength={15}
//                 {...register("nickname", {
//                   required: "닉네임은 필수 입력입니다.",
//                   minLength: {
//                     value: 5,
//                     message: "5자리 이상 입력해주세요.",
//                   },
//                 })}
//               />
//               <Button
//                 tabIndex="7"
//                 title="중복체크"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   validateDuplicate("nickname");
//                 }}
//               >
//                 중복체크
//               </Button>
//             </div>
//             {errors.nickname && <small role="alert">{errors.nickname.message}</small>}
//             {!errors.nickname && duplicateNickName !== "" && duplicateNickName === true && <small className="alert">중복된 닉네임입니다.</small>}
//             {!errors.nickname && duplicateNickName !== "" && duplicateNickName === false && (
//               <small className="true">사용할 수 있는 닉네임입니다.</small>
//             )}
//           </li>
//           <li>
//             <div>
//               <Label isRequire htmlFor="userid">
//                 아이디
//               </Label>
//               <input
//                 type="text"
//                 id="userid"
//                 placeholder="아이디를 입력해주세요"
//                 maxLength={15}
//                 tabIndex="8"
//                 {...register("userid", {
//                   required: "아이디는 필수 입력입니다.",
//                   minLength: {
//                     value: 5,
//                     message: "5자리 이상 아이디를 사용해주세요.",
//                   },
//                   maxLength: {
//                     value: 15,
//                     message: "15자리 이하 아이디를 사용해주세요.",
//                   },
//                 })}
//               />
//               <Button
//                 tabIndex="9"
//                 title="중복체크"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   validateDuplicate("userid");
//                 }}
//               >
//                 중복체크
//               </Button>
//             </div>
//             {errors.userid && <small role="alert">{errors.userid.message}</small>}
//             {duplicateId !== "" && duplicateId === true && <small className="alert">중복된 아이디입니다.</small>}
//             {duplicateId !== "" && duplicateId === false && <small className="true">사용할 수 있는 아이디입니다.</small>}
//           </li>
//           <li>
//             <div>
//               <Label isRequire htmlFor="password">
//                 비밀번호
//               </Label>
//               <input
//                 type={typetoggle}
//                 id="password"
//                 placeholder="최소 1개의 특수문자를 포함해주세요"
//                 maxLength={15}
//                 tabIndex="10"
//                 autoComplete="password"
//                 {...register("password", {
//                   required: "비밀번호는 필수 입력입니다.",
//                   minLength: {
//                     value: 8,
//                     message: "8자리 이상 비밀번호를 사용해주세요.",
//                   },
//                   maxLength: {
//                     value: 15,
//                     message: "15자리 이히 비밀번호를 사용해주세요.",
//                   },
//                   pattern: {
//                     value: /.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*/,
//                     message: "특수문자를 포함해주세요",
//                   },
//                 })}
//               />
//             </div>
//             {errors.password && <small role="alert">{errors.password.message}</small>}
//           </li>
//           <li>
//             <div>
//               <Label isRequire htmlFor="passwordChk">
//                 비밀번호 확인
//               </Label>
//               <input
//                 type={typetoggle}
//                 id="passwordChk"
//                 placeholder="비밀번호를 한 번 더 입력해주세요"
//                 tabIndex="11"
//                 maxLength={15}
//                 autoComplete="password"
//                 {...register("passwordChk", {
//                   required: "비밀번호는 필수 입력입니다.",
//                   minLength: {
//                     value: 8,
//                     message: "8자리 이상 비밀번호를 사용해주세요.",
//                   },
//                   maxLength: {
//                     value: 15,
//                     message: "15자리 이히 비밀번호를 사용해주세요.",
//                   },
//                   pattern: {
//                     value: /.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*/,
//                     message: "특수문자를 포함해주세요",
//                   },
//                   validate: (val) => {
//                     if (watch("password") !== val) {
//                       return "비밀번호가 일치하지 않습니다.";
//                     }
//                   },
//                 })}
//               />
//               <div className={s.typechange} type="typechange" onClick={typechange}>
//                 👀
//               </div>
//             </div>
//             {errors.passwordChk && <small role="alert">{errors.passwordChk.message}</small>}
//           </li>
//         </ul>
//         <div className="registSubmit">
//           <Button FullWidth size="large" type="submit" tabIndex="12" disabled={isSubmitting}>
//             {" "}
//             가입하기
//           </Button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default Forms;
