# dev-plan.md

## Refactoring 目標

- package: vite
- framework: vue 3
- state: Pinia
- type: TypeScript
- unit test: Vitest + Vue Test Utils

---

## ADR（Architectural Decision Records）

- 本專案將以 Vite 作為開發與建置工具，提升開發效率與現代化模組管理。
- 前端框架選用 Vue 3，並配合 Composition API 實現元件化、模組化開發。
- 狀態管理採用 Pinia，確保狀態集中與型別安全。
- 專案全面採用 TypeScript 強化型別檢查與可維護性。
- 單元測試採用 Vitest 搭配 Vue Test Utils，確保元件與邏輯的可測試性。
- 持續整合 Sentry 以追蹤前端錯誤。
- 將 API service 與 UI 元件分離，方便 mock 與單元測試。

---

## 近期重構重點

1. 導入 Vite + Vue 3 + TypeScript 基礎專案架構。
2. 拆分現有 index.html 為 Vue 元件，並依功能模組化。
3. 整合 Pinia 狀態管理。
4. 導入 Sentry 前端錯誤追蹤。
5. 撰寫單元測試（Vitest + Vue Test Utils），並 mock API 服務。
6. 建立 eslint 與 auto-formatter 設定，維持程式碼品質。

---

如有新需求或重大決策，請於 ADR 區塊補充記錄。
