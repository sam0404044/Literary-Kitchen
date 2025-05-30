# tasks.md

## Step by Step Refactoring Tasks

- [x] 1. 初始化 Vite + Vue 3 + TypeScript 專案架構

  - 使用 Vite 建立新專案，選擇 Vue 3 + TypeScript 模板
  - 移除預設範例檔案，準備導入現有內容

- [x] 2. 導入 eslint 與 auto-formatter（Prettier）

  - 安裝 eslint、prettier 及相關 Vue/TypeScript 插件
  - 設定 lint 與格式化規則

- [x] 3. 導入 Pinia 狀態管理

  - 安裝 Pinia
  - 設定專案入口與基本 store 架構

- [x] 4. 拆分 index.html 為 Vue 元件

  - 將 QRCode Reader、欄位群組、退出按鈕等區塊模組化為單獨 Vue component
  - 拆分樣式至獨立 CSS/SCSS 或 <style> 區塊

- [x] 5. 整合 Sentry 前端錯誤追蹤

  - 安裝 @sentry/vue
  - 在 main.ts 初始化 Sentry，支援環境變數 DSN

- [x] 6. 導入 API service 與 mock 機制

  - API_DOMAIN 由 .env 檔案中取得
  - 將 API 呼叫封裝於 services/
  - 建立 **mocks**/ 方便單元測試時替換

- [ ] 6-1. 處理 CORS 問題

  - [x] DEV: 使用 Vite dev server 的 proxy 功能
  - [ ] PROD: 使用 Nginx 反向代理

- [ ] 6-2. QR Code 相機測試

  - [ ] 檢查相機權限
  - [ ] 檢查相機是否正常運作

- [x] 7. 撰寫單元測試（Vitest + Vue Test Utils）

  - [x] 安裝 Vitest、@vue/test-utils
  - [x] 建立 `tests/unit/` 目錄與 Vitest 設定檔
  - [x] QrReader.vue：撰寫基本渲染與互動測試
  - [x] ExitButton.vue：撰寫點擊事件測試
  - [x] FlavorColumn.vue：撰寫 props 與事件測試
  - [x] FlavorColumns.vue：撰寫整合測試
  - [x] SystemAlert.vue：撰寫顯示/隱藏測試
  - [x] mock API service 行為
  - [x] 整合 CI 測試指令（如 npm run test:unit）

- [x] 8. 驗證與優化
  - [x] 執行 lint、format、單元測試，確保專案可正常運作
  - [ ] 檢查 Sentry 是否正常上報錯誤
