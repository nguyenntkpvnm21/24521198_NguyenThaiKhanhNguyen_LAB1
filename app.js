const themeToggleBtn = document.querySelector('#theme-btn');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);

  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-pressed', String(isDark));
    themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
  }
}

// 1. Khởi tạo theme: Ưu tiên localStorage -> fallback theo OS prefers-color-scheme
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  applyTheme('dark');
}

// 2. Bắt sự kiện click để chuyển đổi trạng thái
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isDarkActive = document.body.classList.contains('dark-theme');
    const nextTheme = isDarkActive ? 'light' : 'dark';

    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}