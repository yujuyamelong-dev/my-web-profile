# 계획: Skills 섹션 라이트 모드 배경색 문제 수정

## Context
라이트 모드에서 Skills 섹션의 `<h2 class="section-title text-center mb-16">Skills</h2>` 텍스트가 보이지 않는 문제.

**근본 원인:**  
1. `index.html` Skills 섹션에 인라인 스타일 `style="background-color: var(--bg-secondary);"` 적용
2. `css/styles.css` 484~496번 줄에서 CSS 변수 라이트 모드 재정의 구문이 **유효하지 않은 CSS 문법** 사용:
   ```css
   /* 잘못된 문법 - 브라우저가 무시함 */
   html.light :root,
   @media (prefers-color-scheme: light) { :root { ... } }
   ```
3. CSS 변수가 라이트 모드에서 갱신되지 않아 `--bg-secondary`가 다크 모드값 `#161616` 그대로 유지
4. 반면 `html.light h2 { color: #111827; }` 선택자는 정상 작동해 텍스트를 어두운 색으로 변경
5. 결과: **어두운 배경(#161616) + 어두운 텍스트(#111827) = 텍스트 안 보임**

## 수정 대상 파일

- `css/styles.css` (543~545번 줄 — `html.light section:nth-of-type(4)` 규칙)

## 수정 방법

`html.light section:nth-of-type(4)` 규칙에 `!important`를 추가하여 인라인 스타일을 강제로 덮어씀.

```css
/* 기존 */
html.light section:nth-of-type(4) {
  background-color: #ffffff;
}

/* 수정 후 */
html.light section:nth-of-type(4) {
  background-color: #f5f5f5 !important;
}
```

또는 `#skills` ID를 직접 타겟하는 규칙 추가:
```css
html.light #skills {
  background-color: #f5f5f5 !important;
}
```

`#f5f5f5`를 사용하는 이유: `--bg-secondary` 라이트 모드 의도 값이 `#f5f5f5`이며, 다른 섹션과 미세한 시각적 구분을 제공함.

## 검증 방법
1. 브라우저에서 `index.html` 열기
2. 테마 토글 버튼으로 라이트 모드 전환
3. Skills 섹션으로 스크롤하여 "Skills" 제목 텍스트가 밝은 배경 위에 잘 보이는지 확인
