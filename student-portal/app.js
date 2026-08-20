/* StudyFlow — Student Portal JS
   Handles: SPA routing, sidebar, modal, heatmap, date display, interactions
*/
(function () {
  'use strict';

  /* ---- 1. Current Date Display ---- */
  const days  = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const now   = new Date();
  const dayEl = document.getElementById('welcome-day');
  const dateEl = document.getElementById('welcome-date-text');
  if (dayEl) dayEl.textContent = now.getDate();
  if (dateEl) dateEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getFullYear()}`;

  /* ---- 2. SPA Router ---- */
  const PAGE_TITLES = {
    dashboard:  'Dashboard',
    attendance: 'Attendance',
    tasks:      'Tasks',
    project:    'Project',
    team:       'Team',
    profile:    'Profile',
  };

  function navigateTo(pageId) {
    // Switch inner pages
    document.querySelectorAll('.inner-page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`page-${pageId}`);
    if (target) target.classList.add('active');

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === pageId);
    });

    // Update topbar title
    const titleEl = document.getElementById('topbar-title');
    if (titleEl) titleEl.textContent = PAGE_TITLES[pageId] || pageId;

    // Hide project detail when navigating to project
    if (pageId === 'project') {
      document.getElementById('project-detail').classList.add('hidden');
      document.querySelector('.project-grid').style.display = '';
    }

    // Scroll to top
    document.querySelector('.content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---- 3. Login Flow ---- */
  const loginPage   = document.getElementById('page-login');
  const appShell    = document.getElementById('app-shell');

  function showApp() {
    loginPage.classList.remove('active');
    appShell.classList.remove('hidden');
    navigateTo('dashboard');
  }

  function showLogin() {
    appShell.classList.add('hidden');
    loginPage.classList.add('active');
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('login-btn');
      btn.innerHTML = '<span>Signing in…</span>';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<span>Sign in</span>';
        btn.disabled = false;
        showApp();
      }, 900);
    });
  }

  /* Password toggle */
  const togglePassBtn = document.getElementById('toggle-pass');
  const passInput     = document.getElementById('pass-input');
  const eyeShow       = document.getElementById('eye-show');
  const eyeHide       = document.getElementById('eye-hide');
  if (togglePassBtn) {
    togglePassBtn.addEventListener('click', () => {
      const isText = passInput.type === 'text';
      passInput.type = isText ? 'password' : 'text';
      eyeShow.style.display = isText ? '' : 'none';
      eyeHide.style.display = isText ? 'none' : '';
    });
  }

  /* Login tab group */
  document.querySelectorAll('.login-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  /* ---- 4. Sidebar Navigation ---- */
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', () => {
      const page = el.dataset.page;
      if (page) navigateTo(page);
    });
  });

  /* Sidebar toggle / collapse */
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      if (window.innerWidth <= 700) {
        sidebar.classList.toggle('mobile-open');
      } else {
        sidebar.classList.toggle('collapsed');
      }
    });
  }

  /* ---- 5. Logout ---- */
  document.getElementById('logout-btn')?.addEventListener('click', showLogin);
  document.getElementById('logout-btn-profile')?.addEventListener('click', showLogin);

  /* ---- 6. Attendance Heatmap ---- */
  const heatmapContainer = document.getElementById('heatmap-cells');
  if (heatmapContainer) {
    const statuses = ['present','present','present','absent','present','present','present','present','absent','present','present','present','present','present','present','present','present','leave','present','present','present','present','present','future','future','future','future','future','future','future'];
    const dayNums  = [4,5,6,7,8,11,12,13,14,15,18,19,20,21,22,25,26,27,28,29,1,2,3,4,5,8,9,10,11,12];

    statuses.forEach((status, i) => {
      const cell = document.createElement('div');
      cell.className = `heatmap-cell ${status}`;
      cell.textContent = dayNums[i] || '';
      cell.title = status === 'future' ? '' : `${dayNums[i]} Aug — ${status.charAt(0).toUpperCase() + status.slice(1)}`;
      heatmapContainer.appendChild(cell);
    });
  }

  /* ---- 7. Range Pill (Attendance) ---- */
  document.querySelectorAll('.range-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.range-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  /* ---- 8. Task View Toggle ---- */
  const listView     = document.getElementById('tasks-list-view');
  const boardView    = document.getElementById('tasks-board-view');
  const listBtn      = document.getElementById('view-list-btn');
  const boardBtn     = document.getElementById('view-board-btn');

  listBtn?.addEventListener('click', () => {
    listView.classList.remove('hidden');
    boardView.classList.add('hidden');
    listBtn.classList.add('active');
    boardBtn.classList.remove('active');
  });
  boardBtn?.addEventListener('click', () => {
    boardView.classList.remove('hidden');
    listView.classList.add('hidden');
    boardBtn.classList.add('active');
    listBtn.classList.remove('active');
  });

  /* Task filter tabs */
  document.querySelectorAll('[data-filter]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  /* ---- 9. New Task Modal ---- */
  const modal        = document.getElementById('new-task-modal');
  const newTaskBtn   = document.getElementById('new-task-btn');
  const modalClose   = document.getElementById('modal-close-btn');
  const modalCancel  = document.getElementById('modal-cancel-btn');
  const newTaskForm  = document.getElementById('new-task-form');

  function openModal()  { modal?.showModal(); }
  function closeModal() { modal?.close(); }

  newTaskBtn?.addEventListener('click', openModal);
  modalClose?.addEventListener('click', closeModal);
  modalCancel?.addEventListener('click', closeModal);

  // Light-dismiss fallback for Safari (closedby not yet supported)
  if (modal && !('closedBy' in HTMLDialogElement.prototype)) {
    modal.addEventListener('click', (e) => {
      if (e.target !== modal) return;
      const rect = modal.getBoundingClientRect();
      const inside = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                      rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!inside) closeModal();
    });
  }

  newTaskForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal();
  });

  /* ---- 10. Project Cards → Detail ---- */
  const projectGrid   = document.querySelector('.project-grid');
  const projectDetail = document.getElementById('project-detail');
  const backBtn       = document.getElementById('project-back-btn');

  document.getElementById('project-card-lms')?.addEventListener('click', () => {
    projectGrid.style.display = 'none';
    projectDetail.classList.remove('hidden');
  });
  document.getElementById('project-card-portfolio')?.addEventListener('click', () => {
    projectGrid.style.display = 'none';
    projectDetail.classList.remove('hidden');
  });

  backBtn?.addEventListener('click', () => {
    projectDetail.classList.add('hidden');
    projectGrid.style.display = '';
  });

  /* Project detail tabs */
  document.querySelectorAll('[data-detail-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-detail-tab]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const id = btn.dataset.detailTab;
      document.querySelectorAll('.detail-tab').forEach(t => t.classList.add('hidden'));
      document.getElementById(`detail-tab-${id}`)?.classList.remove('hidden');
      document.getElementById(`detail-tab-${id}`)?.classList.add('active');
    });
  });

  /* ---- 11. Profile Tabs ---- */
  document.querySelectorAll('[data-profile-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-profile-tab]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const id = btn.dataset.profileTab;
      document.querySelectorAll('.profile-tab').forEach(t => {
        t.classList.add('hidden');
        t.classList.remove('active');
      });
      const target = document.getElementById(`profile-tab-${id}`);
      target?.classList.remove('hidden');
      target?.classList.add('active');
    });
  });

  /* Edit profile button */
  document.getElementById('edit-profile-btn')?.addEventListener('click', () => {
    document.querySelectorAll('[data-profile-tab]').forEach(b => b.classList.remove('active'));
    const settingsTab = document.querySelector('[data-profile-tab="settings"]');
    settingsTab?.classList.add('active');
    document.querySelectorAll('.profile-tab').forEach(t => { t.classList.add('hidden'); t.classList.remove('active'); });
    const target = document.getElementById('profile-tab-settings');
    target?.classList.remove('hidden');
    target?.classList.add('active');
  });

  /* ---- 12. Notification bell (example) ---- */
  document.getElementById('notif-btn')?.addEventListener('click', () => {
    const dot = document.querySelector('.notif-dot');
    if (dot) dot.style.display = 'none';
  });

  /* ---- 13. Stat card nav clicks ---- */
  document.querySelectorAll('.stat-card[data-page]').forEach(card => {
    card.addEventListener('click', () => navigateTo(card.dataset.page));
  });

  /* ---- 14. Quick pill nav ---- */
  document.querySelectorAll('.quick-pill[data-page]').forEach(pill => {
    pill.addEventListener('click', () => navigateTo(pill.dataset.page));
  });

  /* ---- 15. Card-link nav clicks ---- */
  document.querySelectorAll('.card-link[data-page]').forEach(link => {
    link.addEventListener('click', () => navigateTo(link.dataset.page));
  });

  /* ---- 16. Mobile sidebar close on overlay click ---- */
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 700 && sidebar?.classList.contains('mobile-open')) {
      if (!sidebar.contains(e.target) && e.target !== toggleBtn) {
        sidebar.classList.remove('mobile-open');
      }
    }
  });

})();
