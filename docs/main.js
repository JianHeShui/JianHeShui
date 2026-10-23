/* ============================================================================
   JianHeShui · GitHub Pages — 渐进增强脚本
   ----------------------------------------------------------------------------
   这里只做「增强」：页面的全部内容与可读性都由 HTML + CSS 负责。
   JS 被禁用 / 报错时，导航、项目、技术栈、关于、页脚依然完整可见。
   零依赖、无外部请求。
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var STORE_KEY = 'theme';
  var media = window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: light)')
    : null;

  /* -------------------------------------------------------------------------
     1. 主题：系统偏好为默认，手动选择（data-theme + localStorage）优先
     ------------------------------------------------------------------------- */
  function systemTheme() {
    return media && media.matches ? 'light' : 'dark';
  }

  function storedTheme() {
    try {
      var v = localStorage.getItem(STORE_KEY);
      return v === 'light' || v === 'dark' ? v : null;
    } catch (e) {
      return null;
    }
  }

  function currentTheme() {
    return root.getAttribute('data-theme') || systemTheme();
  }

  var toggle = document.getElementById('theme-toggle');

  function syncToggle() {
    if (!toggle) return;
    var next = currentTheme() === 'dark' ? '浅色' : '深色';
    var label = '切换到' + next + '主题';
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
  }

  if (toggle) {
    syncToggle();

    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem(STORE_KEY, next);
      } catch (e) {
        /* 隐私模式写不进去就只在本次会话内生效 */
      }
      syncToggle();
    });

    /* 没手动选过时，系统切换主题要跟着变，按钮说明也要跟着更新 */
    if (media) {
      var onSystemChange = function () {
        if (!root.getAttribute('data-theme')) syncToggle();
      };
      if (media.addEventListener) {
        media.addEventListener('change', onSystemChange);
      } else if (media.addListener) {
        media.addListener(onSystemChange);
      }
    }
  }

  /* -------------------------------------------------------------------------
     2. 导航：滚过一点点之后加毛玻璃底 + 细边框
     ------------------------------------------------------------------------- */
  var nav = document.getElementById('nav');
  var ticking = false;

  function applyNav() {
    ticking = false;
    if (!nav) return;
    var y = window.pageYOffset || root.scrollTop || 0;
    if (y > 10) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(applyNav);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  applyNav();

  /* -------------------------------------------------------------------------
     3. 滚动进场
     只处理「初始就在首屏下方」的区块：先隐藏，进入视口时再淡入上移。
     两条保险：
       · 视口 ≥1200px 时整页几乎一屏可见，位移入场没有意义，直接全部显示
         （同时也保证长截图/大屏下不会出现半透明的内容）；
       · prefers-reduced-motion 匹配时完全跳过。
     ------------------------------------------------------------------------- */
  var reduceMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  var canObserve = 'IntersectionObserver' in window;
  var shortViewport = window.innerHeight < 1200;

  if (!reduceMotion && canObserve && shortViewport) {
    var revealItems = document.querySelectorAll('[data-reveal]');
    var pending = [];
    var i;

    for (i = 0; i < revealItems.length; i++) {
      var rect = revealItems[i].getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.92) {
        revealItems[i].classList.add('reveal-hidden');
        pending.push(revealItems[i]);
      }
    }

    if (pending.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          for (var j = 0; j < entries.length; j++) {
            if (entries[j].isIntersecting) {
              entries[j].target.classList.remove('reveal-hidden');
              observer.unobserve(entries[j].target);
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      );

      for (i = 0; i < pending.length; i++) {
        observer.observe(pending[i]);
      }
    }
  }

  /* -------------------------------------------------------------------------
     4. 项目卡片：光斑跟随鼠标（写入 --mx / --my，由 CSS 画径向渐变）
     仅在精确指针设备上绑定，触屏不做无意义的计算。
     ------------------------------------------------------------------------- */
  var canHover = window.matchMedia
    ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
    : false;

  if (canHover && window.requestAnimationFrame) {
    var cards = document.querySelectorAll('.project');
    var queued = null;
    var frame = 0;

    function flush() {
      frame = 0;
      if (!queued) return;
      queued.card.style.setProperty('--mx', queued.x);
      queued.card.style.setProperty('--my', queued.y);
      queued = null;
    }

    function schedule(card, x, y) {
      queued = { card: card, x: x, y: y };
      if (!frame) frame = window.requestAnimationFrame(flush);
    }

    function bindGlow(card) {
      card.addEventListener(
        'pointermove',
        function (e) {
          var r = card.getBoundingClientRect();
          if (!r.width || !r.height) return;
          schedule(
            card,
            ((e.clientX - r.left) / r.width * 100).toFixed(2) + '%',
            ((e.clientY - r.top) / r.height * 100).toFixed(2) + '%'
          );
        },
        { passive: true }
      );

      card.addEventListener('pointerleave', function () {
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
      });
    }

    for (var c = 0; c < cards.length; c++) {
      bindGlow(cards[c]);
    }
  }

  /* -------------------------------------------------------------------------
     5. 页脚年份：HTML 里已写死 2026，JS 只在跨年后纠正
     ------------------------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    var now = new Date().getFullYear();
    if (String(now) !== yearEl.textContent) {
      yearEl.textContent = String(now);
    }
  }
})();
