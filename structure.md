# structure.md

## 1. 主要檔案與資料夾

- `App.vue`：主應用元件，組合各子元件，管理全域 alert（error 狀態）。
- `main.ts`：Vue 入口，註冊 Pinia 狀態管理與 Sentry。
- `style.css`：全域樣式。
- `vite-env.d.ts`：型別定義。
- `assets/`：靜態資源（如圖片）。
- `components/`：前端元件。
- `services/`：API 與型別、mock 服務。
- `store/`：Pinia 狀態管理。

## 2. components/

- `QrReader.vue`：QR 掃描元件，emit `onScan` 事件。
- `FlavorColumn.vue`、`FlavorColumns.vue`：顯示菜單選項的元件。
- `ExitButton.vue`：重置按鈕。
- `SystemAlert.vue`：全域 alert，根據 error 狀態顯示。

## 3. services/

- `api.ts`：API 請求。
- `api-types.ts`：API 型別。
- `__mocks__/api.ts`：mock 服務。

## 4. store/

- `appState.ts`：Pinia 狀態，管理選項、選擇、error 狀態等。

---

### 專案工具與全域 alert 機制

- 全域錯誤訊息（alert）由 `appState.error` 控制，`SystemAlert` 元件負責顯示。
- 只要將錯誤訊息寫入 `appState.error`，即可觸發 alert。
- `App.vue` 已經將 `SystemAlert` 放在最外層，並監聽 error 狀態。
