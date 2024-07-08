<div align="center">

<h1>별 하나에 글 하나 🌟</h1>

<img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/cb3a01fc-243c-4cdd-bcd8-67aa698a81c3" alt="별 하나에 글 하나 로고">

<h3> "내 삶의 반짝이는 기억들을 우주에 담아보세요" </h3>

3D 기반 웹 추억 저장 서비스

<br />

남겨두고 싶은 순간을 찍은 사진과, 그 순간을 떠올리며 적은 글을 별에 담습니다.

기억을 담은 별들이 모여 나만의 은하가 만들어집니다.

추억으로 가득 채워진 나만 우주를 소중한 사람들에게 공유해보세요 ❤️

</br>

[✨ <별 하나에 글 하나> 사용해보기](https://www.xn--bj0b03z.site/)

[🔗 wiki 바로가기](https://github.com/boostcampwm2023/web16-B1G1/wiki)

</div>

<br />

# 목차

### [1. 프로젝트 소개](#%EF%B8%8F-프로젝트-소개)

- [<별 하나에 글 하나>를 만들게 된 계기](#별-하나에-글-하나를-만들게-된-계기)
- [주요 기능 설명](#주요-기능-설명)
- [프로젝트 실행 방법](#프로젝트-실행-방법)

### [2. 기술 스택](#%EF%B8%8F-기술-스택)

### [3. 기술적 경험](#-기술적-경험)

- [FE](#FE)
  - [R3F Camera](#r3f-camera)
  - [성능 최적화](#성능-최적화)
  - [FSD 아키텍처](#fsd-아키텍처)
- [BE](#BE)
  - [TDD, e2e 및 유닛 테스트](#tdd-e2e-및-유닛-테스트)
  - [인증/인가](#인증인가)
  - [트랜잭션 제어, 쿼리 최적화](#트랜잭션-제어-쿼리-최적화)
  - [NestJS Enhancers](#NestJS-Enhancers)
  - [배포 및 자동화](#배포-및-자동화)
  - [admin 페이지 구현](#admin-페이지-구현)

### [4. 팀원 소개](#%EF%B8%8F-팀원-소개)

- [J010 김가은](#-j010-김가은-fe)
- [J016 김동민](#-j016-김동민-fe)
- [J053 박재하](#-j053-박재하-be)
- [J073 송준섭](#-j073-송준섭-be)
- [J098 이백범](#-j098-이백범-fe)

### [5. 팀원 회고](#-팀원-회고)

<br />

# ⭐️ 프로젝트 소개

## < 캐치마인드 >를 만들게 된 계기

node.js 스터디를 하면서 socket 공부를 하게 되었고 , 이를 직접 프로젝트에 적용시켜보기 위해 어떤 프로젝트가 적합할지
생각하다. 캐치마인드가 적합한 프로젝트라고 생각하게 되었고. 직접 socket을 통해서 구현 시켜보았습니다.

<br />

## 주요 기능 설명

### [ 마이페이지 이미지 및 정보 수정 ]

<img src="./src/asset/readmeImg/mypage.gif" alt="마이페이지 이미지 수정">

- 마이페이지 부분에서 사진을 업로드해 crop해서 프로필 이미지를 등록 할 수 있습니다.
- nickname, email, password 수정이 가능합니다.

### [ 방 입장 ]

<img src="./src/asset/readmeImg/roomenter.gif" alt="방 입장">

- 생성된 방에 입장하여 다른 사람들과 실시간으로 게임을 즐길 수 있습니다.
- 방을 생성할수도 있습니다.

### [ 게임시작 및 그림그리기 ]

<img src="./src/asset/readmeImg/startdraw.gif" alt="그림그리기">

- 게임이 시작된 후 그림을 제시어를 받고 제한 시간 안에 그림을 그려서 상대방과 실시간으로 게임을 합니다.

### [ 그림 맞추기 ]

<img src="./src/asset/readmeImg/answer.gif" alt="그림 맞추기">

- 상대방이 그리는 그림을 보고 실시간으로 상대방이 무엇을 그리고 있는 지 정답을 맞출 수 있습니다.

### [ 게임 종료 및 결과 모달 ]

<img src="./src/asset/readmeImg/result.gif" alt="게임 종료"/>

- 3점을 달성한 유저가 있을시 게임을 종료합니다.
- 이번판 유저들이 얻은 점수를 모달로 확인 할 수 있습니다.

<br />

## 프로젝트 실행 방법

### Front-end

```bash
npm run dev
```

### Back-end

```bash
node app.js
```

<br />

# ⚒️ 기술 스택

## Backend

<div align="center">
<img src="https://img.shields.io/badge/Node.js-20.10.0-339933?logo=node.js"> <img src="https://img.shields.io/badge/Javascript--3178C6?logo=javascript"> 
<img src="https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript"> 
</div>
<br />
<div align="center">
<img src="https://img.shields.io/badge/Docker-20.10.21-2496ED?logo=docker">
</div>
<br />
<div align="center">
  <img src="https://img.shields.io/badge/MongoDB-4.4.17-47A248?logo=mongodb"> <img src="https://img.shields.io/badge/Mongoose-8.4.1-47A248?logo=mongodb">
</div>

## Frontend

<div align="center">
  <br />
  <img src="https://img.shields.io/badge/React-18.2.0-61DBFB?logo=react"> <img src="https://img.shields.io/badge/ReactQuery-3.39.3-FF4154?logo=react-query"><img src="https://img.shields.io/badge/Zustand-4.5.2-7F52FF?logo=redux"> 
</div>

<div align="center">
<img src="https://img.shields.io/badge/TailwindCSS-3.4.3-06B6D4?logo=tailwindcss">
<img src="https://img.shields.io/badge/Vite-5.2.0-06B6D4?logo=vite">
<img src="https://img.shields.io/badge/Vite-1.7.2-06B6D4?logo=axios">
</div>

# 💪🏻 기술적 경험

## FE

<br />

### R3F Camera

<br />

### 성능 최적화

<br />

## BE

**테스트와 쿼리 로그 분석을 통한 이유 있는 코드 작성**

### TDD, e2e 및 유닛 테스트

#### 학습 및 개발 기록

<br />

### 인증/인가

#### 학습 및 개발 기록

<br />

### 트랜잭션 제어, 쿼리 최적화

#### 학습 및 개발 기록

<br />

### NestJS Enhancers

#### 학습 및 개발 기록

<br />

### 배포 및 자동화

#### 학습 및 개발 기록

<br />

### admin 페이지 구현

<br />

# 🏃‍♂️ 팀원 소개

[🔗 wiki 팀원 소개 바로가기](https://github.com/boostcampwm2023/web16-B1G1/wiki/%ED%8C%80%EC%9B%90-%EC%86%8C%EA%B0%9C)

<table >
  <tr height="130px">
    <td align="center" width="130px">
      <a href="https://github.com/KimGaeun0806"><img src="https://avatars.githubusercontent.com/u/80266418?v=4" style="border-radius:50%"/></a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/MinboyKim"><img src="https://avatars.githubusercontent.com/u/35567292?v=4" style="border-radius:50%" /></a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/qkrwogk"><img src="https://avatars.githubusercontent.com/u/138586629?v=4" style="border-radius:50%"/></a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/SongJSeop"><img src="https://avatars.githubusercontent.com/u/101378867?v=4" style="border-radius:50%"/></a>
    </td>
<td align="center" width="130px">
      <a href="https://github.com/bananaba"><img src="https://avatars.githubusercontent.com/u/78800560?v=4" style="border-radius:50%"/></a>
    </td>
  </tr>
  <tr height="50px">
    <td align="center" width="130px">
      <a href="https://github.com/KimGaeun0806">J010 김가은</a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/MinboyKim">J016 김동민</a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/qkrwogk">J053 박재하</a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/SongJSeop">J073 송준섭</a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/bananaba">J098 이백범</a>
    </td>
  </tr>
</table>

<br />

## 🐙 J010 김가은 (FE)

- 블로그: https://velog.io/@greencloud
- 깃허브: https://github.com/KimGaeun0806
- <별 하나에 글 하나>에서의 목표: 프로젝트 과정 하나하나 모두 기록으로 남기기. 기술블로그 열심히 써보기 👻

## 🐧 J016 김동민 (FE)

- 블로그: https://velog.io/@minboykim
- 깃허브: https://github.com/MinboyKim
- <별 하나에 글 하나>에서의 목표: 좋은사람들과 좋은시간보내기 ☕️

## 👾 J053 박재하 (BE)

- 블로그: https://velog.io/@qkrwogk
- 깃허브: https://github.com/qkrwogk
- <별 하나에 글 하나>에서의 목표: 딥 다이브 경험! 🌊

## ⚽️ J073 송준섭 (BE)

- 블로그: https://velog.io/@songjseop
- 깃허브: https://github.com/SongJSeop
- <별 하나에 글 하나>에서의 목표: 팀원들과 후회 없는 시간 보내기

## 🐰 J098 이백범 (FE)

- 블로그: https://velog.io/@200tiger
- 깃허브: https://github.com/bananaba
- <별 하나에 글 하나>에서의 목표: 재미있는 결과물 만들기!

<br />

# 🍡 팀원 회고

- J010 김가은
  - [부스트캠프 8기를 끝마치며 (Feat. 네트워킹데이 후기)](https://velog.io/@greencloud/%EB%B6%80%EC%8A%A4%ED%8A%B8%EC%BA%A0%ED%94%84-8%EA%B8%B0%EB%A5%BC-%EB%81%9D%EB%A7%88%EC%B9%98%EB%A9%B0-Feat.-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%82%B9%EB%8D%B0%EC%9D%B4-%ED%9B%84%EA%B8%B0)
