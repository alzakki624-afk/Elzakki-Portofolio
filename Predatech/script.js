// ============================================================
// ELZAKKI PORTFOLIO — Main Script (Semua halaman)
// ============================================================

// --- Hamburger Menu ---
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

// --- Modal ---
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function handleOverlay(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

// --- Comment Form ---
function submitComment(e) {
  e.preventDefault();
  alert('Terima kasih! Komentar Anda telah dikirim.');
  e.target.reset();
}

// --- Gallery Filter ---
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-full-item').forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
      });
    });
  });
}

// --- Scroll Reveal Animation ---
function initScrollReveal() {
  const els = document.querySelectorAll('.scroll-reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => observer.observe(el));
}

// --- Mode System ---
const MODES = ['default', 'clear', 'tinted'];
const MODE_LABELS = { default: 'Default', clear: 'Clear', tinted: 'Tinted' };
let currentModeIndex = 0;

function applyMode(mode, save = true) {
  MODES.forEach(m => document.body.classList.remove('mode-' + m));
  document.body.classList.add('mode-' + mode);
  const label = MODE_LABELS[mode];
  const modeBtn = document.getElementById('modeBtn');
  const modeBtnMobile = document.getElementById('modeBtnMobile');
  if (modeBtn) modeBtn.textContent = label;
  if (modeBtnMobile) modeBtnMobile.textContent = label;
  if (save) localStorage.setItem('elzakki-mode', mode);
}

function initModeSystem() {
  const saved = localStorage.getItem('elzakki-mode') || 'default';
  currentModeIndex = MODES.indexOf(saved);
  if (currentModeIndex < 0) currentModeIndex = 0;
  applyMode(MODES[currentModeIndex], false);

  const modeBtn = document.getElementById('modeBtn');
  const modeBtnMobile = document.getElementById('modeBtnMobile');
  const modeTrigger = document.getElementById('modeTrigger');

  function cycleMode() {
    currentModeIndex = (currentModeIndex + 1) % MODES.length;
    applyMode(MODES[currentModeIndex]);
  }

  if (modeBtn) modeBtn.addEventListener('click', cycleMode);
  if (modeBtnMobile) modeBtnMobile.addEventListener('click', cycleMode);

  if (modeTrigger && modeBtn) {
    modeTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      modeBtn.classList.toggle('visible');
      modeTrigger.classList.toggle('active');
    });

    // Close mode btn when clicking outside
    document.addEventListener('click', (e) => {
      const navbar = document.getElementById('navbar');
      if (navbar && !navbar.contains(e.target)) {
        modeBtn.classList.remove('visible');
        modeTrigger.classList.remove('active');
      }
    });
  }
}


// --- Smooth Scroll ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initScrollReveal();
  initGalleryFilter();
  initModeSystem();
  initSmoothScroll();
});