## 개발 환경

- bundler : Vite@latest
- react : react18 ↑
- eslint, prettier
- alias 사용 (vite-config.js 참고)

---

## 사용하는 라이브러리

1. axios (http)
2. react-query
3. zustand (global store)
4. immer
5. dayjs (date 관련)
6. i18next (다국어)
7. lodash (유틸리티)
8. prop-types

---

## 사용 패턴

Custom Hooks 패턴

## 스타일 관련

module.scss 방식으로 사용한다.

[Bem방법론](https://nykim.work/15)의 네이밍을 지향하나 언더바(\_)와 바(-)를 한번만 사용한다.

---

## 네이밍

### 변수명

camelCase -> ex)firstName

변수명 지어주는 사이트 :

### 함수명

동사로 시작하기 -> ex) handleClick = 명사 + 동사

props로 함수 넘길 때 : on으로 시작 ( ex : onModalClose )

[참고링크](https://youngmin.hashnode.dev/react-1)
