/* SCC West "West" Concierge — hybrid AI + offline rules engine.
 * Tries the first-party /api/ask LLM endpoint first, then falls back to a
 * built-in knowledge base if the API is unavailable for ANY reason. Always
 * answers, and always routes the conversation back to the Futures Conference.
 * Quick chips always visible above input. Mobile + desktop friendly.
 * Drop in: <script src="assets/convince-bot.js" defer></script>
 */
(function(){
  if (window.__sccBotMounted) return;
  window.__sccBotMounted = true;

  const L = window.SCC_LINKS || {};
  const SUPPORT = L.SUPPORT_EMAIL || 'info.ab@supplychaincanada.com';
  const SPONSOR = L.SPONSOR_EMAIL || 'thoang@supplychaincanada.com';
  const REGISTER = L.REGISTER || 'https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1710&request_locale=en#home';
  const MEMBERSHIP = L.MEMBERSHIP || 'https://www.supplychaincanada.com/membership';

  // ---------- Knowledge base ----------
  const KB = [
    {
      keys:['convince','boss','manager','approval','budget','sell','justify','email','draft','make the case'],
      kind:'email',
      next:'register'
    },
    {
      keys:['register','registration','sign up','signup','book','buy ticket','purchase'],
      reply:`You can register directly through the secure Supply Chain Canada portal — every tier links straight to it.\n\nPricing (+tax):\n• **Member** — $799\n• **Non-Member** — $999\n• **Student Affiliate** — $399\n\nGroups of 8+ qualify for special bundle rates — email ${SPONSOR}.\n\n[Register now ↗](${REGISTER})`,
      next:'date'
    },
    {
      keys:['price','pricing','cost','how much','fee','ticket','rate','member rate','student'],
      reply:`Conference pricing (+tax):\n• **Member** — $799\n• **Non-Member** — $999\n• **Student Affiliate** — $399\n\nGroups of 8+ qualify for special bundle rates — email ${SPONSOR}.\n\n[Register now ↗](${REGISTER})`,
      next:'date'
    },
    {
      keys:['include','included','what do i get','what\'s included','perks','benefit'],
      reply:`Every conference pass includes:\n• Full-day access — all keynotes, panels & breakouts\n• Continental breakfast + hosted lunch\n• Evening networking reception with food & drink\n• Sponsor showcase access\n• **10 CPD credits** (certificate within 5 business days)\n• Post-event presentation library access`,
      next:'register'
    },
    {
      keys:['cpd','credit','credits','designation','scmp'],
      reply:`The conference awards **10 CPD credits**, applicable to your SCMP logbook. Your certificate is issued automatically within 5 business days post-event and emailed to you.`,
      next:'register'
    },
    {
      keys:['date','when','what day','time','dates'],
      reply:`**Two days at River Cree Resort, Edmonton:**\n• **Thursday, October 1, 2026** — Pre-Conference Workshops (optional add-on)\n• **Friday, October 2, 2026** — Main Conference\n\nOn the main day: registration & breakfast from 6:45 AM, opening remarks at 8:00, programming through the afternoon, and the Evening Reception & Dinner from 5:00 PM.`,
      next:'agenda'
    },
    {
      keys:['agenda','schedule','program','what happens','timeline','day two','day 2'],
      reply:`The West Futures Conference 2026 runs **two days at River Cree Resort**:\n\n**Day 1 — Oct 1 · Pre-Conference Workshops** (optional add-on)\n• Competition Bureau & Procurement Ombudsman workshop (9 AM–12 PM)\n• AI for Supply Chain Productivity with Ian Gonzalez (1–4 PM)\n• Invitation-only Executive Round Table (evening)\n\n**Day 2 — Oct 2 · Main Conference**\n• Opening Remarks & CPO Fireside (8 AM)\n• Economic Update — Mark Parsons, ATB (9 AM)\n• Morning & afternoon concurrent breakouts — Purchase with Purpose (City of Edmonton), AI & Strategic Sourcing, Indigenous Perspectives, the Procurement Ombudsman & Competition Bureau, and more\n• Evening Reception & Dinner (5 PM)\n\nWhen sessions run in parallel, you choose the room that fits you. Full session details are firming up now.`,
      next:'register'
    },
    {
      keys:['pre-conference','preconference','pre conference','workshop','workshops','add-on','add on','october 1','oct 1','day one','day 1'],
      reply:`**Day 1 — Thursday, October 1** offers optional **pre-conference workshops** at River Cree (an add-on to the main conference):\n• **Competition Bureau & Procurement Ombudsman** workshop — 9 AM–12 PM\n• **AI for Supply Chain Productivity** with Ian Gonzalez — 1–4 PM\n• **Executive Round Table** (evening) — invitation-only; email ${SPONSOR} to request an invite\n\nWorkshop pricing: **$100 member / $200 non-member** (+GST).`,
      next:'register'
    },
    {
      keys:['where','venue','location','address','hotel','river cree','river-cree'],
      reply:`**River Cree Resort & Casino**\n300 East Lapotac Blvd, Enoch, AB · Greater Edmonton Area, on Enoch Cree Nation.\n\nPreferred conference hotel rate ($189/night). Reservations: **1-844-425-2733**. Hell's Kitchen (Gordon Ramsay's first Canadian location) opens on-site in summer 2026.`,
      next:'travel'
    },
    {
      keys:['flight','air canada','travel','airline','fly','promo','code'],
      reply:`**Air Canada** is the official airline. Use code **YQ6XKBC1** at checkout on aircanada.com to save up to 15% on flights to YEG (Edmonton). Valid for travel September 30 – October 4, 2026.`,
      next:'venue'
    },
    {
      keys:['speaker','speakers','keynote','presenter','who is speaking','lineup','line up'],
      reply:`**Confirmed 2026 voices include:**\n• **Mark Parsons** — Chief Economist, ATB — Economic Update\n• **Sohrab Sohrabi** — CPO, City of Edmonton — Purchase with Purpose\n• **Ian Gonzalez** — AI & Strategic Sourcing\n• **Siobhan Chinnery** — The Supply Chain Value Proposition\n• **Amy Hill** — Competition Bureau\n• **Phil Ducharme & Drew LaFond** (MLT Aikins) — Indigenous Perspectives\n• **Minto Roy** — Featured Presentation\n\nMore speakers are announced on a rolling basis. Want to speak? Email ${SPONSOR}.`,
      next:'agenda'
    },
    {
      keys:['focus','theme','topic','content','what is it about','six'],
      reply:`The 2026 program covers **six focus areas** shaping Western Canada's supply chain:\n1. Resilience & Risk Management\n2. Transportation, Logistics & Infrastructure\n3. Public & Private Sector Leadership\n4. Digital Transformation & Data\n5. Sustainability & Transparency\n6. Talent & the Future of the Profession`,
      next:'agenda'
    },
    {
      keys:['attend','attendee','attendees','how many','people','crowd','room','audience','who attends'],
      reply:`Expecting **300+ senior practitioners and executives** in attendance — procurement, logistics, operations, and supply chain leaders from across Western Canada's energy, government, retail, agri-food, education and tech sectors. The 2025 conference sold out two years running.`,
      next:'register'
    },
    {
      keys:['sponsor','sponsorship','partner','exhibit','booth','prospectus','tier'],
      reply:`**AMCC** is confirmed as Premier Sponsor for 2026. 30+ sponsoring organizations in 2025.\n\nReach 300+ senior practitioners and executives with brand visibility, expo presence, thought-leadership platforms, and pre/post-event campaign integration.\n\nEmail **${SPONSOR}** for the prospectus.`,
      next:'register'
    },
    {
      keys:['refund','cancel','cancellation','policy'],
      reply:`Full refund if Supply Chain Canada — West cancels the event. Otherwise, written notice 14+ days before the event = full refund. Within 14 days, no refund. Email ${SUPPORT} to withdraw.`,
      next:'support'
    },
    {
      keys:['member','members','membership','join','dues','fee'],
      reply:`Membership in Supply Chain Canada — West is processed through the national portal.\n\n**Alberta types:** Regular $440 · Retired $100 · Accreditation Candidate $440 · Student Affiliate $50 · Academic Affiliate $220 · Supply Chain Council Leader (Private) $2,240\n\n**British Columbia types:** Regular $495 · Accreditation Candidate $495 · Retired $100 · Student Affiliate $50 · Academic Affiliate $250\n\n[Apply for membership ↗](${MEMBERSHIP})`,
      next:'support'
    },
    {
      keys:['contact','email','phone','call','help','support','human','person'],
      reply:`Talk to our team:\n• **General:** ${SUPPORT}\n• **Sponsorship & speaking:** ${SPONSOR}\n• **Phone:** 1-866-610-4089\n\nWe typically respond within one business day.`,
      next:'register'
    },
    {
      keys:['accessibility','accessible','wheelchair','dietary','allergy','accommodation'],
      reply:`River Cree Resort is fully wheelchair accessible. Please note any accessibility, dietary, or accommodation requirements during registration — our team will follow up directly. Questions in the meantime? Email ${SUPPORT}.`,
      next:'register'
    },
    {
      keys:['video','recap','watch','2025','last year'],
      reply:`Yes — the 2025 conference recap is embedded on this page. Click anywhere on the video to unmute and hear the room. **2,500+ Western Canadian supply chain professionals**, sold-out two years running.`,
      next:'register'
    },
    {
      keys:['group','team','bundle','discount','bulk'],
      reply:`Bringing **8 or more** from your team? You qualify for group bundle pricing. Email ${SPONSOR} with your team size and we'll send a tailored quote within 24 hours.`,
      next:'register'
    },
    {
      keys:['job','career','work','hire','hiring','employment','opportunity','opportunities','looking for work','find work','get hired','job search','resume','cv'],
      reply:`Supply chain professionals are in high demand across Western Canada. The **West Futures Conference** is one of the fastest ways to accelerate your job search:\n\n• **300+ senior practitioners and executives** from energy, government, retail, logistics and tech — all in one room on October 2\n• The most senior procurement network west of Toronto\n• Past attendees have turned conference introductions into signed contracts and job offers within 90 days\n• **10 CPD credits** that strengthen your SCMP designation and CV\n\nConnections built in a day here can open doors that months of applications don't. Whether you're a new grad, a mid-career practitioner, or a senior leader in transition — this is the room to be in.\n\n[Grab your seat ↗](${REGISTER})`,
      next:'register'
    },
    {
      keys:['network','networking','connect','connections','meet people','meet professionals','relationship'],
      reply:`The Futures Conference is Western Canada's premier supply chain networking event.\n\n• **300+ practitioners and executives** — procurement, logistics, operations, government and tech\n• Structured networking breakfast and a **full evening reception** at River Cree\n• 30+ sponsor organizations — solution providers, consultancies and logistics companies actively looking to meet practitioners\n• Curated peer-table format at lunch — seated by sector so every conversation counts\n\nThe room is small enough to meet everyone. Past attendees consistently report their best regional supply chain connections came from a single Futures Conference day.\n\n[Register now →](${REGISTER})`,
      next:'register'
    },
    {
      keys:['summar','summary','tldr','what is','tell me about','overview'],
      reply:`**West Futures Conference 2026** — the flagship Western Canada conference of Supply Chain Canada — West.\n\n• **When:** Friday, October 2, 2026\n• **Where:** River Cree Resort, Edmonton (Enoch Cree Nation)\n• **Who:** 300+ practitioners and executives\n• **What:** 15+ speakers across 6 focus areas\n• **Credits:** 10 CPD credits per attendee\n• **From:** $399 Student · $799 Member · $999 Non-Member`,
      next:'register'
    },
    {
      keys:['tariff','tariffs','trade','trade war','us tariff','customs','duty','duties','import','export'],
      reply:`Trade disruption and tariff strategy are among the hottest topics in Canadian supply chain right now.\n\nThe **West Futures Conference 2026** (Oct 2, Edmonton) features expert sessions on exactly this — including how Western Canada's energy, agri-food and logistics sectors are responding to shifting trade policy.\n\n300+ senior practitioners in one room = the fastest way to benchmark how peers are adapting.\n\n[Register now →](${REGISTER})`,
      next:'register'
    },
    {
      keys:['ai','artificial intelligence','automation','machine learning','data','analytics','digital','technology','tech'],
      reply:`AI and data analytics are reshaping every part of supply chain — procurement, demand forecasting, logistics routing and supplier risk.\n\nIan Gonzalez (Advisor, SC&P Analytics) leads a dedicated session on **AI in Procurement** at West Futures 2026, Oct 2 in Edmonton. His sessions are known for translating technical capability into practical supply chain applications — no fluff.\n\n[Reserve your seat →](${REGISTER})`,
      next:'agenda'
    },
    {
      keys:['esg','sustainability','scope 3','greenhouse','carbon','climate','green','environment'],
      reply:`ESG compliance and Scope-3 emissions reporting are now procurement responsibilities at most enterprise organizations.\n\nWest Futures 2026 includes a dedicated focus area on **Sustainability & Transparency** — covering Tier-1 audit readiness, supplier scorecards, and what Western Canada's energy sector is doing to meet investor and regulatory expectations.\n\n[Join 300+ supply chain leaders Oct 2 →](${REGISTER})`,
      next:'register'
    },
    {
      keys:['talent','workforce','hiring','staff','retention','culture','hr','people','leadership','professional development','upskill','training'],
      reply:`Talent and the Future of the Profession is one of the six focus areas at **West Futures 2026**.\n\nSiobhan Chinnery — Top 100 Most Influential Woman in Canadian Supply Chain — leads the leadership and culture track. Her Bloom Through the Dirt™ framework has helped supply chain leaders at some of Canada's largest organizations build adaptive, high-performing teams.\n\nThe conference also awards **10 CPD credits** — directly applicable to your SCMP designation.\n\n[Register now →](${REGISTER})`,
      next:'register'
    },
    {
      keys:['procurement','purchasing','sourcing','category','strategic sourcing','p2p','procure-to-pay'],
      reply:`Supply Chain Canada — West is the professional home for procurement practitioners in Alberta and BC.\n\nAt **West Futures 2026** (Oct 2, River Cree Resort, Edmonton):\n• Sessions on AI-assisted sourcing, tariff response, ESG/supplier compliance, and category management\n• 300+ procurement leaders from energy, government, retail, agri-food and logistics\n• 10 CPD credits for your SCMP logbook\n\n[Register now →](${REGISTER})`,
      next:'register'
    },
    {
      keys:['logistics','transportation','freight','shipping','warehouse','last mile','3pl','fourth party','corridor','rail','trucking'],
      reply:`Transportation, Logistics & Infrastructure is a dedicated focus area at **West Futures 2026** (Oct 2, Edmonton).\n\nWith trade route disruptions, port congestion and the Western Canada corridor in flux, this track covers where freight is moving, what's slowing it down, and how leading operations leaders are building resilient last-mile networks.\n\n[Join the conversation Oct 2 →](${REGISTER})`,
      next:'register'
    },
    {
      keys:['western canada','alberta','bc','british columbia','edmonton','calgary','vancouver','prairie','west'],
      reply:`Supply Chain Canada — West is the regional institute serving **Alberta and British Columbia** — 2,500+ supply chain professionals across the two provinces.\n\nThe **West Futures Conference** (Oct 2, Edmonton) is the flagship gathering of Western Canada's supply chain community — procurement, logistics, energy, government, and tech leaders under one roof.\n\nMembership is open to AB and BC professionals. [Learn more →](${MEMBERSHIP})`,
      next:'register'
    },
  ];

  const NEXT_STEPS = {
    register: `**Next step →** [Register now](${REGISTER}) — secure your seat for October 2.`,
    date: `**Next step →** Block **Oct 2, 2026** in your calendar and [grab your seat](${REGISTER}).`,
    agenda: `**Next step →** [Register now](${REGISTER}) and secure your seat for October 2.`,
    venue: `**Next step →** Call **1-844-425-2733** to book the $189/night conference rate at River Cree.`,
    travel: `**Next step →** Apply Air Canada code **YQ6XKBC1** at checkout for 15% off flights to YEG.`,
    support: `**Next step →** Email **${SUPPORT}** — we reply within one business day.`,
  };

  const FALLBACK = `Good question. The topics supply chain professionals ask about most — AI, tariffs, ESG, logistics, talent, career growth — are all on the agenda at **West Futures Conference 2026** on October 2 in Edmonton.\n\n300+ Western Canada supply chain leaders will be in the room. Whether you're looking to upskill, find your next role, benchmark with peers, or stay ahead of the curve — this is where the conversation happens.\n\n[See what's on the agenda →](${REGISTER})\n\nOr email **${SUPPORT}** — we'll point you in the right direction.`;

  // ---------- Page-aware summary ----------
  function pageSummary(){
    const title = (document.title || '').split('·')[0].trim();
    const h1 = document.querySelector('h1')?.innerText.trim() || '';
    return {title, h1};
  }

  // ---------- Convince-my-boss email generator ----------
  function buildEmail(){
    return `Subject: Approval Request — Attending the 2026 West Futures Conference (Oct 2, Edmonton)

Hi [Manager's name],

I'd like approval to attend the **West Futures Conference 2026**, the flagship Western Canada supply chain conference hosted by Supply Chain Canada — West on October 2, 2026 at River Cree Resort in Edmonton.

Here's why I believe this is a high-ROI investment for the team:

• **Direct intelligence** — 15+ speakers including Mark Parsons (ATB Chief Economist) on the Alberta economic outlook, plus sessions on AI in procurement, ESG/Tier-1 audit prep, and tariff response.
• **The room** — 300+ senior procurement, logistics and operations leaders from across Western Canada in a single day. Peer benchmarking and supplier intros that typically take months to build.
• **10 CPD credits** — applicable to my SCMP designation logbook. Certificate within 5 business days post-event.
• **Risk & resilience** — six focus areas covering tariff strategy, ESG/Scope-3 readiness, logistics corridors, and AI/automation — directly relevant to our 2026 procurement plan.
• **Network ROI** — 30+ sponsor organizations and solution providers attending. I'll bring back a prioritised vendor shortlist for our open initiatives.
• **Cost-controlled** — Member registration is **$799 + tax** (Non-member: $999 + tax). Conference hotel rate is $189/night. Air Canada offers 15% off flights to YEG with our group code.

Total estimated cost: ~$1,300 (registration + 1 night + flight). Detailed agenda and ROI plan available at https://abportal.supplychaincanada.com — happy to walk through this with you.

Would you approve my registration?

Thanks,
[Your name]

PS — If you can share your boss's name or your latest job description / resume in the chat below, I can tailor this email to your specific role and projects.`;
  }

  // ---------- Matcher ----------
  function findMatch(text){
    const t = text.toLowerCase();
    let best = null, bestScore = 0;
    for (const entry of KB){
      let score = 0;
      for (const k of entry.keys){
        if (t.includes(k.toLowerCase())) score += k.length;
      }
      if (score > bestScore){ bestScore = score; best = entry; }
    }
    return bestScore > 0 ? best : null;
  }

  function buildReply(userText){
    const match = findMatch(userText);
    if (!match) return FALLBACK + '\n\n' + (NEXT_STEPS.register);

    if (match.kind === 'email'){
      const email = buildEmail();
      return `Here's a ready-to-send email — just edit **[Manager's name]** and **[Your name]** and paste it into your mail client.\n\n\`\`\`\n${email}\n\`\`\`\n\nWant a more personalised version? Drop your **role + 2-3 current projects** in the chat and I'll tighten the bullets to your work.\n\n${NEXT_STEPS.register}`;
    }
    const next = NEXT_STEPS[match.next] || NEXT_STEPS.register;
    return match.reply + '\n\n' + next;
  }

  // ---------- styles ----------
  const css = `
  .sccbot-fab{position:fixed;right:24px;bottom:24px;z-index:9998;display:flex;align-items:center;gap:10px;background:#ED1C24;color:#fff;border:0;padding:13px 20px;border-radius:999px;font-family:'Barlow Condensed',Arial,sans-serif;font-weight:700;letter-spacing:.06em;text-transform:uppercase;font-size:13px;cursor:pointer;box-shadow:0 14px 40px rgba(237,28,36,.4);transition:transform .2s,background .2s}
  .sccbot-fab:hover{background:#C41019;transform:translateY(-2px)}
  .sccbot-fab .dot{width:8px;height:8px;border-radius:50%;background:#fff;box-shadow:0 0 0 0 rgba(255,255,255,.7);animation:sccpulse 2s infinite}
  @keyframes sccpulse{0%{box-shadow:0 0 0 0 rgba(255,255,255,.7)}70%{box-shadow:0 0 0 10px rgba(255,255,255,0)}}
  .sccbot-panel{position:fixed;right:24px;bottom:24px;width:420px;max-width:calc(100vw - 32px);height:640px;max-height:calc(100vh - 48px);background:#fff;border:1px solid #E7E3E1;border-radius:18px;box-shadow:0 30px 80px rgba(10,11,12,.25);display:none;flex-direction:column;z-index:9999;color:#1A1B1F;font-family:'Barlow','Inter',system-ui,sans-serif;overflow:hidden}
  .sccbot-panel.open{display:flex;animation:sccin .25s ease}
  @keyframes sccin{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
  .sccbot-head{background:linear-gradient(135deg,#ED1C24 0%,#C41019 100%);padding:18px 20px;display:flex;justify-content:space-between;align-items:center;color:#fff}
  .sccbot-head .ttl{font-family:'Barlow Condensed',Arial,sans-serif;font-weight:800;text-transform:uppercase;font-size:18px;letter-spacing:.04em;line-height:1.05}
  .sccbot-head .sub{font-size:10px;letter-spacing:.18em;text-transform:uppercase;opacity:.9;margin-top:3px;font-family:'Barlow Condensed',Arial,sans-serif;font-weight:600;display:flex;gap:8px;align-items:center}
  .sccbot-head .sub::before{content:"";width:6px;height:6px;border-radius:50%;background:#fff;animation:sccpulse 2s infinite}
  .sccbot-head button{color:#fff;width:30px;height:30px;border:1px solid rgba(255,255,255,.45);border-radius:50%;background:transparent;cursor:pointer;font-size:18px;line-height:1}
  .sccbot-msgs{flex:1;overflow-y:auto;padding:18px 16px;display:flex;flex-direction:column;gap:12px;background:#FBF9F6}
  .sccbot-msgs::-webkit-scrollbar{width:6px}
  .sccbot-msgs::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:6px}
  .sccbot-msg{max-width:92%;padding:13px 16px;font-size:14px;line-height:1.55;border-radius:14px;white-space:pre-wrap;word-wrap:break-word}
  .sccbot-msg.user{align-self:flex-end;background:#ED1C24;color:#fff;border-bottom-right-radius:4px}
  .sccbot-msg.bot{align-self:flex-start;background:#fff;color:#1A1B1F;border:1px solid #E7E3E1;border-bottom-left-radius:4px}
  .sccbot-msg.bot a{color:#ED1C24;border-bottom:1px solid #ED1C24;font-weight:600}
  .sccbot-msg.bot pre{background:#0A0B0C;color:#fff;border-radius:8px;padding:14px;margin:10px 0;font-family:ui-monospace,Menlo,monospace;font-size:12px;white-space:pre-wrap;position:relative;line-height:1.55;border:0}
  .sccbot-msg.bot pre .copybtn{position:absolute;top:6px;right:6px;font-family:'Barlow Condensed',Arial,sans-serif;font-weight:700;text-transform:uppercase;font-size:10px;letter-spacing:.15em;padding:5px 9px;background:#ED1C24;color:#fff;border:0;cursor:pointer;border-radius:4px}
  .sccbot-msg.bot strong{color:#0A0B0C}
  .sccbot-typing{display:inline-flex;gap:4px;padding:13px 16px;background:#fff;border:1px solid #E7E3E1;border-radius:14px;align-self:flex-start}
  .sccbot-typing span{width:6px;height:6px;border-radius:50%;background:#999;animation:sccblink 1.2s infinite}
  .sccbot-typing span:nth-child(2){animation-delay:.2s}
  .sccbot-typing span:nth-child(3){animation-delay:.4s}
  @keyframes sccblink{0%,80%,100%{opacity:.3}40%{opacity:1}}
  .sccbot-quick{padding:12px 12px 6px;border-top:1px solid #E7E3E1;background:#FBF9F6}
  .sccbot-quick .lbl{font-family:'Barlow Condensed',Arial,sans-serif;font-weight:700;text-transform:uppercase;font-size:10px;letter-spacing:.18em;color:#8B8682;margin-bottom:8px;padding:0 2px}
  .sccbot-chips{display:flex;flex-wrap:wrap;gap:6px}
  .sccbot-chips button{font-family:'Barlow Condensed',Arial,sans-serif;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:.06em;padding:7px 12px;border:1px solid #D8D3D0;background:#fff;color:#1A1B1F;cursor:pointer;transition:all .15s;border-radius:999px;line-height:1.2}
  .sccbot-chips button:hover{border-color:#ED1C24;color:#ED1C24}
  .sccbot-chips button.primary{background:#ED1C24;border-color:#ED1C24;color:#fff}
  .sccbot-chips button.primary:hover{background:#C41019;border-color:#C41019;color:#fff}
  .sccbot-input{padding:10px 12px 12px;display:flex;gap:8px;background:#FBF9F6;border-top:1px solid #E7E3E1}
  .sccbot-input textarea{flex:1;background:#fff;color:#1A1B1F;border:1px solid #D8D3D0;border-radius:10px;padding:11px 14px;font:inherit;font-size:14px;resize:none;outline:none;font-family:'Barlow','Inter',system-ui,sans-serif;max-height:90px}
  .sccbot-input textarea:focus{border-color:#ED1C24}
  .sccbot-input button{background:#ED1C24;color:#fff;border:0;padding:0 18px;border-radius:10px;font-family:'Barlow Condensed',Arial,sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.06em;cursor:pointer;font-size:13px}
  .sccbot-input button:disabled{opacity:.5;cursor:wait}
  .sccbot-foot{padding:8px 14px;font-size:10px;color:#8B8682;letter-spacing:.06em;text-transform:uppercase;font-family:'Barlow Condensed',Arial,sans-serif;text-align:center;background:#FBF9F6;border-top:1px solid #E7E3E1}
  .sccbot-foot a{color:#1A1B1F;border-bottom:1px solid #ED1C24}
  @media (max-width:560px){.sccbot-panel{right:8px;left:8px;bottom:8px;width:auto;height:80vh}.sccbot-fab{right:12px;bottom:12px;padding:11px 16px;font-size:12px}}
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  // ---------- DOM ----------
  const fab = document.createElement('button');
  fab.className = 'sccbot-fab';
  fab.innerHTML = '<span class="dot"></span> Ask West';
  fab.setAttribute('aria-label','Open AI assistant');

  const panel = document.createElement('div');
  panel.className = 'sccbot-panel';
  panel.innerHTML = `
    <div class="sccbot-head">
      <div>
        <div class="ttl">West · Conference Concierge</div>
        <div class="sub">Online · instant answers</div>
      </div>
      <button class="sccbot-close" aria-label="Close">×</button>
    </div>
    <div class="sccbot-msgs" role="log" aria-live="polite"></div>
    <div class="sccbot-quick">
      <div class="lbl">Quick Actions</div>
      <div class="sccbot-chips">
        <button class="primary" data-q="Draft an email I can send to my boss to get approval for the West Futures Conference 2026.">✉ Convince My Boss</button>
        <button data-q="Summarise this page in a few bullets.">📄 Summarise this page</button>
        <button data-q="What's included with my registration?">🎟 What's included</button>
        <button data-q="What's the conference pricing?">💲 Pricing</button>
        <button data-q="Who's speaking?">🎤 Speakers</button>
        <button data-q="What's the agenda?">📅 Agenda</button>
        <button data-q="Where is the venue?">📍 Venue</button>
        <button data-q="How does the Air Canada discount work?">✈ Flight deal</button>
        <button data-q="How do I sponsor the conference?">★ Sponsor</button>
        <button data-q="Tell me about membership.">★ Membership</button>
        <button data-q="I need to speak to a real person.">👤 Talk to human</button>
      </div>
    </div>
    <div class="sccbot-input">
      <textarea rows="1" placeholder="Ask me anything…" aria-label="Message"></textarea>
      <button class="sccbot-send">Send</button>
    </div>
    <div class="sccbot-foot">AI-assisted · always available · <a href="mailto:${SUPPORT}">${SUPPORT}</a></div>
  `;
  document.body.appendChild(fab);
  document.body.appendChild(panel);

  const msgsEl = panel.querySelector('.sccbot-msgs');
  const ta = panel.querySelector('textarea');
  const sendBtn = panel.querySelector('.sccbot-send');
  const closeBtn = panel.querySelector('.sccbot-close');
  const chipBtns = panel.querySelectorAll('.sccbot-chips button');

  let busy = false;
  const history = [];

  function open(){
    panel.classList.add('open');
    fab.style.display = 'none';
    if (history.length === 0){
      const {title} = pageSummary();
      addBot(`Hi — I'm **West**, your conference concierge.\n\nYou're on **${title}**. Tap any quick action below or type a question. I'll point you to the right page and the registration portal.\n\nNeed a human? Email **${SUPPORT}**.`);
    }
    setTimeout(()=>ta.focus(), 200);
  }
  function close(){ panel.classList.remove('open'); fab.style.display = ''; }
  fab.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  // Expose for external buttons
  window.SCCBot = { open, ask: txt => ask(txt) };

  function escapeHtml(s){return s.replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);}
  function renderMarkdown(text){
    const out=[];
    const re=/```(?:\w+)?\n?([\s\S]*?)```/g;
    let last=0,m;
    while((m=re.exec(text))!==null){
      if(m.index>last) out.push(inlineMd(text.slice(last,m.index)));
      out.push(`<pre><button class="copybtn" data-c="${escapeHtml(m[1])}">Copy</button>${escapeHtml(m[1])}</pre>`);
      last=m.index+m[0].length;
    }
    if(last<text.length) out.push(inlineMd(text.slice(last)));
    return out.join('');
  }
  function inlineMd(s){
    s = escapeHtml(s);
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\n/g, '<br/>');
    return s;
  }

  function addUser(t){
    history.push({role:'user', content:t});
    const el = document.createElement('div'); el.className='sccbot-msg user'; el.textContent=t;
    msgsEl.appendChild(el); msgsEl.scrollTop = msgsEl.scrollHeight;
  }
  function addBot(t){
    history.push({role:'assistant', content:t});
    const el = document.createElement('div'); el.className='sccbot-msg bot'; el.innerHTML = renderMarkdown(t);
    msgsEl.appendChild(el);
    el.querySelectorAll('.copybtn').forEach(b=>{
      b.addEventListener('click', e=>{
        e.stopPropagation();
        navigator.clipboard.writeText(b.dataset.c);
        const o = b.textContent; b.textContent = 'Copied ✓';
        setTimeout(()=>b.textContent=o, 1400);
      });
    });
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }
  function showTyping(){
    const el = document.createElement('div'); el.className='sccbot-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    msgsEl.appendChild(el); msgsEl.scrollTop = msgsEl.scrollHeight;
    return el;
  }

  // Optional LLM layer — tries the first-party /api/ask endpoint, and falls back
  // to the offline rules engine on ANY failure (no key, 4xx/5xx, network, timeout).
  async function llmAnswer(text){
    try{
      const ctrl = new AbortController();
      const to = setTimeout(()=>ctrl.abort(), 13000);
      const r = await fetch('/api/ask', {
        method:'POST',
        headers:{'content-type':'application/json'},
        body: JSON.stringify({ question:text, page:(document.title||'').split('·')[0].trim() }),
        signal: ctrl.signal
      });
      clearTimeout(to);
      if(!r.ok) return null;
      const data = await r.json().catch(()=>null);
      const a = data && typeof data.answer === 'string' ? data.answer.trim() : '';
      return a || null;
    }catch(e){ return null; }
  }

  async function ask(text){
    if (busy || !text.trim()) return;
    busy = true; sendBtn.disabled = true;
    const q = text.trim();
    addUser(q);
    ta.value = '';
    const t = showTyping();
    let reply;
    const m = findMatch(q);
    if (m && m.kind === 'email'){
      // "Convince my boss" stays a deterministic template — better than free-form.
      await new Promise(r => setTimeout(r, 350 + Math.random()*250));
      reply = buildReply(q);
    } else {
      reply = await llmAnswer(q);         // try the AI layer first…
      if (!reply) reply = buildReply(q);  // …fall back to the offline engine.
    }
    t.remove();
    addBot(reply);
    busy = false; sendBtn.disabled = false; ta.focus();
  }

  sendBtn.addEventListener('click', ()=>ask(ta.value));
  ta.addEventListener('keydown', e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); ask(ta.value); }});
  chipBtns.forEach(b=>b.addEventListener('click', ()=>ask(b.dataset.q)));
})();
