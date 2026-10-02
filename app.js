document.addEventListener('DOMContentLoaded', () => {
  // 1. THEME ENGINE: Đảm bảo chuyển đổi dứt khoát Light <-> Dark
  const themeToggle = document.querySelector('#theme-btn');
  const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
  const themeText = themeToggle ? themeToggle.querySelector('.theme-text') : null;

  function updateThemeUI(isDark) {
    if (isDark) {
      document.body.classList.add('dark-theme');
      if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeText) themeText.textContent = 'Light Mode';
    } else {
      document.body.classList.remove('dark-theme');
      if (themeToggle) themeToggle.setAttribute('aria-pressed', 'false');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeText) themeText.textContent = 'Dark Mode';
    }
  }

  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Ưu tiên trạng thái đã lưu, nếu chưa lưu thì lấy theo hệ thống
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    updateThemeUI(isDark);

    themeToggle.addEventListener('click', () => {
      const currentlyDark = document.body.classList.contains('dark-theme');
      const nextDark = !currentlyDark;
      updateThemeUI(nextDark);
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    });
  }

  // 2. CONTACT FORM: State Machine tiếng Anh (Slide 14)
  const contactForm = document.querySelector('#contact-form');
  const formStatus = document.querySelector('#form-status');
  const submitBtn = document.querySelector('#submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        formStatus.textContent = 'Please fill out all required fields correctly.';
        formStatus.style.color = '#ef4444';
        contactForm.reportValidity();
        return;
      }

      // Trạng thái Submitting
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      formStatus.textContent = '';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        formStatus.style.color = '#10b981';
        contactForm.reset();
      }, 1000);
    });
  }

  // 3. RESILIENT 4-STATE COMPONENT ARCHITECTURE (Slide 18)
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

  // Trạng thái T-03A: Loading Skeleton
  function renderSkeletonState() {
    projectContainer.replaceChildren();
    for (let i = 0; i < 2; i++) {
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

  // Trạng thái T-03B: Live Data
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
      a.setAttribute('aria-label', `View ${proj.title} repository`);
      a.textContent = 'Source Code';

      footer.appendChild(a);
      card.append(header, p, footer);
      projectContainer.appendChild(card);
    });
  }

  // Trạng thái T-03C: Empty State
  function renderEmptyState() {
    projectContainer.replaceChildren();
    const emptyBox = document.createElement('div');
    emptyBox.className = 'state-box';
    const message = document.createElement('p');
    message.textContent = 'No published projects are currently available.';
    emptyBox.appendChild(message);
    projectContainer.appendChild(emptyBox);
  }

  // Trạng thái T-03C: Error State
  function renderErrorState(errorMessage, onRetry) {
    projectContainer.replaceChildren();
    const errorBox = document.createElement('div');
    errorBox.className = 'state-box error';

    const message = document.createElement('p');
    message.textContent = errorMessage;

    const retryBtn = document.createElement('button');
    retryBtn.type = 'button';
    retryBtn.className = 'retry-btn';
    retryBtn.textContent = 'Retry';
    retryBtn.addEventListener('click', onRetry);

    errorBox.append(message, retryBtn);
    projectContainer.appendChild(errorBox);
  }

  // Gán sự kiện cho các nút điều khiển Demo
  const btnLoading = document.querySelector('#btn-state-loading');
  const btnLive = document.querySelector('#btn-state-live');
  const btnError = document.querySelector('#btn-state-error');

  if (btnLoading) btnLoading.addEventListener('click', renderSkeletonState);
  if (btnLive) btnLive.addEventListener('click', () => renderLiveState(mockProjects));
  if (btnError) {
    btnError.addEventListener('click', () => {
      renderErrorState('Failed to fetch repository data from remote server.', () => {
        renderLiveState(mockProjects);
      });
    });
  }
});