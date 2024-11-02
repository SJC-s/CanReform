# CanReform - Frontend

CanReform은 의류 리폼 업체와 고객 간의 원활한 소통과 의뢰 처리를 지원하는 웹 애플리케이션입니다. 이 프로젝트의 프론트엔드는 **React**와 **Vite**로 개발되어 빠르고 효율적인 사용자 경험을 제공합니다.

## 📎 프로젝트 개요

의류 리폼 업체와 고객이 웹사이트에서 의뢰 요청, 댓글 교류, 별점 평가, 신고 기능을 통해 상호작용할 수 있도록 설계되었습니다.

- **프로젝트 목표**: 리폼 업체와 고객 간의 소통 및 서비스 품질 평가를 위한 웹 플랫폼 구축
- **주요 기능**: 의뢰 요청 및 처리, 별점 평가, 신고, 관리자 전용 기능

## 🔧 기술 스택

- **프레임워크**: React
- **번들러**: Vite
- **UI 라이브러리**: Bootstrap 5
- **HTTP 클라이언트**: Axios
- **라우팅**: React Router
- **상태 관리**: Context API

## 📑 주요 기능

1. **메인 페이지**
    - 인피니트 스크롤링 기능을 통해 최신 게시글 로드
    - 추천 게시물 섹션을 통해 사용자 관심 유도
2. **게시판 기능**
    - 게시글 목록 조회, 검색, 필터링 기능
    - 글 공개/비공개 설정 기능
3. **마이페이지**
    - 사용자가 작성한 게시글 관리
    - 예약 관리 및 견적 확인 기능
4. **별점 평가 및 댓글 기능**
    - 게시글에 대한 별점 평가 및 댓글 작성 가능
5. **알림 및 쪽지 기능 (추가 예정)**
    - 사용자 간 실시간 소통을 위한 알림 및 쪽지 기능
  

## 📂 프로젝트 구조

```bash
📦 CanReform-React
├─ .env                    # 환경 변수 파일 (API URL, API 키 등 보안 정보를 설정)
├─ .gitignore              # Git에서 무시할 파일 목록
├─ Diagram.drawio          # 프로젝트 다이어그램 파일 (구조 및 흐름 시각화)
├─ README.md               # 프로젝트 설명 및 사용 방법 안내 파일
├─ eslint.config.js        # ESLint 설정 파일 (코드 스타일 및 품질 검사를 위한 설정)
├─ index.html              # HTML 템플릿 파일, 애플리케이션의 진입점
├─ package-lock.json       # 프로젝트 의존성 잠금 파일
├─ package.json            # 프로젝트 메타 정보 및 의존성 목록
├─ public                  # 정적 파일 디렉토리 (이미지, 폰트 등)
│  └─ upload               # 이미지 및 정적 리소스 파일 업로드용 폴더
│     ├─ imgAbout          # About 섹션의 이미지 파일들
│     │  ├─ 01.png         # About 섹션에서 사용되는 이미지 1
│     │  ├─ 02.png         # About 섹션에서 사용되는 이미지 2
│     │  └─ 03.png         # About 섹션에서 사용되는 이미지 3
│     ├─ imgBanner         # 배너 이미지 폴더
│     │  ├─ Banner-1.png   # 배너 이미지 1
│     │  ├─ Banner-2.png   # 배너 이미지 2
│     │  ├─ Banner-3.png   # 배너 이미지 3
│     │  ├─ imgBanner01.jpg # 추가 배너 이미지
│     │  └─ imgBanner02.jpg # 추가 배너 이미지
│     ├─ imgCoop           # 협력사 이미지 폴더
│     │  ├─ imgCoop01.png  # 협력사 이미지 1
│     │  └─ imgCoop02.png  # 협력사 이미지 2
│     ├─ imgScroll         # 스크롤 섹션 이미지 폴더
│     │  ├─ imgScroll01.jpg # 스크롤 이미지 1
│     │  ├─ imgScroll02.jpg # 스크롤 이미지 2
│     │  └─ imgScroll03.jpg # 스크롤 이미지 3
│     ├─ imgSlide          # 슬라이드 이미지 폴더
│     │  ├─ banner-flat-christmas-sale-horizontal.jpg # 크리스마스 세일 배너
│     │  ├─ banner-gradient-year-end-sale.jpg        # 연말 세일 배너
│     │  ├─ banner-new-year-celebration-sale.jpg     # 새해 세일 배너
│     │  ├─ imgSlide01.jpg                           # 슬라이드 이미지 1
│     │  ├─ imgSlide02.jpg                           # 슬라이드 이미지 2
│     │  └─ imgSlide03.jpg                           # 슬라이드 이미지 3
│     ├─ logo.svg              # 사이트 로고 이미지 (SVG 형식)
│     └─ logo_sample.svg       # 샘플 로고 이미지
├─ src                         # 소스 코드 디렉토리
│  ├─ App.jsx                  # 애플리케이션의 최상위 컴포넌트
│  ├─ assets                   # 정적 자산 파일 폴더 (React 로고, 별 이미지 등)
│  │  ├─ react.svg             # React 로고
│  │  ├─ star1.png             # 별점 이미지 1
│  │  ├─ star2.png             # 별점 이미지 2
│  │  └─ star3.png             # 별점 이미지 3
│  ├─ component                # 개별 컴포넌트 폴더
│  │  ├─ Modal                 # 모달 관련 컴포넌트 폴더
│  │  │  └─ ReportFormModal.jsx # 신고 폼 모달 컴포넌트
│  │  ├─ RfAuthorization       # 인증 및 회원 관리 컴포넌트 폴더
│  │  │  ├─ AdminAuth.js       # 관리자 권한 인증 컴포넌트
│  │  │  ├─ FindPassword.jsx   # 비밀번호 찾기 컴포넌트
│  │  │  ├─ FindUserId.jsx     # 아이디 찾기 컴포넌트
│  │  │  ├─ GoogleAuthLogin.jsx # 구글 OAuth 로그인 컴포넌트
│  │  │  ├─ Login.jsx          # 로그인 페이지 컴포넌트
│  │  │  ├─ Mypage.jsx         # 마이페이지 컴포넌트
│  │  │  ├─ ResetPassword.jsx  # 비밀번호 재설정 컴포넌트
│  │  │  └─ Signup.jsx         # 회원가입 페이지 컴포넌트
│  │  ├─ RfBoard               # 게시판 관련 컴포넌트 폴더
│  │  │  ├─ ReformAnnouncement.jsx         # 공지사항 컴포넌트
│  │  │  ├─ ReformAnnouncementDetail.jsx  # 공지사항 상세 페이지 컴포넌트
│  │  │  ├─ ReformAnnouncementEdit.jsx    # 공지사항 수정 페이지 컴포넌트
│  │  │  ├─ ReformBoard.jsx               # 리폼 게시판 컴포넌트
│  │  │  ├─ ReformCommentList.jsx         # 댓글 목록 컴포넌트
│  │  │  ├─ ReformCommentWrite.jsx        # 댓글 작성 컴포넌트
│  │  │  ├─ ReformDetail.jsx              # 리폼 상세 페이지 컴포넌트
│  │  │  ├─ ReformEdit.jsx                # 리폼 수정 페이지 컴포넌트
│  │  │  ├─ ReformFormFields.jsx          # 리폼 게시글 입력 필드 컴포넌트
│  │  │  ├─ ReformNew.jsx                 # 새로운 리폼 게시글 작성 컴포넌트
│  │  │  ├─ ReformPage.jsx                # 리폼 게시판 메인 컴포넌트
│  │  │  ├─ ReformReport.jsx              # 리폼 신고 페이지 컴포넌트
│  │  │  ├─ ReformReportDetail.jsx        # 신고 상세 페이지 컴포넌트
│  │  │  ├─ ReformSlideBanner.jsx         # 리폼 슬라이드 배너 컴포넌트
│  │  │  └─ StarRating.jsx                # 별점 컴포넌트
│  │  ├─ RfLayout                        # 레이아웃 관련 컴포넌트 폴더
│  │  │  ├─ Layout.jsx                    # 기본 레이아웃 컴포넌트
│  │  │  ├─ LayoutFooter.jsx              # 푸터 컴포넌트
│  │  │  ├─ LayoutHeader.jsx              # 헤더 컴포넌트
│  │  │  └─ RotatingProverb.jsx           # 회전하는 격언 표시 컴포넌트
│  │  ├─ RfMain                          # 메인 페이지 관련 컴포넌트 폴더
│  │  │  ├─ MainAbout.jsx                 # 메인 페이지 About 섹션 컴포넌트
│  │  │  ├─ MainCoop.jsx                  # 협력사 소개 컴포넌트
│  │  │  ├─ MainFade.jsx                  # 페이드 인 애니메이션 컴포넌트
│  │  │  ├─ MainPage.jsx                  # 메인 페이지 컴포넌트
│  │  │  ├─ MainScroll.jsx                # 스크롤 섹션 컴포넌트
│  │  │  ├─ MainService.jsx               # 서비스 소개 섹션 컴포넌트
│  │  │  └─ MainSlide.jsx                 # 메인 슬라이드 컴포넌트
│  │  └─ utils                            # 유틸리티 파일 폴더
│  │     └─ fileUtils.js                  # 파일 관련 유틸리티 함수
│  ├─ css                                 # CSS 스타일 폴더
│  │  ├─ App.css                          # 전체 앱 스타일링
│  │  ├─ MainCoop.css                     # 협력사 섹션 스타일
│  │  ├─ Mypage.css                       # 마이페이지 스타일
│  │  ├─ RfBoard                          # 게시판 관련 스타일 폴더
│  │  │  ├─ ReformAnnouncement.css        # 공지사항 스타일
│  │  │  ├─ ReformBoard.css               # 리폼 게시판 스타일
│  │  │  ├─ ReformCommentList.css         # 댓글 목록 스타일
│  │  │  ├─ ReformCommentWrite.css        # 댓글 작성 스타일
│  │  │  ├─ ReformDetail.css              # 리폼 상세 페이지 스타일
│  │  │  ├─ ReformReportDetail.css        # 신고 상세 페이지 스타일
│  │  │  ├─ ReformSlideBanner.css         # 슬라이드 배너 스타일
│  │  │  ├─ ReportFormModal.css           # 신고 폼 모달 스타일
│  │  │  └─ StarRating.css                # 별점 컴포넌트 스타일
│  │  ├─ RfLayout                         # 레이아웃 스타일 폴더
│  │  │  └─ Layout.css                    # 레이아웃 스타일
│  │  ├─ RfMain                           # 메인 페이지 스타일 폴더
│  │  │  ├─ MainAbout.css                 # About 섹션 스타일
│  │  │  ├─ MainCoop.css                  # 협력사 소개 스타일
│  │  │  ├─ MainFade.css                  # 페이드 인 스타일
│  │  │  ├─ MainPage.css                  # 메인 페이지 스타일
│  │  │  ├─ MainScroll.css                # 스크롤 섹션 스타일
│  │  │  ├─ MainService.css               # 서비스 섹션 스타일
│  │  │  └─ MainSlide.css                 # 메인 슬라이드 스타일
│  │  └─ index.css                        # 글로벌 스타일링
│  ├─ fonts                               # 폰트 파일 폴더
│  │  ├─ MaruBuri-Regular.otf             # MaruBuri 폰트
│  │  ├─ NanumBarunpenB.otf               # Nanum Barunpen 폰트
│  │  ├─ NanumGothic.otf                  # Nanum Gothic 폰트
│  │  └─ NanumSquareB.otf                 # Nanum Square 폰트
│  ├─ main.jsx                            # ReactDOM을 통해 App 컴포넌트를 렌더링하는 진입 파일
│  └─ proverbs.json                       # 회전하는 격언 데이터 파일
└─ vite.config.js                         # Vite 설정 파일
```
©generated by [Project Tree Generator](https://woochanleee.github.io/project-tree-generator)
