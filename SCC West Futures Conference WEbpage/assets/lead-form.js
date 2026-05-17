/* SCC West — "Notify Me" lead capture form.
 * Drops anywhere: <div data-scc-lead data-variant="inline|card|cta"></div>
 * Submitting opens a mailto: to info.ab@supplychaincanada.com pre-filled as
 * "New lead for conference" with the visitor's details. No backend.
 */
(function(){
  const SUPPORT = 'info.ab@supplychaincanada.com';
  const SPONSOR_BOOK = 'mailto:thoang@supplychaincanada.com?subject=Conference%202026%20%E2%80%94%20I%27d%20like%20to%20book%20a%20call';

  const css = `
  .scc-lead{background:#fff;border:1px solid var(--line);border-radius:18px;padding:36px 32px;box-shadow:0 14px 40px rgba(10,11,12,.06)}
  html.dark .scc-lead{background:#15161A;border-color:rgba(255,255,255,.08)}
  .scc-lead .head{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;flex-wrap:wrap;margin-bottom:22px}
  .scc-lead .lbl{font-family:var(--mono);color:var(--red);font-size:11px;letter-spacing:.2em;text-transform:uppercase;margin-bottom:8px}
  .scc-lead h3{font-family:var(--display);font-weight:800;text-transform:uppercase;font-size:clamp(24px,2.5vw,32px);line-height:1.05;letter-spacing:-.005em;color:var(--ink);max-width:540px}
  .scc-lead p.sub{color:var(--muted);font-size:14px;line-height:1.55;max-width:560px;margin-top:8px}
  .scc-lead .badge{font-family:var(--display);font-weight:700;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--red);background:#FFF1F1;border:1px solid #FFD4D6;padding:6px 12px;border-radius:999px;white-space:nowrap}
  html.dark .scc-lead .badge{background:rgba(237,28,36,.12);border-color:rgba(237,28,36,.35)}
  .scc-lead form{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .scc-lead .field{display:flex;flex-direction:column;gap:6px}
  .scc-lead .field.full{grid-column:1/-1}
  .scc-lead label{font-family:var(--display);font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:.14em;color:var(--muted)}
  .scc-lead input,.scc-lead textarea{background:#FBF9F6;color:var(--ink);border:1px solid var(--line);padding:12px 14px;font:inherit;font-size:14px;border-radius:10px;outline:none;transition:border-color .2s;font-family:var(--body)}
  html.dark .scc-lead input,html.dark .scc-lead textarea{background:#0B0B0E;color:#fff;border-color:rgba(255,255,255,.12)}
  .scc-lead input:focus,.scc-lead textarea:focus{border-color:var(--red)}
  .scc-lead textarea{resize:vertical;min-height:70px}
  .scc-lead .actions{grid-column:1/-1;display:flex;gap:10px;flex-wrap:wrap;justify-content:space-between;align-items:center;margin-top:6px}
  .scc-lead .note{font-size:12px;color:var(--muted);line-height:1.45}
  .scc-lead .note a{color:var(--ink);border-bottom:1px solid var(--red)}
  html.dark .scc-lead .note a{color:#fff}
  .scc-lead.variant-cta{background:linear-gradient(135deg,#ED1C24 0%,#F47A20 100%);border:0;color:#fff;box-shadow:0 24px 60px rgba(237,28,36,.25)}
  .scc-lead.variant-cta h3{color:#fff}
  .scc-lead.variant-cta p.sub{color:rgba(255,255,255,.9)}
  .scc-lead.variant-cta .badge{background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.3);color:#fff}
  .scc-lead.variant-cta label{color:rgba(255,255,255,.85)}
  .scc-lead.variant-cta input,.scc-lead.variant-cta textarea{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.3);color:#fff}
  .scc-lead.variant-cta input::placeholder,.scc-lead.variant-cta textarea::placeholder{color:rgba(255,255,255,.6)}
  .scc-lead.variant-cta input:focus,.scc-lead.variant-cta textarea:focus{border-color:#fff;background:rgba(255,255,255,.18)}
  .scc-lead.variant-cta .note{color:rgba(255,255,255,.85)}
  .scc-lead.variant-cta .note a{color:#fff;border-bottom-color:#fff}
  .scc-lead.variant-cta .submit{background:#fff;color:#000;border-color:#fff}
  .scc-lead.variant-cta .submit:hover{background:#F0B429;border-color:#F0B429}
  .scc-lead.variant-strip{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;padding:24px 28px}
  .scc-lead.variant-strip form{grid-template-columns:1fr 1fr auto;align-items:end}
  .scc-lead.variant-strip .head{margin-bottom:0}
  .scc-lead.variant-strip h3{font-size:20px}
  .scc-lead.variant-strip p.sub{font-size:13px}
  @media (max-width:880px){.scc-lead form,.scc-lead.variant-strip form{grid-template-columns:1fr}.scc-lead.variant-strip{grid-template-columns:1fr}}
  .scc-lead .success{padding:14px 18px;background:#E8F7EE;color:#0A6B3F;border-radius:10px;font-size:14px;display:none;border:1px solid #B6E2C8}
  .scc-lead .success.show{display:block;animation:slideIn .3s ease}
  @keyframes slideIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  function build(host){
    const variant = host.dataset.variant || 'card';
    const title = host.dataset.title || "Can't make it this year? Stay on the list.";
    const sub = host.dataset.sub || "Drop your details and we'll quietly keep you in the loop on conference updates, speaker reveals, and Western Canada chapter events. No pressure — opt out anytime.";
    const badge = host.dataset.badge || '★ Free · 1 click';
    host.classList.add('scc-lead', 'variant-'+variant);
    host.innerHTML = `
      <div class="head">
        <div>
          <div class="lbl">Stay in the loop</div>
          <h3>${title}</h3>
          <p class="sub">${sub}</p>
        </div>
        <span class="badge">${badge}</span>
      </div>
      <div class="success" data-success>Thanks — your email client is opening with a pre-filled message. Hit send and we'll be in touch within one business day.</div>
      <form>
        <div class="field"><label>Full name</label><input name="name" placeholder="Jane Doe" required /></div>
        <div class="field"><label>Work email</label><input name="email" type="email" placeholder="jane@company.com" required /></div>
        <div class="field"><label>Contact number</label><input name="phone" placeholder="(780) 555-0123" /></div>
        <div class="field"><label>Organization (optional)</label><input name="org" placeholder="Company / org" /></div>
        <div class="field full"><label>What would you like to hear about? (optional)</label><textarea name="notes" placeholder="e.g. interested in conference, group/team budget, sponsorship, or speaking"></textarea></div>
        <div class="actions">
          <span class="note">We send your details to <a href="mailto:${SUPPORT}">${SUPPORT}</a> as a "new lead for conference". Used only by our team to follow up.</span>
          <button type="submit" class="pill-btn solid submit">Notify Me →</button>
        </div>
      </form>`;
    const form = host.querySelector('form');
    const success = host.querySelector('[data-success]');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const f = new FormData(form);
      const subj = encodeURIComponent('New lead for conference — ' + (f.get('name') || 'Notify Me'));
      const body = encodeURIComponent(
        `Hi SCC West team,\n\nPlease add me to the West Futures Conference 2026 / SCC West updates list.\n\n` +
        `Name: ${f.get('name')||''}\n` +
        `Email: ${f.get('email')||''}\n` +
        `Phone: ${f.get('phone')||''}\n` +
        `Organization: ${f.get('org')||''}\n\n` +
        `Notes / requirements:\n${f.get('notes')||'—'}\n\nThanks!`
      );
      window.location.href = `mailto:${SUPPORT}?subject=${subj}&body=${body}`;
      success.classList.add('show');
      setTimeout(()=>form.reset(), 200);
    });
  }

  function mount(){ document.querySelectorAll('[data-scc-lead]').forEach(build); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();

  // Public booking link helper
  window.SCCBookCall = SPONSOR_BOOK;
})();
