# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

개인 포트폴리오 및 웹 이력서 페이지 제작 프로젝트입니다. HTML5, CSS3, JavaScript, TailwindCSS를 활용하여 반응형 정적 웹사이트를 구현합니다.

**주요 목표**:
- 경력, 기술, 프로젝트를 효과적으로 소개
- 모든 기기(데스크톱, 태블릿, 모바일)에서 완벽하게 작동하는 반응형 웹

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

## 기술 스택

- **마크업**: HTML5 (시맨틱 마크업)
- **스타일**: CSS3, TailwindCSS (유틸리티 기반)
- **동적 기능**: Vanilla JavaScript
- **배포**: GitHub Pages

## 개발 명령어

현재 프로젝트는 정적 웹 페이지로, 별도의 빌드 또는 테스트 프로세스는 없습니다.

**파일 구조**:
```
claude-code-mastery/
├── index.html              # 메인 페이지
├── css/
│   └── styles.css          # 커스텀 스타일
├── js/
│   └── script.js           # JavaScript 기능
└── assets/
    ├── images/
    └── icons/
```

TailwindCSS는 CDN 버전으로 시작하며, 추후 빌드 프로세스가 필요해지면 NPM으로 전환 가능합니다.

## 페이지 구조

- **Hero/About**: 프로필 사진, 이름, 직무, 한 줄 소개
- **Projects**: 프로젝트 카드 (설명, 기술 스택, 링크)
- **Skills**: 기술 스택 (언어, 프레임워크, 도구)
- **Contact**: 연락처 정보 및 폼

## 개발 단계

ROADMAP.md에 8개 Phase가 정의되어 있습니다. 각 Phase별 세부 사항은 ROADMAP.md를 참고하세요.

## 코딩 스타일

- **들여쓰기**: 2칸
- **CSS 클래스**: 하이픈 케이스 (`my-class`)
- **JavaScript 함수/변수**: camelCase

## 주의 사항

- SEO 최적화를 위해 메타 태그 및 Open Graph 정보 포함
- 브라우저 호환성: 최신 브라우저 기준 (Chrome, Firefox, Safari, Edge)
- 이미지 및 아이콘은 `assets/` 디렉토리에 저장
