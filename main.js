/* MICATECH — Premium interaction: theme, scroll reveal, Axom motion */
(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  const navbar = $('#navbar');
  const hamburger = $('#hamburger');
  const navLinks = $('#nav-links');
  const themeToggle = $('#theme-toggle');

  // ===== Theme — persisted, respects system, smooth transition =====
  const THEME_KEY = 'micatech-theme';
  const LEGACY_KEY = 'chael-theme';
  const getPreferred = () => {
    const saved = localStorage.getItem(THEME_KEY) || localStorage.getItem(LEGACY_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };
  const applyTheme = (theme, withTransition = false) => {
    if (withTransition) {
      document.documentElement.classList.add('theme-transitioning');
      setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 360);
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    if (themeToggle) themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  };
  // early apply already done via inline head script — just sync UI
  const initialTheme = document.documentElement.getAttribute('data-theme') || getPreferred();
  if (!document.documentElement.getAttribute('data-theme')) applyTheme(initialTheme);
  else { applyTheme(initialTheme); }

  themeToggle?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
  });

  // sync if system changes and no explicit choice? keep persisted choice only
  window.matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', (e) => {
    if (!localStorage.getItem(THEME_KEY) && !localStorage.getItem(LEGACY_KEY)) applyTheme(e.matches ? 'light' : 'dark', true);
  });

  // ===== Navbar — scroll hide/shadow, height shrink =====
  let lastY = window.scrollY;
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('scrolled', y > 16);
      // hide on scroll down past 120, show on up
      if (y > 120) {
        if (y > lastY && y - lastY > 6) navbar.classList.add('hidden');
        else if (lastY - y > 6) navbar.classList.remove('hidden');
      } else navbar.classList.remove('hidden');
    }
    // parallax hero orb
    const orb = $('.hero-orb');
    const orb2 = $('.hero-orb-2');
    const hero = $('#hero');
    if (hero && (orb || orb2)) {
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
      if (orb) orb.style.transform = `translate3d(0, ${progress * 28}px, 0) scale(${1 - progress*0.04})`;
      if (orb2) orb2.style.transform = `translate3d(0, ${-progress * 18}px, 0)`;
    }
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  // ===== Hamburger =====
  hamburger?.addEventListener('click', () => {
    const willOpen = !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', willOpen);
    hamburger.classList.toggle('open', willOpen);
    hamburger.setAttribute('aria-expanded', String(willOpen));
    document.body.style.overflow = willOpen ? 'hidden' : '';
  });
  $$('.nav-links a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));
  // close on outside or escape
  document.addEventListener('click', (e) => {
    if (!navLinks?.classList.contains('open')) return;
    if (!e.target.closest('#navbar')) {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks?.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ===== Active nav link — use class, not inline style =====
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0].split('?')[0].toLowerCase();
    const isActive = href === current || (current === '' && href === 'index.html');
    a.classList.toggle('active', isActive);
    if (isActive) a.setAttribute('aria-current', 'page');
  });

  // ===== Contact form — guarded =====
  const form = $('#contact-form');
  const status = $('#form-status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#name')?.value.trim() || '';
      const email = $('#email')?.value.trim() || '';
      const message = $('#message')?.value.trim() || '';
      if (!name || !email || !message) {
        if (status) { status.style.color = '#ef4444'; status.textContent = 'Please fill in all required fields.'; }
        form.animate?.([{ transform: 'translateX(0)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(0)' }], { duration: 320, easing: 'ease' });
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (status) { status.style.color = '#ef4444'; status.textContent = 'Please enter a valid corporate email.'; }
        return;
      }
      if (status) { status.style.color = 'var(--accent)'; status.textContent = 'Message received — Micato will respond within 24h.'; }
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Sent ✓'; btn.disabled = true; setTimeout(()=> { btn.textContent='Submit Inquiry'; btn.disabled=false; }, 2200); }
      form.reset();
      setTimeout(()=> { if(status) status.textContent=''; }, 4200);
    });
  }

  // ===== Reveal on scroll — Axom staggered, once =====
  const revealEls = $$('[data-reveal]');
  // Auto-assign reveal to legacy selectors if no data-reveal present (backward compat)
  if (revealEls.length === 0) {
    $$('.project-card, .skill-category, .exp-item, .cert-card, .stat-card, .tool-item, .tool-category, .about-text, .contact-info').forEach((el,i)=>{
      el.setAttribute('data-reveal','');
      if (i%4) el.setAttribute('data-reveal-delay', String((i%4)));
    });
  }
  const allReveal = $$('[data-reveal]');
  if ('IntersectionObserver' in window && allReveal.length) {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    allReveal.forEach(el=> io.observe(el));
  } else {
    allReveal.forEach(el=> el.classList.add('is-visible'));
  }

  // ===== Page enter fade =====
  document.body.classList.add('page-enter');
  // View-transition style fade for internal nav
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || a.target === '_blank') return;
    if (href.endsWith('.html') || href === 'index.html') {
      // let browser handle, but add subtle out
      if (document.startViewTransition) {
        // native
      } else {
        // fallback fade
        // don't prevent default — just hint
      }
    }
  });

  // ===== Hero entrance class trigger =====
  const heroInner = $('.hero-inner');
  if (heroInner && $('#hero')) {
    $('#hero').classList.add('hero-entrance');
  }

  // ===== Text scramble effect on hero headline =====
  const heroName = $('.hero-name');
  if (heroName) {
    const gradientSpan = heroName.querySelector('.gradient');
    const gradientText = gradientSpan ? gradientSpan.textContent : '';
    const beforeGradient = heroName.childNodes[0]?.textContent || '';
    const fullText = beforeGradient + gradientText;
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let iteration = 0;
    // Temporarily hide gradient span during scramble
    if (gradientSpan) gradientSpan.style.display = 'none';
    const scrambleInterval = setInterval(() => {
      const scrambled = fullText.split('').map((char, index) => {
        if (index < iteration) return fullText[index] || '';
        if (fullText[index] === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      heroName.childNodes[0].textContent = scrambled.slice(0, beforeGradient.length);
      if (gradientSpan) gradientSpan.textContent = scrambled.slice(beforeGradient.length);
      iteration += 1 / 2;
      if (iteration >= fullText.length) {
        heroName.childNodes[0].textContent = beforeGradient;
        if (gradientSpan) { gradientSpan.textContent = gradientText; gradientSpan.style.display = ''; }
        clearInterval(scrambleInterval);
      }
    }, 35);
  }

  // ===== Counter animation for stat numbers =====
  const statNums = $$('[data-count]');
  if (statNums.length && 'IntersectionObserver' in window) {
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1600;
          const start = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          counterIO.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => counterIO.observe(el));
  }

  // ===== Typing cursor pulse on hero title (no content change, just visual) =====
  const heroTitle = $('.hero-title');
  if (heroTitle) {
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.textContent = '|';
    heroTitle.appendChild(cursor);
    setTimeout(() => cursor.remove(), 3500);
  }

  // ===== Smooth focus for keyboard users =====
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Tab') document.documentElement.classList.add('kbd-nav');
  });
  document.addEventListener('mousedown', ()=> document.documentElement.classList.remove('kbd-nav'));

})();
