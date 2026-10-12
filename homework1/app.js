/* ==========================================================================
   RESILIENT COMPONENT ARCHITECTURE & THEME ENGINE (ES6+)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------------
     1. THEME ENGINE & PERSISTENCE (Exercise 2 / Task T-02C)
     ------------------------------------------------------------------------ */
  const themeBtn = document.querySelector('#theme-btn');
  const themeIcon = themeBtn?.querySelector('.theme-icon');
  const themeText = themeBtn?.querySelector('.theme-text');

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark-theme');
      themeBtn?.setAttribute('aria-pressed', 'true');
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeText) themeText.textContent = 'Light Mode';
    } else {
      document.body.classList.remove('dark-theme');
      themeBtn?.setAttribute('aria-pressed', 'false');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeText) themeText.textContent = 'Dark Mode';
    }
  }

  // Read persisted preference or OS preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme === 'dark' || (!savedTheme && systemPrefersDark));

  themeBtn?.addEventListener('click', () => {
    const isCurrentlyDark = document.body.classList.contains('dark-theme');
    const nextDarkState = !isCurrentlyDark;
    applyTheme(nextDarkState);
    localStorage.setItem('theme', nextDarkState ? 'dark' : 'light');
  });

  /* ------------------------------------------------------------------------
     2. MOCK DATASET & DOM CONTRACT (Exercise 4 / Task T-03)
     ------------------------------------------------------------------------ */
  const MOCK_PROJECTS = [
    {
      id: 'proj-01',
      title: 'Decoupled State Machine Engine',
      badge: 'Architecture',
      description: 'Zero-dependency resilient frontend state manager preventing UI drift and layout shifting.',
      url: 'https://github.com/nguyenntkpvnm21'
    },
    {
      id: 'proj-02',
      title: 'Deterministic Audio Pipeline',
      badge: 'Web Audio',
      description: 'Polyphonic drum synthesizer with repeat throttling and zero audio-queue overflow.',
      url: 'https://github.com/nguyenntkpvnm21'
    },
    {
      id: 'proj-03',
      title: 'Zero-CLS Component Showcase',
      badge: 'CSS Layout',
      description: 'Responsive 2D grid utilizing dynamic auto-fit minmax and hardware-accelerated shimmer.',
      url: 'https://github.com/nguyenntkpvnm21'
    }
  ];

  const projectsContainer = document.querySelector('#projects-container');
  const stateButtons = document.querySelectorAll('.btn-state');

  /* ------------------------------------------------------------------------
     3. SAFE DOM FACTORY FUNCTIONS (Zero-XSS Policy)
     ------------------------------------------------------------------------ */

  // State: Loading Skeleton (T-03A)
  function createSkeletonCard() {
    const card = document.createElement('div');
    card.className = 'skeleton-card';
    card.setAttribute('aria-hidden', 'true');

    const title = document.createElement('div');
    title.className = 'skeleton-shimmer skeleton-title';

    const badge = document.createElement('div');
    badge.className = 'skeleton-shimmer skeleton-badge';

    const line1 = document.createElement('div');
    line1.className = 'skeleton-shimmer skeleton-line';

    const line2 = document.createElement('div');
    line2.className = 'skeleton-shimmer skeleton-line short';

    const link = document.createElement('div');
    link.className = 'skeleton-shimmer skeleton-link';

    card.append(title, badge, line1, line2, link);
    return card;
  }

  // State: Live Data Card (T-03B)
  function createProjectCard(item) {
    const card = document.createElement('article');
    card.className = 'project-card';

    const header = document.createElement('header');
    header.className = 'card-header';

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = item.title;

    const badgeList = document.createElement('ul');
    badgeList.className = 'badge-list';

    const badgeItem = document.createElement('li');
    badgeItem.className = 'badge';
    badgeItem.textContent = item.badge;
    badgeList.appendChild(badgeItem);

    header.append(title, badgeList);

    const desc = document.createElement('p');
    desc.className = 'card-body';
    desc.textContent = item.description;

    const footer = document.createElement('footer');
    footer.className = 'card-footer';

    const link = document.createElement('a');
    link.className = 'project-link';
    link.href = item.url;
    link.textContent = 'Explore Repository →';
    link.setAttribute('aria-label', `Explore source code for ${item.title}`);
    footer.appendChild(link);

    card.append(header, desc, footer);
    return card;
  }

  // State: Empty State (T-03C)
  function createEmptyState() {
    const wrapper = document.createElement('div');
    wrapper.className = 'state-feedback-card';
    wrapper.setAttribute('role', 'status');

    const icon = document.createElement('div');
    icon.className = 'state-icon';
    icon.textContent = '📂';

    const title = document.createElement('h3');
    title.className = 'state-title';
    title.textContent = 'No Artifacts Found';

    const message = document.createElement('p');
    message.className = 'state-message';
    message.textContent = 'The requested filter query returned zero project records. Please adjust your criteria.';

    wrapper.append(icon, title, message);
    return wrapper;
  }

  // State: Error State with Accessible Retry Trigger (T-03C)
  function createErrorState(retryCallback) {
    const wrapper = document.createElement('div');
    wrapper.className = 'state-feedback-card error-card';
    wrapper.setAttribute('role', 'alert');

    const icon = document.createElement('div');
    icon.className = 'state-icon';
    icon.textContent = '⚠️';

    const title = document.createElement('h3');
    title.className = 'state-title';
    title.textContent = 'Artifact Retrieval Fault';

    const message = document.createElement('p');
    message.className = 'state-message';
    message.textContent = 'Unable to synchronize component artifacts from remote storage. Verify network connectivity.';

    const retryBtn = document.createElement('button');
    retryBtn.type = 'button';
    retryBtn.className = 'btn-retry';
    retryBtn.textContent = 'Retry Request';
    retryBtn.addEventListener('click', retryCallback);

    wrapper.append(icon, title, message, retryBtn);
    return wrapper;
  }

  /* ------------------------------------------------------------------------
     4. CENTRAL STATE MACHINE ORCHESTRATION (T-03D)
     ------------------------------------------------------------------------ */
  function renderState(state, data = []) {
    if (!projectsContainer) return;
    
    // Clear previous view safely
    projectsContainer.replaceChildren();

    switch (state) {
      case 'loading':
        projectsContainer.setAttribute('aria-busy', 'true');
        for (let i = 0; i < 3; i++) {
          projectsContainer.appendChild(createSkeletonCard());
        }
        break;

      case 'success':
        projectsContainer.setAttribute('aria-busy', 'false');
        data.forEach(item => {
          projectsContainer.appendChild(createProjectCard(item));
        });
        break;

      case 'empty':
        projectsContainer.setAttribute('aria-busy', 'false');
        projectsContainer.appendChild(createEmptyState());
        break;

      case 'error':
        projectsContainer.setAttribute('aria-busy', 'false');
        projectsContainer.appendChild(createErrorState(() => fetchStateWithDelay('success')));
        break;

      default:
        console.warn(`Encountered unknown state: ${state}`);
    }
  }

  // Simulate network latency with skeleton fallback
  function fetchStateWithDelay(targetState) {
    renderState('loading');
    setTimeout(() => {
      if (targetState === 'success') {
        renderState('success', MOCK_PROJECTS);
      } else if (targetState === 'empty') {
        renderState('empty');
      } else if (targetState === 'error') {
        renderState('error');
      }
    }, 750);
  }

  // Bind simulator control buttons
  stateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (target === 'loading') {
        renderState('loading');
      } else {
        fetchStateWithDelay(target);
      }
    });
  });

  // Initial boot: start with Live Data state
  fetchStateWithDelay('success');
});