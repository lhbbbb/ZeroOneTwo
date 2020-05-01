# 장영준 개발일지

## 2020.04.16. 프론트앤드 구조 고민

### 페이지 구조(./src/pages)

Account : 홈페이지 최초 입장 시, 가입을 통한 이용을 유도

- LoginPage: 로그인 페이지
- RegisterPage: 회원가입 페이지

Board: 여행, 일정에 따른 Board를 생성해 해당 Board내에 해당하는 영수증일 일괄 관리

- BoardPage: 사용자가 생성한 모든 board를 보여주는 페이지
- BoardCreatePage: board 생성 페이지
- BoardDetailPage: board 클릭 시 디테일 페이지

Receipt: Board에 담을 영수증과 관련된 페이지들

- ReceiptCreatePage: 영수증 입력 페이지(이미지, 날짜 등)
- ReceiptProgressPage: 영수증 분석(머신러닝)을 진행하는 동안 상태를 보여주는 페이지
- ReceiptDetailPage: 영수증 분석이후 또는 상세 데이터를 확안할때 사용되는 페이지

Setting: 여러 환경설정을 담당하는 페이지

- SettingPage: 미정....

### 페이지 개발 진행

**기본 개발 내용**

- Create-react-app을 기반으로 개발
- react-hook 기반 개발
- 파일 구조는 presentation/container 구조로 진행할 예정

**사용되는 API**

- react-router
- redux
- redux-saga (고려중...)
- axios
- material-ui

**프론트 파일 구조**

- assets: 이미지, 아이콘, css 등 외부 이미지 요소들
- components: 페이지 내 들어갈 프레젠테이션 컴포넌트들
- containers: 페이지 내 들어갈 컨테이너 컴포넌트들
- pages: 개발할 페이지들(또는 모달페이지)
- layouts: 화면 틀
- theme: material-ui 디자인 일괄 적용(아직은 미적용 상태)
- modules: 리덕스 모듈들

## 2020.04.20. 프론트앤드 개발 등등...

**웹 개발에 필요한 여러 툴들**
출처: 노마드코더(https://www.youtube.com/watch?v=u3Ph_M2bySg)
== 무료 제작툴 39개 모음 ==
기획
http://trello.com/
https://www.notion.so/
.
디자인
https://www.figma.com/
.
사진
https://unsplash.com
.
코드 에디터
https://code.visualstudio.com/
.
CSS 라이브러리
https://tailwindcss.com
https://bulma.io
.
깃 저장소
https://github.com/
https://about.gitlab.com/
https://bitbucket.org/product
.
클라이언트
https://insomnia.rest (REST)
https://altair.sirmuel.design (GraphQL)
.
검색엔진
https://www.algolia.com
.
유저 비밀번호 관리
https://auth0.com/
https://aws.amazon.com/ko/cognito/
.
이메일
https://www.mailgun.com/
https://mailchimp.com
.
SSL Certificate
https://letsencrypt.org/
.
백엔드
https://www.heroku.com/
https://aws.amazon.com/
.
프론트엔드
https://pages.github.com/
https://www.netlify.com/
.
서버리스
https://aws.amazon.com/lambda/
https://cloud.google.com/functions/
.
데이터베이스,
https://aws.amazon.com/dynamodb/
https://cloud.google.com/firestore/
https://www.mongodb.com/cloud/atlas
https://fauna.com/
.
파일 업로드
https://cloud.google.com/storage/
https://cloudinary.com/
.
에러 리포팅
https://sentry.io
.
채팅
https://pusher.com
.
푸쉬알림
https://onesignal.com/
.
피드
getstream.io
.
분석
analytics.google.com/
https://www.hotjar.com
https://mixpanel.com/
.
시간관리
https://wakatime.com/

## 2020.04.21. 프론트앤드 개발 규칙과 회원서비스 개발

**명명 규칙들**
해당 컴포넌트 styled-component 규칙을 적용할때

- 가장 상단 컴포넌트 틀은 Wrapper를 접미로 사용
- 그 하위 틀은 Block이라는 네임을 접미로 사용
- 단순 디자인 조절을 할땐 Styled를 접두로 사용

**구조**

- 페이지 전, 페이지 틀을 구성하는 component/layout폴더를 활용
- 각 페이지는 프레젠테이션/컴포넌트 컴포넌트로 나누어 개발

## 2020.04.22. 프론트앤드 회원가입 개발 및 영수증 관련 처리 구상

**회원가입**

- 먼저, 구글의 Auth를 활용해 개발할 예정
- https://webdoli.tistory.com/203?category=895496 를 참고해 개발할 예정

**영수증 처리**

- 이미지 파일 읽기 및 화면에 띄우기
- 서버에 이미지 보내고 저장 확인하기
