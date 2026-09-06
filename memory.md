# memory.md — project state

> Working memory for this repository. Update at the end of every working session.
> Companion files: `lessons.md` (mistakes not to repeat), `updates.md` (what changed, when).

---

## 1. What this project is

**Noray Afzal Nahid Portfolio** — a single-page marketing site for an AI /
n8n automation consultant, deployed on **Vercel**. No backend, no database,
no login: a static build.

- Live: **https://nahid-afzal-portfolio.vercel.app/** (Vercel, deploys on push to `main`)
- Repo: `https://github.com/Afzalnahid/Portfolio` (branch `main`)
- Local path: `D:\Projects\Portfolio`
- Private scratch + original workflow exports: `D:\Projects\Portfolio-private`
  (deliberately outside the repo — see `lessons.md` L2)

## 2. Stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 7 (`root: "client"`) |
| Styling | Tailwind CSS 4, OKLCH tokens in `client/src/index.css` |
| UI primitives | Radix UI / shadcn-style in `client/src/components/ui/` |
| Animation | Framer Motion |
| Routing | wouter (`/` and a 404 fallback) |
| Hero | portrait panel with a lights-on reveal |
| Palette | **Theme B** — deep pine `#07100E` / signal green `#0E9F6E` `#4ADE9B` |
| Deploy | Vercel, `outputDirectory: client/dist` |

## 3. Layout of the code

```
client/
  index.html            SEO + OG meta, favicon, Roboto, Autologic chat widget
  public/
    workflows/*.json    5 SANITISED n8n graphs (name/type/position + connections)
    og-cover.jpg        social share image
    favicon.png
  src/
    main.tsx / App.tsx  ErrorBoundary > ThemeProvider(dark) > Tooltip > Router
    pages/Home.tsx      Navbar, Hero, Stats, About, Showcase, Process, Toolkit, Contact
    components/
      sections/         one file per section
      WorkflowViewer.tsx  full-screen n8n-style canvas (lazy)
      CaseStudyModal.tsx  case study + Google Calendar booking (lazy)
      NetworkBackground.tsx  particle canvas, respects prefers-reduced-motion
      ErrorBoundary.tsx      stack trace only in DEV
      ui/                    shadcn primitives (most unused, tree-shaken)
```

## 4. How the site behaves

- One page. Nav anchors: `#about`, `#solutions`, `#process`, `#contact`.
- **Showcase** — 5 hard-coded solutions. Clicking a card or "Story" opens
  `CaseStudyModal`; "Map" fetches `/workflows/<file>.json` and opens
  `WorkflowViewer`. A failed fetch shows a visible message.
- **Chat** — the only chat is the real Autologic widget loaded in
  `index.html`. The simulated `AiChat` component was deleted 2026-09-06.
- **Colour**: use the semantic classes only — `bg-ground`, `bg-ground-2`,
  `bg-surface`, `text-fg`, `text-body`, `text-subtle`, `bg-brand`,
  `text-brand-bright`. Values: fg `#F4F7F5`, body `#DEE7E2`, subtle `#C6D3CC`.
  Uppercase + `tracking-widest` is for **short labels only** — never a sentence.
  Body text sits close to the headline on purpose — the owner rejected the
  earlier, dimmer values twice. `text-brand` (`#0E9F6E`) is for fills only;
  green **type** uses `text-brand-bright`. **Never add a token named after a
  shadcn one**
  (`muted`, `accent`, `primary`, `card`, `border`, `ring`…) — the later
  declaration wins silently and your colour disappears (`lessons.md` L29).
  They are declared in `index.css` under `@theme`. No raw slate/blue classes.
- **Autolinium dates and titles come from the certificates** in
  `client/public/certificates/`. Intern 10 Apr – 10 Jul 2026, then AI Automation
  Specialist 11 Jul – 10 Sep 2026. Change `Credentials.tsx` and `Resume.tsx`
  together or they drift.
- **Python is deliberately out** — it is on the experience certificate but the
  owner chose not to claim it.
- **Typography**: Archivo (display) / IBM Plex Sans (body) / IBM Plex Mono
  (labels via the `.label` utility). Never use `font-black` — weight 900 is not
  loaded and silently falls back.
- **Booking**: every entry point calls `useBooking().openBooking()`. Never
  hard-code the calendar URL in a component again.
- **Hero** has a lights-on reveal: the room, the lamp glow, the portrait and
  the caption come up together 550ms after load over ~2s. Text is never hidden
  by it. Skipped under `prefers-reduced-motion`. The owner rejected an earlier
  abstract 3D animation (`lessons.md` L25) and wants footage of himself here
  eventually (`lessons.md` L27).
- **Stats** are counted from the CV and the work on the page (1 / 4 / 5 / 4).
  The earlier CV's 10k+ / 500+ / 50+ / 99.9% figures are NOT in the current CV,
  so the site no longer states them — see `lessons.md` L17 before touching this.
- **Toolkit** is the CV's two skill groups, Full-Stack/Web and AI/Automation.
- **Showcase** leads with getvoicium as a featured block, then three
  applications as cards, then five n8n automations as a quiet row list.
  The interactive n8n map viewer was removed on the owner's instruction.
- Content source of truth is `Noray_Afzal_Nahid_Resumeupdated.pdf` (supplied
  2026-09-06). A copy is served at `client/public/Noray-Afzal-Nahid-CV.pdf`.
- The site is aimed at **recruiters**: the primary call to action everywhere is
  Download CV, and the owner is open to remote work worldwide.

## 5. Commands

```bash
npm install
npm run dev       # vite --host
npm run build     # -> client/dist
npm run preview
npm run check     # tsc --noEmit
npm test          # vitest run --passWithNoTests (no tests yet)
```

If `npx` or `npm run` misbehaves on this machine, call the binary directly:
`node ./node_modules/typescript/bin/tsc --noEmit`,
`node ./node_modules/vite/bin/vite.js build`. A random `0xC0000005` /
segfault on this machine is a known flake — just re-run.

## 6. Verified on 2026-09-06 (after the improvement pass)

| Check | Result |
| --- | --- |
| `tsc --noEmit` | passes, zero errors |
| `vite build` | succeeds, ~11 s, no chunk-size warning |
| main JS chunk | 480 kB (153 kB gzip) — was 1.38 MB (431 kB) |
| `client/dist` total | 1.10 MB in 16 files — was 15.3 MB in 400+ |
| hero image | 100 kB WebP — was 735 kB JPEG |
| browser, desktop | renders, no console errors |
| browser, 375x812 | mobile menu opens, locks scroll, 5 links, `aria-expanded` flips |
| workflow map | opens lazily, 31 nodes / 32 edges, fits the canvas, Escape closes |
| case study modal | opens lazily, closes on Escape |
| public workflow JSONs | no emails, hosts, webhook ids, credentials or instance ids |

## 6b. Verified on the live site, 2026-09-06

Checked against **https://nahid-afzal-portfolio.vercel.app/** after the deploy.

| Check | Result |
| --- | --- |
| deployed bundle | `index-Dut6MGBr.js` — the same hash as the local build |
| console errors | none |
| `/og-cover.jpg`, `/favicon.png` | 200, correct content types |
| `/workflows/*.json` | 200, keys are `name`/`nodes`/`connections` only; each node carries `name`/`type`/`position` only; no webhook ids, hosts, emails or credentials |
| mobile menu at 375x812 | opens, 5 links, locks scroll, closes, releases scroll |
| horizontal overflow at 375px | none |
| workflow map on mobile | opens, 31 nodes / 32 edges, n8n chrome correctly hidden |
| simulated AI chat | gone |

## 7. Open items

1. **Revoke the old GitHub token** at <https://github.com/settings/tokens>.
   The remote URL is already clean, but the token itself is still live until
   revoked. Only the owner can do this.
2. ~~Regenerate the n8n webhook URLs.~~ Closed 2026-09-06: the owner no longer
   has access to that n8n instance, so there is nothing to rotate. The old
   exports stay in git history as a record only (`lessons.md` L15).
3. ~~Commit, push and confirm the deploy.~~ Done 2026-09-06 and verified on
   the live site (see section 6b).
4. Real testimonials, if wanted, need quotes the owner has permission to use.
5. ~~The hero portrait is a placeholder.~~ Done 2026-09-07: the owner's own
   photograph is in as `client/src/nahid-hero.webp`, 900x1125. The original
   1086x1448 PNG is kept outside the repo at
   `D:\Projects\Portfolio-private\originals\`. To replace it later, crop to
   **4:5 in a single sharp `resize`** — chaining two resizes silently discards
   the first (`lessons.md` L34).
6. Champion and Nandi ERP are the clients' own systems, reachable only with
   their credentials. Those cards are labelled "Private" on purpose — there is
   nothing to link and nothing to demo publicly. Do not add a URL for them.
7. The Nandi ERP case study says "in development"; update it once the system
   is live.
8. No analytics is installed. Vercel Analytics is the simplest replacement.
9. No tests. `parseN8nToReactFlow()` in `WorkflowViewer.tsx` is the one piece of
   real logic worth covering.

## 8. Unverified — do not state as fact

- Whether the site has been opened on a real phone. The live check used a
  375x812 emulated viewport, not real iOS or Android hardware.
- Whether the Google Calendar iframe in `CaseStudyModal` renders — Google often
  blocks that URL shape. The fallback message and the "open in new tab" link
  both work; the iframe itself was not confirmed.

## 9. Session log

- **2026-09-06 (session 2)** — Improvement pass across security, broken
  behaviour, design and content. Full detail in `updates.md`. Type check and
  build pass; behaviour verified in a browser. Committed in three parts and
  pushed to `main`; `package-lock.json` refreshed to match `package.json`.
- **2026-09-06 (session 1)** — First full read of the repository. Wrote
  `memory.md`, `lessons.md`, `updates.md`. No source file modified.
