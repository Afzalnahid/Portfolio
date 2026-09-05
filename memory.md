# memory.md — project state

> Working memory for this repository. Update at the end of every working session.
> Companion files: `lessons.md` (mistakes not to repeat), `updates.md` (what changed, when).

---

## 1. What this project is

**Noray Afzal Nahid Portfolio** — a single-page marketing site for an AI /
n8n automation consultant, deployed on **Vercel**. No backend, no database,
no login: a static build.

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
- **Stats** are counted from the published workflow files (5 / 152 / 9 / 3).
  Keep them in step if a workflow is added or removed.
- **Toolkit** replaced a set of invented testimonials.

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

## 7. Open items

1. **Revoke the old GitHub token** at <https://github.com/settings/tokens>.
   The remote URL is already clean, but the token itself is still live until
   revoked. Only the owner can do this.
2. **Regenerate the n8n webhook URLs** on the instance that appeared in the old
   workflow exports — they remain readable in git history (`lessons.md` L15).
3. Nothing is committed yet. Review, then commit and push to deploy.
4. Case-study copy is the same for all five solutions and quotes ROI numbers
   that cannot be verified (`lessons.md` L16).
5. Real testimonials, if wanted, need quotes the owner has permission to use.
6. No analytics is installed. Vercel Analytics is the simplest replacement.
7. No tests. `parseN8nToReactFlow()` in `WorkflowViewer.tsx` is the one piece of
   real logic worth covering.

## 8. Unverified — do not state as fact

- Whether the live Vercel deployment matches this working tree. Nothing has been
  pushed yet.
- The live domain. No URL is recorded in this repo, which is why `index.html`
  carries no `canonical` or `og:url`. Add both once the domain is known.
- Whether the Google Calendar iframe in `CaseStudyModal` renders — Google often
  blocks that URL shape. The fallback message and the "open in new tab" link
  both work; the iframe itself was not confirmed.
- Whether the site has been opened on a real phone. Only a 375x812 emulated
  viewport was tested here — real iOS and Android were not.

## 9. Session log

- **2026-09-06 (session 2)** — Improvement pass across security, broken
  behaviour, design and content. Full detail in `updates.md`. Type check and
  build pass; behaviour verified in a browser. Not committed.
- **2026-09-06 (session 1)** — First full read of the repository. Wrote
  `memory.md`, `lessons.md`, `updates.md`. No source file modified.
