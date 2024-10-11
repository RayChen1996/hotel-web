# 旅館訂房網站

這是一個旅館訂房網站的前後台專案，提供用戶查詢、預訂及管理旅館的功能。該網站使用 RESTful API 與前端框架進行集成，並提供用戶友好的介面。

## 目錄

- [功能](#功能)
- [技術棧](#技術棧)
- [使用套件](#使用套件)
- [API 文件](#api-文件)

## 功能

- **前台功能**

  - 瀏覽旅館列表
  - 旅館詳情
  - 預訂旅館
  - 登入/註冊
  - 預訂管理

- **管理後台功能**
  - 登入/註冊管理後台
  - 管理旅館資料（新增、刪除）
  - 查看所有預訂記錄
  - 訂單管理
  - 房型管理

## 技術棧

- 前端：React(Next.js)、Zustand、Axios、react-query
- 認證：JWT（JSON Web Token）
- 部署：Render、Vercel

## 使用套件

以下是專案中使用的主要套件：

- `@hookform/resolvers`: ^3.9.0
- `@tanstack/react-query`: ^5.59.0
- `aos`: ^2.3.4
- `validator`: ^13.11.0
- `axios`: ^1.7.7
- `deepmerge-ts`: ^5.1.0
- `fast-equals`: ^5.0.1
- `clsx`: ^2.1.0
- `date-fns`: ^2.30.0
- `jotai`: ^2.10.0
- `next`: 14.2.14
- `next-image-export-optimizer`: ^1.12.3
- `numbro`: ^2.4.0
- `react`: ^18
- `react-dom`: ^18
- `react-hook-form`: ^7.53.0
- `react-hot-toast`: ^2.4.1
- `swiper`: ^11.0.5
- `zod`: ^3.23.8
- `zustand`: ^4.4.7

## API 文件

[API 文件](https://freyja-vw02.onrender.com/swagger)

## DEMO

[展示網址](https://hotel-web-three.vercel.app/)
