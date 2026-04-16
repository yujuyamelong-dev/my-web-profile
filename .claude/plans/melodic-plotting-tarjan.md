# 포트폴리오 디자인 변경 계획 (Jensen Omega 스타일)

## Context

현재 포트폴리오는 중앙 정렬의 심플한 다크 테마(파란 강조색)로 구성되어 있습니다.
참고 이미지(Jensen Omega)는 다음 특징을 가집니다:
- **강조색**: 파란색 → 레드(`#e63333`)
- **레이아웃**: Hero를 좌우 2열 분할 (텍스트 좌측, 프로필 우측)
- **새 요소**: "Hello." 빨간 점, 기술 배너, About 섹션(서비스 목록 + 통계), 프로필 원형 배경 효과
- **타이포그래피**: 더 굵고 임팩트 있는 폰트(Montserrat 추가)

---

## 변경 파일

- `index.html` — 섹션 구조 전면 재구성
- `css/styles.css` — 색상 변수 교체 + 신규 컴포넌트 스타일
- `js/script.js` — **변경 없음** (기존 id 속성 유지 필수)

---

## 구현 계획

### 1단계: `css/styles.css` — 색상 변수 & 신규 스타일

**CSS 변수 교체 (`:root`)**
```css
--accent-color: #e63333;       /* 파란 → 레드 */
--accent-hover: #cc2222;
--accent-glow: rgba(230, 51, 51, 0.3);
--bg-primary: #0d0d0d;         /* 더 진한 블랙 */
--bg-secondary: #161616;
--bg-tertiary: #222222;
--bg-card: #181818;
```

**신규 클래스 추가**
- `.hello-dot` — "Hello." 텍스트의 빨간 점
- `.section-title::after` — 섹션 제목 하단 짧은 빨간 선 (60px)
- `.profile-wrapper` — 원형 프로필 + 빨간 배경 원 오프셋 효과
  - `::before` 가상 요소: 빨간 원, `transform: translate(12px, 12px)`, z-index: 0
  - `img`: z-index: 1 (위에 레이어)
  - `.profile-arrow`: ">>" 장식, 우측 하단
- `.skills-banner` — 기술 스택 수평 배너 (무한 스크롤 애니메이션)
- `.service-list` — 좌측 서비스 목록, 빨간 세로선 + 불릿
- `.stat-block` — 통계 수치 블록 (숫자 레드, 라벨 회색)

**기존 클래스 색상 변경**
- `.btn-primary`: 파란 → 레드 배경
- `.btn-secondary`: 흰 테두리, hover 시 레드
- `.tag`: `rgba(230,51,51,0.12)` 배경, 레드 텍스트
- Skills 섹션 `bg-blue-400` 불릿 → CSS 인라인 스타일 `var(--accent-color)`

**Google Fonts 추가 (CSS body/h 분리)**
```css
h1, h2 { font-family: 'Montserrat', sans-serif; }
```

---

### 2단계: `index.html` — 섹션 구조 재구성

**`<head>`**
- Google Fonts에 `Montserrat:wght@700;800;900` 추가

**Header/Nav**
- 메뉴 항목: `Home(#hero)`, `About(#about)`, `Projects(#projects)`, `Contact(#contact)` 로 변경 (Skills 제거)
- 기존 id(`theme-toggle`, `theme-icon`, `hamburger`, `mobile-menu`) 유지

**Hero 섹션** (`id="about"` → `id="hero"`)
```
좌우 2열 grid (md:grid-cols-2)
├── 좌측: "Hello." (빨간 점) → "I'm 이유주" → "Full-Stack & AI-Native Developer" → 슬로건 → CTA 버튼 2개
└── 우측: .profile-wrapper (원형 이미지 + 빨간 배경 원 + ">>" 장식)
```

**기술 배너** (Hero 바로 아래 `<div>`, 섹션 아님)
```
HTML5 · CSS3 · JavaScript · TypeScript · React · Vue.js · Node.js · Java · Next.js · Git
```
- 무한 스크롤: `@keyframes banner-scroll`, 아이템 2배 복사

**About 섹션** (신규, `id="about"`)
```
좌우 2열 grid
├── 좌측: .service-list (4개 서비스 아이템)
│   ├── 🌐 웹 프론트엔드 개발
│   ├── ⚙️ 백엔드 & API 개발
│   ├── 🤖 AI 워크플로우 통합
│   └── 📦 공공 SI 프로젝트 납품
└── 우측: "About me" 제목 + 설명 + 통계 3개 (2+공공프로젝트, 10+기술스택, AI네이티브)
```

**Projects 섹션** — 구조 유지, `<h2>` → `section-title` 클래스, 카드 배경 `var(--bg-card)`

**Skills 섹션** — `bg-blue-400` 불릿을 `style="background-color: var(--accent-color)"` 인라인으로 교체

**Contact 섹션** — GitHub 버튼 `bg-blue-500` → `style="background-color: var(--accent-color)"`

---

## JS 의존 id 유지 목록 (변경 금지)

| id | JS 기능 |
|----|---------|
| `theme-toggle` | 테마 토글 |
| `theme-icon` | 테마 아이콘 |
| `hamburger` | 모바일 메뉴 |
| `mobile-menu` | 모바일 메뉴 |
| `email-copy-btn` | 이메일 복사 |

---

## 구현 순서

1. `css/styles.css` — `:root` 변수 교체
2. `css/styles.css` — `.btn`, `.tag` 레드 계열로 변경
3. `css/styles.css` — `.section-title`, `.profile-wrapper`, `.skills-banner`, `.service-list`, `.stat-block` 추가
4. `css/styles.css` — 라이트 모드 파란색 참조 레드로 교체
5. `index.html` — `<head>` Montserrat 폰트 추가
6. `index.html` — Hero 섹션 2열 레이아웃 재구성 (`id: hero`)
7. `index.html` — 기술 배너 추가
8. `index.html` — About 섹션 신설
9. `index.html` — Projects/Skills/Contact 색상 교체
10. `index.html` — Nav 메뉴 항목 업데이트

---

## 검증 방법

- 브라우저에서 `index.html` 직접 열기
- 반응형 확인: 320px(모바일), 768px(태블릿), 1280px(데스크톱)
- 다크/라이트 테마 토글 동작 확인
- 모바일 햄버거 메뉴 동작 확인
- 이메일 복사 버튼 동작 확인
- 스크롤 시 헤더 효과 확인
- Hero → 기술 배너 → About → Projects → Skills → Contact 순서 시각 확인
