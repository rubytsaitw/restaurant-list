# 我的餐廳清單

用 Node.js + Express 製作的餐廳美食網站，將餐廳的基本資料一網打盡，一覽無遺。製作自己的美食地圖，不知道吃什麼的時候，用關鍵字搜尋就對了！
使用者可以註冊、登入，就可以收藏並管理自己的餐廳清單！

## 功能列表

- 使用者可以註冊帳號或用Facebook login，就可以建立並管理自己的餐廳清單
- 依照餐廳名稱及餐廳類別搜尋
- 檢視餐廳詳細資訊，包含類別、評分、簡介、地址、電話、圖片，點擊連結至Google Maps。
- 自行新增、修改、刪除餐廳資訊

## 專案畫面

![image](https://github.com/rubytsaitw/restaurant-list/blob/main/public/img/home.png)

![image](https://github.com/rubytsaitw/restaurant-list/blob/main/public/img/user1.png)

## Environment SetUp - 環境建置

1. [Node.js](https://nodejs.org/en/)
2. [Express.js](https://expressjs.com/)
3. [Handlebars](https://handlebarsjs.com/)

## Install - 安裝流程

1. 在終端機輸入指令 Clone 此專案至本機電腦，並安裝相關套件
```
git clone https://github.com/rubytsaitw/restaurant-list
cd restaurant-list
npm install
```
2. 設定環境變數檔案，將檔案 .env.example 檔名改為 .env。  
若要使用 facebook login ，則需要先在 [Facebook for Developers](https://developers.facebook.com/) 中建立應用程式，將應用程式編號和密鑰填入 .env，即可使用 facebook login 功能。

3. 新增種子資料
```
npm run seed
```
4. 啟動專案
```
npm run dev
```
5. 當 terminal 出現以下字樣，表示啟動完成

```
App is running on http://localhost:3000
```

請至[http://localhost:3000](http://localhost:3000)開始使用程式


## Contributor - 專案開發人員

> [Ruby Tsai](https://github.com/rubytsaitw)