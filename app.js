document.addEventListener('DOMContentLoaded', () => {
  // 1. THEME ENGINE (Kế thừa từ Exercise 2, đồng bộ aria-pressed)
  const themeToggle = document.querySelector('#theme-btn');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    if (isDark) {
      document.body.classList.add('dark-theme');
      themeToggle.setAttribute('aria-pressed', 'true');
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const activeDark = document.body.classList.contains('dark-theme');
      themeToggle.setAttribute('aria-pressed', String(activeDark));
      localStorage.setItem('theme', activeDark ? 'dark' : 'light');
    });
  }

  // 2. CONTACT FORM STATE MACHINE (Idle -> Submitting -> Success/Error)
  const contactForm = document.querySelector('#contact-form');
  const formStatus = document.querySelector('#form-status');
  const submitBtn = document.querySelector('#submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        formStatus.textContent = 'Vui lòng kiểm tra lại các trường bắt buộc.';
        formStatus.style.color = '#ef4444';
        contactForm.reportValidity();
        return;
      }

      // Trạng thái Submitting
      submitBtn.disabled = true;
      submitBtn.textContent = 'Đang gửi...';
      formStatus.textContent = '';

      // Giả lập gửi không tải lại trang
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Gửi thông tin';
        formStatus.textContent = 'Đã gửi thông tin liên hệ thành công!';
        formStatus.style.color = '#10b981';
        contactForm.reset();
      }, 1000);
    });
  }

  // 3. 4-STATE RESILIENT COMPONENT HANDLER (Slide 18)
  const projectContainer = document.querySelector('#project-container');
  const mockProjects = [
    {
      title: 'Distributed State Engine',
      badge: 'TypeScript',
      category: 'frontend',
      desc: 'Lightweight event bus built without external libraries.',
      link: '#'
    },
    {
      title: 'Task Stream Processor',
      badge: 'Node.js',
      category: 'backend',
      desc: 'High-throughput data streaming pipeline with zero third-party framework overhead.',
      link: '#'
    }
  ];

  // Trạng thái 1: T-03A Loading Skeleton
  function renderSkeletonState() {
    projectContainer.replaceChildren();
    for (let i = 0; i < 3; i++) {
      const card = document.createElement('article');
      card.className = 'skeleton-card';

      const title = document.createElement('div');
      title.className = 'skeleton-shimmer skeleton-title';

      const badge = document.createElement('div');
      badge.className = 'skeleton-shimmer skeleton-badge';

      const desc = document.createElement('div');
      desc.className = 'skeleton-shimmer skeleton-desc';

      card.append(title, badge, desc);
      projectContainer.appendChild(card);
    }
  }

  // Trạng thái 2: T-03B Live Data State (DOM API an toàn, chống XSS)
  function renderLiveState(projects) {
    projectContainer.replaceChildren();

    if (!projects || projects.length === 0) {
      renderEmptyState();
      return;
    }

    projects.forEach((proj) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.dataset.category = proj.category;

      const header = document.createElement('header');
      header.className = 'card-header';

      const h3 = document.createElement('h3');
      h3.textContent = proj.title;

      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = proj.badge;

      header.append(h3, badge);

      const p = document.createElement('p');
      p.textContent = proj.desc;

      const footer = document.createElement('footer');
      footer.className = 'card-footer';

      const a = document.createElement('a');
      a.href = proj.link;
      a.setAttribute('aria-label', `Xem mã nguồn ${proj.title}`);
      a.textContent = 'Source Code';

      footer.appendChild(a);
      card.append(header, p, footer);
      projectContainer.appendChild(card);
    });
  }

  // Trạng thái 3: T-03C Empty State
  function renderEmptyState() {
    projectContainer.replaceChildren();
    const emptyBox = document.createElement('div');
    emptyBox.className = 'state-box';
    const message = document.createElement('p');
    message.textContent = 'Hiện chưa có dự án nào được công bố.';
    emptyBox.appendChild(message);
    projectContainer.appendChild(emptyBox);
  }

  // Trạng thái 4: T-03C Error State có retry trigger
  function renderErrorState(errorMessage, onRetry) {
    projectContainer.replaceChildren();
    const errorBox = document.createElement('div');
    errorBox.className = 'state-box error';

    const message = document.createElement('p');
    message.textContent = errorMessage;

    const retryBtn = document.createElement('button');
    retryBtn.type = 'button';
    retryBtn.className = 'retry-btn';
    retryBtn.textContent = 'Thử lại';
    retryBtn.addEventListener('click', onRetry);

    errorBox.append(message, retryBtn);
    projectContainer.appendChild(errorBox);
  }

  // Bắt sự kiện 3 nút chuyển trạng thái để test trực tiếp
  const btnLoading = document.querySelector('#btn-state-loading');
  const btnLive = document.querySelector('#btn-state-live');
  const btnError = document.querySelector('#btn-state-error');

  if (btnLoading) btnLoading.addEventListener('click', renderSkeletonState);
  if (btnLive) btnLive.addEventListener('click', () => renderLiveState(mockProjects));
  if (btnError) {
    btnError.addEventListener('click', () => {
      renderErrorState('Không thể kết nối đến máy chủ dữ liệu.', () => {
        renderLiveState(mockProjects);
      });
    });
  }
});