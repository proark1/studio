# Improvement Audit Report - 2026-07-05

Scope: local repo, current `main`, local runtime, sampled browser routes, dependency audit, GitHub/Railway status, and live-domain sanity checks.

## Executive Summary

The prototype is in good shape as a clickable product demo: syntax is clean, the last Railway/GitHub deploy status is green, the sampled routes have no console errors, and the recently added value-plan modules render correctly.

The biggest opportunities are now less about adding more screens and more about making the product faster, safer, easier to operate, and closer to production reality.

Top priorities:

1. Add compression and long-lived static caching.
2. Split the large frontend bundles so CRM/admin/i18n do not load on every visit.
3. Fix hash-routing vs sitemap/SEO mismatch.
4. Add CI checks for syntax, audit, smoke tests, and deploy status.
5. Lock down production writes with mandatory admin auth.
6. Fix mobile header overflow on public/admin routes.
7. Connect the intended production domain to this deployed app, or update canonical/sitemap targets.
8. Move from demo-only mutable frontend state to explicit data contracts and persistence.
9. Add observability, rate limits, and safer upload limits for the image API.
10. Convert the value modules into measurable workflows with KPIs and event tracking.

## What Was Checked

- Git state: `main` equals `origin/main`; only untracked local file before this report was `geschaeftsprozesse.md`.
- Latest commit: `5a6024a3d7129a3272d7a66622bfeed12e958966`.
- GitHub/Railway commit status: `kampsportstudio - studio` is `success`.
- Local server health: `GET /api/health` returned `{"ok":true,"db":false,"tokenRequired":false}` in local static mode.
- Syntax: `node --check` passed for `server.js`, `assets/js/data.js`, `assets/js/i18n.js`, `assets/js/crm.js`, `assets/js/app.js`, and `assets/js/admin.js`.
- Dependency audit: `npm audit --omit=dev` found 0 vulnerabilities.
- Dependency freshness: Express is current on v4 (`4.22.2`), latest major is v5 (`5.2.1`).
- Browser smoke tests: sampled `#/`, `#/app`, `#/crm/dashboard`, `#/crm/mehrwert`, and `#/admin` at desktop and mobile widths.
- Browser console: no errors or warnings found on sampled routes.
- Accessibility quick check: no obvious unlabeled buttons, unlabeled inputs, nameless links, or duplicate IDs on sampled routes.
- Live-domain sanity: `https://nft-gym.de/standorte` responds with a different live site title, while `https://nft-gym.de/assets/js/app.js?v=26` returns 404.

## Current Strengths

- The demo already covers public website, member app, CRM, admin image studio, employee workflows, and the new value-plan cockpit.
- Recent value-plan features are visible in the product, not only in docs.
- No known production dependency vulnerabilities.
- The app is resilient locally without `DATABASE_URL`; it falls back to static/localStorage mode.
- Self-hosted fonts avoid external font requests.
- Browser route checks are clean for runtime errors.
- Core controls sampled have acceptable basic labeling.

## Top 10 Improvements

### 1. Enable compression and proper static caching

Priority: P0  
Impact: Faster load, lower bandwidth, better mobile experience  
Evidence:

- `assets/js/i18n.js`: 168 KB raw, about 51 KB gzip.
- `assets/js/app.js`: 143 KB raw, about 39 KB gzip.
- `assets/js/crm.js`: 125 KB raw, about 33 KB gzip.
- `assets/css/app.css`: 40 KB raw, about 9 KB gzip.
- Server currently returns `Content-Length: 142638` for `app.js` even with `Accept-Encoding: gzip`.
- Static assets return `Cache-Control: public, max-age=0`.

Recommended work:

- Add `compression` middleware or serve precompressed gzip/brotli assets from Railway/proxy.
- Use `Cache-Control: public, max-age=31536000, immutable` for versioned assets like `app.js?v=26`.
- Use `Cache-Control: no-cache` or short cache for `index.html`.
- Disable `X-Powered-By`.

Expected result: JS/CSS transfer can drop from roughly 566 KB raw to about 160 KB compressed, before any code-splitting.

### 2. Split route bundles and stop loading CRM/admin for every visitor

Priority: P0  
Impact: Faster public site, cleaner architecture, easier maintainability  
Evidence:

- `index.html` loads all main scripts on every route: `data.js`, `i18n.js`, `crm.js`, `admin.js`, `app.js`.
- Largest modules:
  - `i18n.js`: 168 KB, 1,957 lines.
  - `app.js`: 143 KB, 1,710 lines.
  - `crm.js`: 125 KB, 1,350 lines.
  - `data.js`: 52 KB.
  - `admin.js`: 30 KB.
- Total first-party JS/CSS is about 566 KB raw.

Recommended work:

- Load public site first, then lazy-load CRM only when route starts `#/crm`.
- Lazy-load admin only when route starts `#/admin`.
- Split translations by surface or language. Load `de` base first; lazy-load `tr` and `ar` when selected.
- Move demo data into route-specific files.

Expected result: first public page becomes lighter and the codebase becomes easier to change safely.

### 3. Fix SEO routing mismatch

Priority: P0 if public SEO matters  
Impact: Search visibility, canonical correctness, sitemap quality  
Evidence:

- App routing reads `location.hash`.
- `sitemap.xml` advertises clean URLs like `/standorte`, `/kinder`, `/preise`, and `/standort/krefeld`.
- With the current hash router, clean paths can fall back to the home route unless explicitly mapped.
- `robots.txt` tries to disallow `/#/crm` and `/#/admin`, but URL fragments are not sent to servers or crawlers in the normal way.

Recommended work:

- Either commit to hash-routing and make sitemap URLs use hash URLs only for prototype use, or move to history routing.
- Best production path: add pathname routing plus server fallback, then make `/standorte`, `/preise`, etc. render their real pages.
- Add route-specific titles/descriptions for clean paths.
- Block internal surfaces with real paths or auth, not fragment disallow rules.

### 4. Add CI and deploy gates

Priority: P0  
Impact: Prevent broken deploys and regressions  
Evidence:

- `package.json` only has `start`.
- No root `.github` workflows exist.
- Current checks are manual.

Recommended work:

- Add scripts:
  - `check`: run `node --check` on all JS files.
  - `audit`: run `npm audit --omit=dev`.
  - `smoke`: boot local server and verify key routes.
- Add GitHub Actions workflow for PR/push.
- Fail deploy when syntax/audit/smoke fails.
- Capture deploy status in the workflow summary.

### 5. Require admin write auth in production

Priority: P0  
Impact: Security, data integrity  
Evidence:

- `server.js` allows writes when `ADMIN_TOKEN` is not set.
- Local health reports `tokenRequired:false`.
- `PUT /api/images/:id` accepts base64 image payloads up to 16 MB JSON.

Recommended work:

- Require `ADMIN_TOKEN` whenever `NODE_ENV=production`.
- Fail server startup in production if `DATABASE_URL` exists but `ADMIN_TOKEN` is missing.
- Add rate limiting for write endpoints.
- Whitelist allowed image IDs.
- Lower upload limit if possible, or enforce exact max bytes per slot.
- Add audit fields for writes: actor, IP hash, user agent, timestamp.

### 6. Fix mobile header overflow

Priority: P1  
Impact: Mobile polish and perceived quality  
Evidence:

- Mobile public home has about 176 px horizontal overflow.
- Mobile admin has about 96 px horizontal overflow.
- Offending elements are `.nav-cta`, the primary CTA link, and the hamburger position.

Recommended work:

- At small widths, hide all `.nav-cta .btn` or move CTA into the mobile menu.
- Ensure `.site-head` children use `min-width:0`.
- Keep language/theme controls compact or move them behind menu below 420 px.
- Add a smoke assertion for `documentElement.scrollWidth === clientWidth`.

### 7. Align live domain, deploy target, and canonical URLs

Priority: P1  
Impact: Avoid shipping to the wrong surface or measuring the wrong site  
Evidence:

- Repo canonical points to `https://nft-gym.de/`.
- Live `https://nft-gym.de/standorte` returns a different current site title.
- Live `https://nft-gym.de/assets/js/app.js?v=26` returns 404.
- GitHub/Railway deploy status is green, but the custom domain appears not to serve this repo.

Recommended work:

- Decide whether this repo should power `nft-gym.de`, a staging subdomain, or only a prototype URL.
- If production: connect the domain to Railway and validate assets/routes.
- If staging: update canonical, sitemap, robots, and Open Graph URLs to the staging domain or mark pages noindex.
- Add a deployment checklist that verifies the final public URL, not only the GitHub commit status.

### 8. Move from demo state to explicit data contracts

Priority: P1  
Impact: Real customer value, reliability, handoff to production engineering  
Evidence:

- Frontend mutates global `window.DATA` directly.
- Many workflows are local-only state or toast-only actions.
- CRM, app, admin all funnel through one render loop and `innerHTML`.

Recommended work:

- Define API contracts for leads, members, families, check-ins, payments, retention, tasks, reports, safety incidents, and curriculum.
- Add a persistence layer for state-changing actions.
- Add optimistic UI only where the API confirms write success or exposes retry.
- Add a simple event log for critical actions.
- Start with the highest-value workflows: lead speed-to-booking, onboarding day 0-90, payment exceptions, retention inbox, safety incidents.

### 9. Improve observability and operational safety

Priority: P1  
Impact: Faster debugging, safer production operation  
Evidence:

- Server has simple console logs only.
- `/api/health` checks DB but does not expose version/build metadata.
- No rate limit, request ID, structured logging, or error categorization.

Recommended work:

- Add structured logs with request ID.
- Add health payload fields: commit SHA, environment, uptime, db status.
- Add `/api/version`.
- Add 4xx/5xx counters or a lightweight logging sink.
- Add rate limits on admin/image endpoints.
- Add DB backup/restore notes for `studio_images`.

### 10. Turn value modules into measurable workflows

Priority: P1  
Impact: Better customer value, employee efficiency, management clarity  
Evidence:

- The product now shows the top 10 value levers, 90-day onboarding, safety, and curriculum.
- Many actions are still demo confirmations rather than measurable business events.

Recommended work:

- Instrument a KPI chain:
  - Lead response time.
  - Trial booking rate.
  - Trial show rate.
  - Trial-to-contract conversion.
  - First 30-day check-ins.
  - Weekly report send rate.
  - Churn-risk save rate.
  - Payment exception resolution time.
  - Safety incident parent-contact SLA.
  - Trainer prep time and curriculum compliance.
- Add a GF dashboard that compares these KPIs by Standort.
- Add employee workload metrics: open tasks, SLA breaches, automations saved, manual overrides.

## Product Opportunities

For customers:

- Make the 90-day journey personal: next class, buddy, trainer note, progress goal, and one-tap check-in question.
- Add parent trust center: emergency contacts, consent, safety process, trainer qualification, accident protocol status.
- Add family calendar sync and smart rescheduling.
- Add visible weekly progress tied to skills, belt goals, and attendance.
- Add referral and community moments after milestones, not randomly.

For employees:

- Create a daily command center: "today first", SLA breaches, callbacks, payment issues, no-shows, and safety follow-ups.
- Add bulk actions for CRM queues.
- Add persistent filters and saved views by role.
- Add keyboard command palette for CRM power users.
- Add automatic task creation from events: no-show, late payment, low pulse, missed onboarding milestone.

For management:

- Add Standort comparison: growth, churn, attendance, lead speed, conversion, revenue leakage, safety SLA.
- Add expansion readiness score: staffing, curriculum, lead pipeline, launch checklist, local partner list.
- Add margin view by course: occupancy, trainer cost, room capacity, ARPU, payment exceptions.
- Add weekly exception digest instead of static reports.

## Technical Architecture Recommendations

Short term:

- Keep the current no-build setup if speed matters, but introduce CI and compression.
- Add route-level lazy loading using dynamic script injection before migrating frameworks.
- Extract shared render utilities and escape helpers.
- Add a small test harness for route rendering.

Medium term:

- Move to a light build pipeline such as Vite only when the team is ready to own it.
- Use ES modules and real imports.
- Split public/app/CRM/admin surfaces.
- Introduce TypeScript or JSDoc types around data contracts before building real backend flows.

Long term:

- Replace global mutable demo data with API-backed domain models.
- Add migrations for DB schema.
- Add role-based auth.
- Add tenant/location isolation if the product scales to multiple studios/franchise locations.

## Quick Wins: 1-2 Days

1. Add gzip compression, static cache headers, and disable `X-Powered-By`.
2. Fix mobile `.nav-cta` overflow.
3. Add `npm run check` for all JS syntax checks.
4. Add a GitHub Actions workflow for syntax + audit.
5. Add production guard that refuses write endpoints without `ADMIN_TOKEN`.
6. Add clean-path redirect or route mapping for sitemap URLs.
7. Update the report/docs to clarify whether `nft-gym.de` is production or external.

## Next 14 Days

Week 1:

- Implement server hardening and compression.
- Add CI.
- Fix mobile overflow.
- Add smoke tests for key routes and no-horizontal-scroll.
- Add production admin-token enforcement.

Week 2:

- Split admin/CRM loading from public site.
- Decide routing strategy for SEO.
- Add KPI event model for 90-day onboarding, retention, and safety.
- Add first persistent API endpoint beyond image storage, preferably onboarding/check-in or task events.

## Verification Notes

Commands/checks used:

- `node --check server.js`
- `node --check assets/js/data.js`
- `node --check assets/js/i18n.js`
- `node --check assets/js/crm.js`
- `node --check assets/js/app.js`
- `node --check assets/js/admin.js`
- `npm audit --omit=dev --json`
- `npm outdated --json`
- Local server on port `43831`
- Browser checks for `#/`, `#/app`, `#/crm/dashboard`, `#/crm/mehrwert`, `#/admin`
- GitHub commit status for `5a6024a3d7129a3272d7a66622bfeed12e958966`

## Bottom Line

Do not add another large feature screen first. The best next work is making the existing product faster, safer, measurable, and deployable with confidence. Compression, CI, routing, auth hardening, and bundle splitting will make every later feature cheaper to build and safer to ship.
