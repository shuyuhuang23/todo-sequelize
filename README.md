# 我的待辦事項

![Index page about Todo List](./public/snapshot_20220206.png)

## 介紹

記錄自己的待辦事項，可以瀏覽、記錄是否完成、修改、刪除紀錄。

## 功能

- 使用者註冊/登入/登出
- 瀏覽所有事項
- 瀏覽特定事項
- 新增一筆事項
- 修改一筆事項
- 刪除一筆事項

## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install
   ```
4. (optional) 安裝完畢後，若需要使用腳本創建種子資料，請輸入：

   ```bash
   npx sequelize db:seed:all
   ```

5. 使用腳本，啟動伺服器，請繼續輸入：

   ```bash
   npm run start
   ```

6. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

   ```bash
   Listening on http://localhost:3000
   ```

7. 若欲暫停使用

   ```bash
   ctrl + c
   ```

## 開發工具

- Node.js 10.15.0
- Express 4.17.2
- Express-Handlebars 6.0.2
- Bootstrap 4.3.1
- sequelize 6.15.0
- passport 0.5.2