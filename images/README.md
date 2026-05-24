# JUSUO 居所 - 圖片資料夾說明

## 資料夾結構

```
images/
├── logo/          → 品牌 Logo 相關圖片
├── hero/          → 各頁面大圖（Hero）
├── properties/    → 房源照片
├── renovation/    → 改造案例照片（改造前 / 改造後）
├── team/          → 團隊與創辦人照片
├── commercial/    → 商業空間照片
├── blog/          → 部落格文章封面圖
└── uploads/       → Decap CMS 上傳的圖片（自動管理，請勿手動修改）
```

---

## 各資料夾說明

### logo/
- `logo-main.png` — 主 Logo（深色底使用）
- `logo-white.png` — 白色版 Logo（深色背景使用）
- `logo-icon.png` — 僅圖示（方形，用於 favicon 和小尺寸使用）
- **格式需求**：PNG（有透明背景）
- **建議尺寸**：寬度至少 400px

### hero/
- `hero-home.jpg` — 首頁全螢幕大圖
- `hero-about.jpg` — 關於我們頁 Hero
- `hero-management.jpg` — 委託管理頁 Hero
- `hero-renovation.jpg` — 空間改造頁 Hero
- `hero-commercial.jpg` — 商空租借頁 Hero
- **格式需求**：JPG
- **建議尺寸**：1920 × 1080px，不超過 500KB

### properties/
房源封面照，命名格式：`{id}_{地區}_{房型}.jpg`

例如：
- `001_中山套房_主.jpg`
- `001_中山套房_客廳.jpg`
- `001_中山套房_浴室.jpg`

**格式需求**：JPG
**建議尺寸**：800 × 600px（4:3），不超過 200KB

### renovation/
改造案例照片，命名格式：`{案例編號}_before.jpg` 和 `{案例編號}_after.jpg`

例如：
- `case001_before.jpg` — 中山公寓改造前
- `case001_after.jpg` — 中山公寓改造後

**格式需求**：JPG
**建議尺寸**：1200 × 800px，不超過 400KB

### team/
- `sean.jpg` — 創辦人 Sean 照片（正式形象照）
- `team_group.jpg` — 團隊合照
- **格式需求**：JPG
- **建議尺寸**：600 × 600px（1:1 正方形），不超過 150KB

### commercial/
商業空間照片，命名格式：`space_{編號}_{角度}.jpg`

例如：
- `space_A_main.jpg` — A 場地主照
- `space_A_detail.jpg` — A 場地細節照

**格式需求**：JPG
**建議尺寸**：1200 × 800px，不超過 400KB

### blog/
部落格文章封面圖，命名格式：`{YYYYMMDD}_{文章縮寫}.jpg`

例如：
- `20260515_contract-traps.jpg`
- `20260510_ai-prompt.jpg`

**格式需求**：JPG
**建議尺寸**：1200 × 630px（Open Graph 尺寸），不超過 300KB

---

## 通用規則

1. **命名規則**：使用英文+數字+底線，不使用中文和空格
2. **格式建議**：Hero/大圖用 JPG，Logo 用 PNG
3. **壓縮工具**：建議先用 [TinyPNG](https://tinypng.com/) 或 [Squoosh](https://squoosh.app/) 壓縮後再上傳
4. **替換佔位圖**：目前所有頁面使用 Unsplash 免費圖片 URL 佔位，替換時將 `<img>` 的 `src` 屬性改為 `images/{資料夾}/{檔名}` 即可
5. **避免超大圖**：單張圖片不超過 500KB，避免影響頁面載入速度

---

## 快速替換指引

替換首頁 Hero 圖片：
```html
<!-- 找到這行 -->
<img src="https://images.unsplash.com/photo-XXXXX..." ...>

<!-- 改成 -->
<img src="images/hero/hero-home.jpg" ...>
```

替換房源卡片圖片：
```json
// 修改 data/properties.json 中的 image 欄位
"image": "images/properties/001_中山套房_主.jpg"
```
