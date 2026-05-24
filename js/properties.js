/* ============================
   JUSUO 居所 - 房源查詢頁 JavaScript
   ============================ */

let allProperties = [];
let currentFilters = {
  district: '',
  maxPrice: '',
  type: '',
  rentType: 'all'
};

// ============================
// 載入 JSON 資料
// ============================
async function loadProperties() {
  try {
    const res = await fetch('../data/properties.json');
    allProperties = await res.json();
    renderProperties(allProperties);
    updateCount(allProperties.length);
  } catch (err) {
    console.error('載入房源資料失敗：', err);
    document.getElementById('properties-grid').innerHTML =
      '<p class="col-span-full text-center py-12" style="color:var(--text-mid)">載入房源資料時發生錯誤，請重新整理頁面。</p>';
  }
}

// ============================
// 篩選邏輯
// ============================
function filterProperties() {
  return allProperties.filter(function (p) {
    if (currentFilters.district && p.district !== currentFilters.district) return false;
    if (currentFilters.maxPrice && p.price > parseInt(currentFilters.maxPrice)) return false;
    if (currentFilters.type && p.type !== currentFilters.type) return false;
    if (currentFilters.rentType !== 'all' && p.rentType !== currentFilters.rentType) return false;
    return true;
  });
}

// ============================
// 更新結果數量
// ============================
function updateCount(count) {
  const el = document.getElementById('result-count');
  if (el) el.textContent = count;
}

// ============================
// 渲染卡片
// ============================
function renderProperties(list) {
  const grid = document.getElementById('properties-grid');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-20">
        <div class="text-6xl mb-6">🏠</div>
        <h3 class="text-xl font-semibold mb-2" style="color:var(--text-dark)">找不到符合條件的房源</h3>
        <p class="mb-6" style="color:var(--text-mid)">請調整篩選條件，或聯絡我們為您客製搜尋</p>
        <a href="contact.html" class="btn-primary" style="background:var(--brand-brown);color:white;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:600;">聯絡我們</a>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(function (p) {
    const rentBadge = p.rentType === '長租'
      ? '<span class="badge-long text-xs font-semibold px-3 py-1 rounded-full">長租</span>'
      : '<span class="badge-short text-xs font-semibold px-3 py-1 rounded-full">短租</span>';

    const priceUnit = p.rentType === '短租' ? '/晚' : '/月';
    const priceFormatted = p.price.toLocaleString('zh-TW');

    const availableBadge = p.available
      ? '<span class="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full" style="background:rgba(122,158,126,0.9);color:white;">可租</span>'
      : '<span class="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full" style="background:rgba(100,100,100,0.8);color:white;">已租出</span>';

    const features = p.features.slice(0, 3).map(function (f) {
      return `<span class="text-xs px-2 py-1 rounded" style="background:var(--bg-light);color:var(--text-mid);">${f}</span>`;
    }).join('');

    return `
      <div class="property-card cursor-pointer" onclick="window.location.href='properties.html'">
        <div class="relative overflow-hidden" style="height:220px;">
          <div class="w-full h-full flex items-center justify-center text-sm font-medium" style="background:#D4C4B5; color:#6B5B4E;">${p.title}</div>
          ${availableBadge}
          <div class="absolute top-3 right-3 flex gap-1">
            ${rentBadge}
          </div>
        </div>
        <div class="p-5">
          <h3 class="font-bold text-base mb-1" style="color:var(--text-dark);">${p.title}</h3>
          <p class="text-sm mb-3" style="color:var(--text-mid);">
            <svg class="w-3.5 h-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            ${p.city} ${p.district} ・ ${p.floor} ・ ${p.size} 坪
          </p>
          <div class="flex flex-wrap gap-1.5 mb-4">${features}</div>
          <div class="flex items-center justify-between">
            <div>
              <span class="text-xl font-bold" style="color:var(--brand-brown);">NT$${priceFormatted}</span>
              <span class="text-sm" style="color:var(--text-mid);">${priceUnit}</span>
            </div>
            <span class="text-sm px-3 py-1 rounded-full" style="background:var(--bg-light);color:var(--text-mid);">${p.type}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ============================
// 事件綁定
// ============================
document.addEventListener('DOMContentLoaded', function () {
  loadProperties();

  // 區域篩選
  const districtSelect = document.getElementById('filter-district');
  if (districtSelect) {
    districtSelect.addEventListener('change', function () {
      currentFilters.district = this.value;
      const filtered = filterProperties();
      renderProperties(filtered);
      updateCount(filtered.length);
    });
  }

  // 租金篩選
  const priceSelect = document.getElementById('filter-price');
  if (priceSelect) {
    priceSelect.addEventListener('change', function () {
      currentFilters.maxPrice = this.value;
      const filtered = filterProperties();
      renderProperties(filtered);
      updateCount(filtered.length);
    });
  }

  // 房型篩選
  const typeSelect = document.getElementById('filter-type');
  if (typeSelect) {
    typeSelect.addEventListener('change', function () {
      currentFilters.type = this.value;
      const filtered = filterProperties();
      renderProperties(filtered);
      updateCount(filtered.length);
    });
  }

  // 長/短租 Tab
  const rentTypeBtns = document.querySelectorAll('[data-rent-type]');
  rentTypeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      rentTypeBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      currentFilters.rentType = this.dataset.rentType;
      const filtered = filterProperties();
      renderProperties(filtered);
      updateCount(filtered.length);
    });
  });

  // 重設篩選
  const resetBtn = document.getElementById('reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      currentFilters = { district: '', maxPrice: '', type: '', rentType: 'all' };
      if (districtSelect) districtSelect.value = '';
      if (priceSelect) priceSelect.value = '';
      if (typeSelect) typeSelect.value = '';
      rentTypeBtns.forEach(function (b) {
        b.classList.remove('active');
        if (b.dataset.rentType === 'all') b.classList.add('active');
      });
      renderProperties(allProperties);
      updateCount(allProperties.length);
    });
  }
});
