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
| Flow diagram | `@xyflow/react`, lazy-loaded |
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
- **Stats** are the owner's own CV figures (10k+ / 500+ / 50+ / 99.9%). They
  live only in `Stats.tsx`. Do not rewrite them — see `lessons.md` L17.
- **Toolkit** is the CV's technical-skills matrix, nine groups.
- Content source of truth is the owner's CV (`Noray_Afzal_Nahid_Resume_1.pdf`,
  supplied 2026-09-06, not stored in the repo).

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
2. **Regenerate the n8n webhook URLs** on the instance that appeared in the old
   workflow exports — they remain readable in git history (`lessons.md` L15).
3. ~~Commit, push and confirm the deploy.~~ Done 2026-09-06 and verified on
   the live site (see section 6b).
4. Real testimonials, if wanted, need quotes the owner has permission to use.
5. The Multi-Tenant SaaS card has no live link. Add one if the platform has a
   public URL the owner is happy to publish.
6. The CV itself still says "20XX – Present" for the freelance role
   (`lessons.md` L18) — the owner should fix the PDF.
7. No analytics is installed. Vercel Analytics is the simplest replacement.
8. No tests. `parseN8nToReactFlow()` in `WorkflowViewer.tsx` is the one piece of
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
