/* SCC West — shared header + footer renderer. Light-theme aware. */
window.SCC_LINKS = {
  REGISTER: 'https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1710&request_locale=en#home',
  MEMBERSHIP: 'https://www.supplychaincanada.com/membership',
  NATIONAL: 'https://www.supplychaincanada.com',
  SUPPORT_EMAIL: 'info.ab@supplychaincanada.com',
  SPONSOR_EMAIL: 'thoang@supplychaincanada.com',
};

window.SCCWest = (function(){
  const L = window.SCC_LINKS;
  const NAV = [
    {label:'About', href:'about.html', items:[
      {l:'Who We Are', d:'The Western Canada institute of Supply Chain Canada', h:'about.html'},
      {l:'Leadership & Board', d:'Volunteer leaders serving AB, BC and the West', h:'about.html#leadership'},
      {l:'Membership', d:'AB Regular $440 · BC Regular $495 · Student $50', h:L.MEMBERSHIP, ext:true},
      {l:'Contact', d:'info.ab@supplychaincanada.com', h:'about.html#contact'},
    ]},
    {label:'Events', href:'events.html', items:[
      {l:'Futures Conference 2026', d:'Flagship Western Canada conference — Oct 2, Edmonton', h:'events/futures-conference-2026.html', star:true},
      {l:'Full Calendar', d:'Every Supply Chain Canada — West event', h:'events.html'},
    ]},
  ];

  function pathPrefix(){ return location.pathname.includes('/events/') ? '../' : ''; }
  function href(item){ return item.ext ? item.h : pathPrefix() + item.h; }

  function topbarHtml(opts){
    if (opts && opts.topbar === false) return '';
    const msg = (opts && opts.topbarMsg) || `<strong>Register</strong> for $649 (Member) by <strong>May 31</strong> · Save up to $200 with Early Bird`;
    const link = (opts && opts.topbarLink) || L.REGISTER;
    return `<div class="topbar"><a href="${link}" target="_blank" rel="noopener">${msg} →</a></div>`;
  }

  function navHtml(active, opts){
    const p = pathPrefix();
    const onDark = opts && opts.dark ? ' on-dark' : '';
    return `
    <nav class="nav${onDark}" id="siteNav">
      <div class="nav-inner">
        <a href="${p}index.html" class="brand" aria-label="Supply Chain Canada — West home">
          <span class="brand-mark"><img src="${p}assets/scc-logo.png" alt="Supply Chain Canada West" /></span>
          <span class="lock">
            <span class="l1">Supply Chain Canada</span>
            <span class="l2">WEST · WESTERN CANADA INSTITUTE</span>
          </span>
        </a>
        <div class="nav-links">
          ${NAV.map(n=>`
            <div class="item">
              <a href="${p}${n.href}" class="${active===n.label?'active':''}">${n.label} ${n.items?'<span style="opacity:.5">▾</span>':''}</a>
              ${n.items?`<div class="dropdown">${n.items.map(i=>`<a href="${href(i)}" ${i.ext?'target="_blank" rel="noopener"':''}><span class="lab">${i.star?'<span style="color:var(--red)">★</span> ':''}${i.l}${i.ext?' ↗':''}</span><span class="desc">${i.d}</span></a>`).join('')}</div>`:''}
            </div>`).join('')}
        </div>
        <div class="nav-cta">
          <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode" title="Toggle theme">
            <svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          </button>
          <a href="${L.MEMBERSHIP}" target="_blank" rel="noopener" class="pill-btn ghost">Membership ↗</a>
          <a href="${L.REGISTER}" target="_blank" rel="noopener" class="pill-btn solid">Register Now →</a>
          <button class="nav-burger" id="navBurger" aria-label="Open menu">☰</button>
        </div>
      </div>
    </nav>`;
  }

  function mobileDrawerHtml(){
    const p = pathPrefix();
    return `
    <div class="mobile-drawer" id="mobileDrawer">
      <button class="close" id="drawerClose" aria-label="Close menu">×</button>
      <nav>
        <a href="${p}index.html">Home <span>→</span></a>
        <a href="${p}about.html">About <span>→</span></a>
        <a href="${p}events.html">Events <span>→</span></a>
        <a href="${p}events/futures-conference-2026.html">Futures Conference 2026 <span>★</span></a>
        <a href="${L.MEMBERSHIP}" target="_blank" rel="noopener">Membership <span>↗</span></a>
      </nav>
      <div class="cta-area">
        <a href="${L.REGISTER}" target="_blank" rel="noopener" class="pill-btn solid" style="width:100%;justify-content:center">Register Now →</a>
      </div>
    </div>`;
  }

  function mobileCtaBarHtml(){
    return `
    <div class="mobile-cta-bar" id="mobileCtaBar">
      <div class="timer">
        <div class="lbl">Early Bird Closes In</div>
        <div class="v" id="mcbTimer">— <small>d</small></div>
      </div>
      <a href="${L.REGISTER}" target="_blank" rel="noopener" class="pill-btn solid">Register →</a>
    </div>`;
  }

  function footerHtml(){
    const p = pathPrefix();
    return `
    <footer class="site-footer">
      <div class="wrap">
        <div class="foot-grid">
          <div>
            <a href="${p}index.html" class="brand" style="margin-bottom:18px;color:#fff">
              <span class="brand-mark"><img src="${p}assets/scc-logo.png" alt="" /></span>
              <span class="lock"><span class="l1">Supply Chain Canada</span><span class="l2">WEST · WESTERN CANADA INSTITUTE</span></span>
            </a>
            <p style="font-size:13px;color:#a8a3a0;line-height:1.6;max-width:380px;margin-top:18px">Supply Chain Canada — West is the Western Canada institute of <a href="${L.NATIONAL}" target="_blank" rel="noopener" style="color:#fff;border-bottom:1px solid var(--red)">Supply Chain Canada</a>, the national association advancing the supply chain profession since 1919. Serving 2,500+ professionals across Alberta, British Columbia and the territories.</p>
          </div>
          <div>
            <h4>Conference</h4>
            <ul>
              <li><a href="${p}events/futures-conference-2026.html">Futures Conference 2026</a></li>
              <li><a href="${L.REGISTER}" target="_blank" rel="noopener">Register ↗</a></li>
              <li><a href="mailto:${L.SPONSOR_EMAIL}?subject=Sponsorship">Sponsorship</a></li>
              <li><a href="mailto:${L.SPONSOR_EMAIL}?subject=Speaking">Speaking Proposal</a></li>
            </ul>
          </div>
          <div>
            <h4>Institute</h4>
            <ul>
              <li><a href="${p}index.html">Home</a></li>
              <li><a href="${p}about.html">About</a></li>
              <li><a href="${p}events.html">Events</a></li>
              <li><a href="${L.MEMBERSHIP}" target="_blank" rel="noopener">Membership ↗</a></li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li><a href="mailto:${L.SUPPORT_EMAIL}">${L.SUPPORT_EMAIL}</a></li>
              <li>(780) 944-0355</li>
              <li>Toll-Free: 1-866-610-4089</li>
              <li>P.O. Box 66005 Heritage<br/>Edmonton, AB T6J 6T4</li>
              <li><a href="${L.NATIONAL}" target="_blank" rel="noopener">National Association ↗</a></li>
            </ul>
          </div>
        </div>
        <div class="foot-bot">
          <div>© 2026 Supply Chain Canada — West Institute · All rights reserved</div>
          <div class="swimlane">An institute of <a href="${L.NATIONAL}" target="_blank" rel="noopener" style="color:#fff;border-bottom:1px solid var(--red)">Supply Chain Canada</a> — proudly serving Western Canada</div>
        </div>
      </div>
    </footer>`;
  }

  function mountChrome(opts){
    opts = opts || {};
    document.body.insertAdjacentHTML('afterbegin', `<a class="skip-link" href="#main-content">Skip to content</a><div class="scroll-bar" id="__sb"></div>` + topbarHtml(opts) + navHtml(opts.active, opts) + mobileDrawerHtml() + mobileCtaBarHtml());
    document.body.insertAdjacentHTML('beforeend', footerHtml());

    const nav = document.getElementById('siteNav');
    const sb = document.getElementById('__sb');
    addEventListener('scroll', ()=>{
      const h = document.documentElement.scrollHeight - innerHeight;
      sb.style.width = (scrollY/h*100)+'%';
      nav.classList.toggle('scrolled', scrollY > 40);
    });

    // mobile drawer
    const burger = document.getElementById('navBurger');
    const drawer = document.getElementById('mobileDrawer');
    const closeD = document.getElementById('drawerClose');
    if (burger && drawer){
      burger.addEventListener('click', ()=>{ drawer.classList.add('open'); closeD.focus(); });
      closeD.addEventListener('click', ()=>{ drawer.classList.remove('open'); burger.focus(); });
      drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>drawer.classList.remove('open')));
      document.addEventListener('keydown', e=>{ if(e.key==='Escape' && drawer.classList.contains('open')){ drawer.classList.remove('open'); burger.focus(); } });
    }

    // mobile bottom-bar countdown (Early Bird May 31, 2026)
    const target = new Date('2026-05-31T23:59:59-06:00').getTime();
    const timerEl = document.getElementById('mcbTimer');
    function tick(){
      if (!timerEl) return;
      const t = target - Date.now();
      if (t<0){ timerEl.innerHTML = 'Closed'; return; }
      const d = Math.floor(t/86400000);
      const h = Math.floor(t/3600000)%24;
      const m = Math.floor(t/60000)%60;
      timerEl.innerHTML = `${d}<small>d</small> ${String(h).padStart(2,'0')}<small>h</small> ${String(m).padStart(2,'0')}<small>m</small>`;
    }
    tick(); setInterval(tick, 60000);

    // Theme toggle
    const tt = document.getElementById('themeToggle');
    const saved = localStorage.getItem('scc-theme');
    if (saved === 'dark') document.documentElement.classList.add('dark');
    if (tt){
      tt.addEventListener('click', ()=>{
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('scc-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
      });
    }

    // reveal-on-scroll
    const io = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

    // smooth anchor
    document.addEventListener('click', e=>{
      const a = e.target.closest('a[href^="#"]');
      if(!a) return;
      const id = a.getAttribute('href').slice(1);
      if(!id) return;
      const t = document.getElementById(id);
      if(!t) return;
      e.preventDefault();
      window.scrollTo({top:t.offsetTop-110, behavior:'smooth'});
    });
  }

  return { mountChrome };
})();
