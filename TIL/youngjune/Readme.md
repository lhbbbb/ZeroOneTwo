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
- redux-saga
- axios
- material-ui

**프론트 파일 구조**

- assets: 이미지, 아이콘, css 등 외부 이미지 요소들
- components: 페이지 내 들어갈 컴포넌트들(프레젠테이션/컨테이너로 구분해 개발할 예정)
- pages: 개발할 페이지들(또는 모달페이지)
- theme: material-ui 디자인 일괄 적용(아직은 미적용 상태)
