/* ============================
   JUSUO 居所 - 主要 JavaScript
   ============================ */

document.addEventListener('DOMContentLoaded', function () {

  // ============================
  // 導覽列 Scroll Shadow
  // ============================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ============================
  // 漢堡選單（手機版）
  // ============================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      // 切換圖示
      const isOpen = mobileMenu.classList.contains('open');
      hamburger.innerHTML = isOpen
        ? `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
           </svg>`
        : `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
           </svg>`;
    });
  }

  // ============================
  // 手機版子選單 click 展開
  // ============================
  const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
  mobileDropdownToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      const submenu = this.nextElementSibling;
      if (submenu && submenu.classList.contains('mobile-submenu')) {
        submenu.classList.toggle('open');
        const arrow = this.querySelector('.dropdown-arrow');
        if (arrow) {
          arrow.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : '';
        }
      }
    });
  });

  // ============================
  // 關閉手機選單（點選連結後）
  // ============================
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        if (hamburger) {
          hamburger.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>`;
        }
      });
    });
  }

  // ============================
  // FAQ Accordion
  // ============================
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const isOpen = this.classList.contains('open');

      // 關閉其他
      faqQuestions.forEach(function (q) {
        q.classList.remove('open');
        if (q.nextElementSibling) {
          q.nextElementSibling.classList.remove('open');
        }
      });

      // 切換目前
      if (!isOpen) {
        this.classList.add('open');
        if (answer) answer.classList.add('open');
      }
    });
  });

  // ============================
  // Before/After 比較滑桿
  // ============================
  const baContainers = document.querySelectorAll('.before-after-container');
  baContainers.forEach(function (container) {
    const divider = container.querySelector('.before-after-divider');
    const afterImg = container.querySelector('.after-img');
    let isDragging = false;

    if (!divider || !afterImg) return;

    function updatePosition(x) {
      const rect = container.getBoundingClientRect();
      let percent = ((x - rect.left) / rect.width) * 100;
      percent = Math.max(5, Math.min(95, percent));
      divider.style.left = percent + '%';
      afterImg.style.width = percent + '%';
    }

    divider.addEventListener('mousedown', function (e) {
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
      if (isDragging) updatePosition(e.clientX);
    });

    document.addEventListener('mouseup', function () {
      isDragging = false;
    });

    // 觸控支援
    divider.addEventListener('touchstart', function (e) {
      isDragging = true;
      e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchmove', function (e) {
      if (isDragging && e.touches[0]) {
        updatePosition(e.touches[0].clientX);
      }
    });

    document.addEventListener('touchend', function () {
      isDragging = false;
    });

    // 初始位置 50%
    updatePosition(container.getBoundingClientRect().left + container.getBoundingClientRect().width * 0.5);
  });

  // ============================
  // 平滑滾動（頁內錨點）
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar 高度
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ============================
  // 數字計數動畫
  // ============================
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const start = performance.now();
    const startVal = 0;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(startVal + (target - startVal) * eased);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }

    requestAnimationFrame(update);
  }

  // 用 IntersectionObserver 觸發計數
  const counters = document.querySelectorAll('[data-target]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  // ============================
  // 表單提交（FormSpree 佔位）
  // ============================
  document.querySelectorAll('form[data-formspree]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (btn) {
        btn.textContent = '傳送中...';
        btn.disabled = true;
      }
      // 模擬送出成功
      setTimeout(function () {
        form.innerHTML = '<div class="text-center py-8"><div class="text-4xl mb-4">✓</div><p class="text-lg font-semibold" style="color:var(--brand-brown)">感謝您的來訊！</p><p class="text-sm mt-2" style="color:var(--text-mid)">我們將於 24 小時內與您聯繫。</p></div>';
      }, 1000);
    });
  });

});
