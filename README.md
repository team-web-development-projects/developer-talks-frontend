# developer-talks v1.0
> **프론트 3명, 백엔드 3명** <br/> **개발기간: 2023.04 ~ **

## 배포 주소

> **개발 버전** : [https://developer-talks-frontend.vercel.app/](https://developer-talks-frontend.vercel.app/) <br>

## 프론트 구성원

|      이경주       |          유희선         |       김시연         |
| :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | 
|   <img width="160px" src="https://avatars.githubusercontent.com/u/24261724?v=4" />    |                      <img width="160px" src="https://avatars.githubusercontent.com/u/84820008?v=4" />    |                   <img width="160px" src="https://avatars.githubusercontent.com/u/122216298?v=4"/>   |
|   [@jiimy](https://github.com/jiimy)   |    [@hsgh085](https://github.com/hsgh085)  | [@rlatldus](https://github.com/rlatldus)  |


## 프로젝트 소개

developer-talks는 okky.kr 와 비슷한 성격의 개발자 커뮤니티 입니다.
기본적으로 게시판 crud, 구글 로그인과 jwt을 이용한 토큰 관리, 사용자 정보 컨트롤을 가지고 있고, 
소켓, see, fcm등의 lib가 사용되었습니다.

## 시작 가이드
### 작업환경

- [Node.js 18.14.2](https://nodejs.org/ca/blog/release/v18.14.2/)
- [Npm 9.5.0](https://www.npmjs.com/package/npm/v/9.5.0)

### 설치
``` bash
$ git clone https://github.com/team-web-development-projects/developer-talks-frontend.git
$ cd Voluntain-2nd
$ npm install 
$ npm run start
```

---

## Stacks 🐈

### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)             


### Development
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### Communication
![Discord](https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)


---
## 화면 구성 📺
메인페이지, 게시글 목록, 마이페이지, 스터디룸

| 메인 페이지  |  게시글 목록   |
| :-------------------------------------------: | :------------: |
|  <img width="329" src="https://i.postimg.cc/rmRD7hMm/image.jpg"/> |  <img width="329" src="https://i.postimg.cc/W43FwNy0/image.jpg"/>|  
| 스터디룸   |  마이페이지   |  
| <img width="329" src="https://i.postimg.cc/gj9xpv2K/image.jpg"/>   |  <img width="329" src="https://i.postimg.cc/BvV8YWWk/image.jpg"/>     |

---
그 외 게시글 상세, 게시글 작성, 스터디룸 상세, 유저 관련 페이지등 총 9 페이지

## 주요 기능 📦

### ⭐️ 로그인, 회원가입
- jwt을 사용하여 refreshToken은 localStorage에서 관리. accessToken은 redux-toolkit을 이용한 클라이언트에서 관리.

### ⭐️ 게시글
- 게시글의 crud 기능
- 작성시 이미지 첨부 가능
- 대댓글 기능

### ⭐️ 스터디룸
- 스터디룸 입장시 소켓통신을 이용한 채팅 기능

### ⭐️ 알림, 쪽지
- sse처리로 시작하였으나 console에 주기적으로 나오는 알림이 있어 fcm으로 변경.

### ⭐️ 사용자 정보 컨트롤
- 로그인, 회원가입, 유저정보찾기, 유저정보수정등 여러개의 input이벤트가 포함된곳에 react-hook-form을 이용한 validate를 사용.


---
## 아키텍쳐

### 디렉토리 구조
```bash
├── README.md
├── package-lock.json
├── package.json
├── jsconfig.json
├── .env
├── .env.development
├── .env.production
├── public
│   ├── 404.html
│   ├── firebase-messaging-sw.js
│   ├── index.html
│   └── favicon.ico
└── src
    ├── assets
    │   ├── font.scss
    │   ├── function.scss
    │   ├── index.scss
    │   ├── reset.scss
    │   ├── variable.scss
    │   └── common.scss
    ├── components
    │   └── ...// button이나 editor처럼 작은것부터 시작하여 modal까지 약 30개 정도의 컴포넌트가 있습니다.
    ├── constants
    │   └── api.js // 루트 도메인 기본 정의
    ├── hooks
    │   ├── useOutOfClick.js
    │   ├── useParseJwt.js // accessToken을 디코딩하여 유저 데이터 추출
    │   └── useAuth.js
    ├── pages
    │   └──  ...   // 잘못된 url로 접속했을때 NotPage를 포함하여 약 8개의 페이지가 있습니다.
    ├── store
    │   ├── Auth.js // jwt 토큰 저장
    │   ├── ChatStore.js // 채팅 입력시 데이터 임시 저장
    │   ├── index.js 
    │   ├── Notification.js // 알림, 쪽지 관련 데이터 저장
    │   └── PageRouter.js // url 판별 데이터 임시 저장
    ├── util
    │   ├── day.js // dayjs를 이용한 날짜 포맷
    │   ├── epochConverter.js // 날짜 비교
    │   ├── IsLogin.js 
    │   └── Util.js // isDev와 isPrd로 dev 와 prd환경 정의
    ├── App.js
    ├── firebase-get-token.js
    ├── sse.js
    ├── useGoogleLoginAuth.js
    ├── useRefreshToken.js
    └── index.js

```

