/**
 * "Ask West" — optional LLM answer endpoint (first-party, Vercel serverless).
 *
 * Design goal: NEVER be a single point of failure. If the ANTHROPIC_API_KEY env
 * var is not set, or the upstream call errors/times out, this returns a non-200
 * status so the browser widget (assets/convince-bot.js) transparently falls back
 * to its built-in offline rules engine. The site keeps answering either way.
 *
 * To enable the LLM layer: add ANTHROPIC_API_KEY in Vercel → Project → Settings →
 * Environment Variables, then redeploy. No other change required.
 */
const MODEL = 'claude-haiku-4-5-20251001';
const REGISTER = 'https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1710&request_locale=en#home';

// Compact, authoritative knowledge base — keep in sync with the site.
const KNOWLEDGE = `
ORGANIZATION: Supply Chain Canada — West (SCC West). The regional institute of Supply Chain Canada serving 2,500+ procurement, logistics and operations professionals across Alberta and British Columbia (chapters: Calgary, Edmonton, Vancouver).

FLAGSHIP EVENT: West Futures Conference 2026 — a two-day event at River Cree Resort & Casino, 300 East Lapotac Blvd, Enoch Cree Nation, Greater Edmonton Area, AB.

DAY 1 — Thursday, October 1, 2026 (Pre-Conference Workshops; optional paid add-on):
- River Cree 1, 9:00 AM–12:00 PM: Pre-Conference Workshop — Competition Bureau & Office of the Procurement Ombudsman.
- River Cree 1, 1:00–4:00 PM: "AI for Supply Chain Productivity" hands-on workshop with Ian Gonzalez.
- River Cree 2, 5:30–9:00 PM: Executive Round Table (invitation-only; thought partner: Vallen). To request an invitation, email thoang@supplychaincanada.com.
- Pre-conference workshop pricing: Member $100, Non-member $200 (+GST).

DAY 2 — Friday, October 2, 2026 (Main Conference, River Cree Resort):
- 6:45–8:00 AM Registration & badge pick-up. Vendor Pathway open through the day.
- 7:00–8:00 AM Breakfast (VIP Networking Breakfast available as an add-on).
- 8:00 AM Opening Remarks; 8:20 AM CPO Fireside Chat.
- 9:00–10:00 AM Economic Update — Mark Parsons, Chief Economist, ATB.
- 10:30–11:45 AM Concurrent breakouts (choose one): "Purchase with Purpose: How Edmonton's Procurement Strategy is Building a More Affordable, Prosperous, and Innovative City" (City of Edmonton); "Beyond the Bid: Contracting 2.0 in an Era of Supply Chain Uncertainty" (panel); plus one more breakout to be announced.
- 11:45 AM–12:45 PM Lunch.
- 1:00–2:00 PM Concurrent breakouts: Featured Presentation with Minto Roy; Solution Room (sponsor showcase); "Building Internal Support: The Supply Chain Value Proposition" panel with Siobhan Chinnery.
- 2:30–3:30 PM Concurrent breakouts: "The Intelligent Supply Chain: Reimagining Strategic Sourcing with AI" (Ian Gonzalez); "Indigenous Perspectives in Supply Chain" (Phil Ducharme & Drew LaFond, MLT Aikins); "Office of the Procurement Ombudsman & Competition Bureau" (Amy Hill, Competition Bureau).
- 5:00–8:00 PM Evening Reception & Dinner.
More speakers and session details are announced on a rolling basis.

CONFERENCE PRICING (main conference, +tax): Member $799; Non-Member $999; Student Affiliate $399. Groups of 8+ qualify for bundle rates — email thoang@supplychaincanada.com.
INCLUDED: full-day access to keynotes/panels/breakouts, breakfast, hosted lunch, evening reception, sponsor showcase, 10 CPD credits (certificate within 5 business days), post-event presentation library.
CPD: 10 CPD credits, applicable to the SCMP designation logbook.
VENUE/STAY: River Cree Resort; conference hotel rate $189/night; reservations 1-844-425-2733. Hell's Kitchen (Gordon Ramsay's first Canadian location) opens on-site summer 2026.
TRAVEL: Air Canada is the official airline — code YQ6XKBC1 at aircanada.com for up to 15% off flights to YEG (Edmonton), valid travel Sep 30–Oct 4, 2026.
ATTENDANCE: 300+ senior practitioners and executives across energy, government, retail, agri-food, education and tech. Sold out in prior years.
SPONSORS: AMCC is Premier Sponsor; City of Edmonton among confirmed partners. Sponsorship/prospectus: thoang@supplychaincanada.com.
MEMBERSHIP (annual): Alberta — Regular $440, Retired $100, Accreditation Candidate $440, Student Affiliate $50, Academic Affiliate $220. British Columbia — Regular $495, Accreditation Candidate $495, Retired $100, Student Affiliate $50, Academic Affiliate $250. Apply at https://www.supplychaincanada.com/membership.
REFUNDS: Full refund if SCC West cancels. Otherwise written notice 14+ days before = full refund; within 14 days no refund. Email info.ab@supplychaincanada.com.
CONTACT: General info.ab@supplychaincanada.com; Sponsorship/speaking thoang@supplychaincanada.com; Phone 1-866-610-4089.
REGISTER: ${REGISTER}
`;

const SYSTEM = `You are "West", the friendly concierge for Supply Chain Canada — West and its flagship West Futures Conference 2026.

Rules:
- Answer ONLY using the KNOWLEDGE below. If something isn't covered, say you're not sure and point them to info.ab@supplychaincanada.com — never invent facts, prices, names or dates.
- Be concise and warm: 2-5 short sentences or a tight bullet list. Use Markdown. Bold key facts.
- ALWAYS finish by tying the answer back to the West Futures Conference and inviting them to register, using this exact Markdown link as the final line: [Register for West Futures 2026 →](${REGISTER})
- Even for broad/off-topic questions (jobs, careers, AI, tariffs, ESG, networking, upskilling), give a genuinely helpful answer, then connect it to how the conference helps and invite them to register.

KNOWLEDGE:
${KNOWLEDGE}`;

module.exports = async (req, res) => {
  // Same-origin only; reject non-POST quickly.
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) { res.status(503).json({ error: 'llm_disabled' }); return; } // → client falls back to offline engine

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const question = (body && body.question ? String(body.question) : '').slice(0, 1000).trim();
  const page = (body && body.page ? String(body.page) : '').slice(0, 200);
  if (!question) { res.status(400).json({ error: 'no_question' }); return; }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 600,
        system: SYSTEM,
        messages: [{ role: 'user', content: page ? `(Visitor is on the "${page}" page.)\n\n${question}` : question }],
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!r.ok) { res.status(502).json({ error: 'upstream', status: r.status }); return; }
    const data = await r.json();
    const answer = (data && data.content && data.content[0] && data.content[0].text || '').trim();
    if (!answer) { res.status(502).json({ error: 'empty' }); return; }
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ answer });
  } catch (e) {
    clearTimeout(timer);
    res.status(502).json({ error: 'exception', message: String(e && e.message || e) });
  }
};
