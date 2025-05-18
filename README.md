# Literary Kitchen Frontend

## 建議開發環境

- Node.js 18.x 或 20.x（建議 LTS 版本）
- npm：隨 Node.js 版本安裝，建議 9.x 以上
- Vite：6.3.5
- TypeScript：5.8.3

> 如需安裝指定版本 Vite 或 TypeScript，可執行：
>
> ```sh
> npm install vite@6.3.5 typescript@5.8.3 --save-dev
> ```

### 安裝依賴

```sh
npm install
```

### 啟動開發伺服器

```sh
npm run dev
```

### 建置正式版

```sh
npm run build
```

產出於 `dist/` 目錄。

### 型別管理

- 所有 Backend API interface 集中於 `src/services/api-types.ts`，如需擴充或修改 schema，請統一於此檔案維護。

## ADR（Architecture Decision Record）

### 前端選項快取與 QR 掃描比對設計

- 前端於初始化時會從後端 API 取得三種 options（主食、配餐、飲品）所有可選列表，並快取於 Pinia store。
- 使用者掃描 QR code 時，QR code 僅帶有 type（A/B/C）與 value（名稱），前端會根據 type 於對應 options 列表中查找完全符合 value 的選項。
- 只有當 options 列表中存在該 value，才會將該選項 select 到 state，否則顯示錯誤訊息。
- 此設計可避免 QR code value 不可控時的資料不一致問題，確保所有選擇皆有後端資料對應。
- 若 options 有異動，前端可透過 fetchOptions 重新拉取。
