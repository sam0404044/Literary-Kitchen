# -Literary-Kitchen
台北文學糧倉的數位策展，掃描你的文學風味，每一種類型都是一種角色與味覺的交會。


## ADR（Architecture Decision Record）

### 前端選項快取與 QR 掃描比對設計

- 前端於初始化時會從後端 API 取得三種 options（主食、配餐、飲品）所有可選列表，並快取於 Pinia store。
- 使用者掃描 QR code 時，QR code 僅帶有 type（A/B/C）與 value（名稱），前端會根據 type 於對應 options 列表中查找完全符合 value 的選項。
- 只有當 options 列表中存在該 value，才會將該選項 select 到 state，否則顯示錯誤訊息。
- 此設計可避免 QR code value 不可控時的資料不一致問題，確保所有選擇皆有後端資料對應。
- 若 options 有異動，前端可透過 fetchOptions 重新拉取。

