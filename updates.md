# updates.md — change log

> Newest first. One entry per working session or per meaningful change.
> Anything only *planned* belongs in `memory.md` section 7, not here.

---

## 2026-09-06 (session 2) — Improvement pass

Not committed yet. `tsc --noEmit` and `vite build` both pass, and the behaviour
below was checked in a browser at desktop and 375x812.

### Security

- Removed the GitHub personal access token from the `origin` remote URL.
  **The token itself still has to be revoked by the owner** — that cannot be
  done from here.
- Moved `MY APIS FOR OPENCLAW AND N8N.txt`, `Queries.txt`, `champion_code.txt`
  and `key products.txt` out of the repo to `D:\Projects\Portfolio-private`.
- `.gitignore` now excludes `*.txt` and `/Workflow jsons/`.
- Rebuilt the five workflow files served from `client/public/workflows/` so they
  contain only what the viewer draws — node name, type, position and the
  connection graph. Gone: prompts, credential blocks, `webhookId`, `instanceId`,
  a client contact address and a client's n8n cloud host. 259 kB to 50 kB.
  Older commits still hold the originals — see `lessons.md` L15.
- Moved the duplicate root `Workflow jsons/` folder out of the repo.

### Fixed what was broken

- **Mobile navigation now exists.** The hamburger was three decorative `<div>`s
  with no handler, so phones had no navigation at all. It is now a real button
  with a full-screen menu, Escape to close, background scroll lock and
  `aria-expanded`. Nav gained a "Process" link.
- **Deleted the simulated AI chat** (`AiChat.tsx`). It answered from a
  four-keyword `if`-chain while the header claimed "Online". The real Autologic
  widget in `index.html` is now the only chat.
- **Fixed the UGC workflow path** (missing leading slash) and made a failed
  fetch show a visible message instead of a silent `console.error`.
- **Fixed the workflow map opening off-centre** — `fitView` ran against an empty
  graph. The canvas now mounts only once nodes exist. Escape closes the viewer.
- **Restored pinch-zoom** — the viewport meta carried `maximum-scale=1`.
- **Fixed the social share image.** `og:image` pointed at `/nahid2.png`, which
  does not exist in `public/`, so shared links had no preview. Generated
  `og-cover.jpg` (1200x630) and a favicon.
- **Removed the broken analytics tag** — it shipped literal
  `%VITE_ANALYTICS_ENDPOINT%` placeholders and counted nobody.
- **Error screen no longer shows visitors a raw stack trace**; it is DEV-only,
  with a plain message and a contact address in production.
- **`NetworkBackground` rewritten** — it never cancelled its animation frame on
  unmount, re-seeded on every mobile address-bar resize, and ignored device
  pixel ratio. It now cleans up, debounces resize, renders sharp on retina and
  holds still under `prefers-reduced-motion`.
- **`CaseStudyModal`** gained Escape-to-close, scroll lock and a header that
  fits a phone. The "Story" button now has its own handler instead of relying
  on the click bubbling to the card.

### Weight

| | Before | After |
| --- | --- | --- |
| main JS chunk | 1,379.96 kB (431.26 kB gzip) | 480.46 kB (153.40 kB gzip) |
| `client/dist` | 15.3 MB, 400+ files | 1.10 MB, 16 files |
| hero image | 735 kB JPEG | 100 kB WebP |
| portrait | 195 kB PNG | 14 kB WebP |
| build time | ~35 s | ~11 s |
| chunk-size warning | yes | none |

Achieved by lazy-loading `WorkflowViewer` and `CaseStudyModal`, converting the
images, and deleting `streamdown` — which was pulling mermaid, shiki and katex
into the bundle purely for the fake chat bubble.

### Content

- **Replaced the placeholder stats.** "10k+ tasks", "500+ hours" and
  "99.9% AI accuracy" could not be backed up. They are now counted from the
  published workflow files: 5 production workflows, 152 automation steps,
  9 platforms connected, 3 AI providers. **If you have real figures from your
  own records, they are better — send them and I will put them back.**
- **Removed the invented testimonials** (James Wilson, Sarah Chen, Marcus
  Thorne). A prospective client cannot contact a person who does not exist.
  A new **Toolkit** section took the slot, listing only tools that genuinely
  appear in the published workflows. Real quotes can replace it any time.
- Hero gained a one-line explanation of what you do and a second button to the
  workflows; the dead "Search" social icon was replaced with WhatsApp, and all
  four icons got accessible labels.
- Contact gained a "Book a free consultation" button — the booking link was
  previously buried two clicks deep inside a case-study modal.
- Footer links now go to email and LinkedIn instead of two dead `#` links, and
  the year is no longer hard-coded to 2026.

### Housekeeping

- Deleted: `Projects.tsx`, `Services.tsx`, `MapSection.tsx`, `Map.tsx`,
  `const.ts`, the `@shared/const` declaration, and five unused hero images.
- Removed from `package.json`: `streamdown`, `express`, `axios`, `add`,
  `@types/express`, `@types/google.maps`, `pnpm`.
- Added a `test` script, `.claude/launch.json`, and a skip-to-content link.

---
## 2026-09-06 (session 1) — Full project review (no code changed)

Read the whole repository, ran a type check and a production build, and wrote
`memory.md`, `lessons.md` and `updates.md`. **No source file was modified.**

Verified at the time:

| Check | Result |
| --- | --- |
| `tsc --noEmit` | passes |
| `vite build` | succeeds, ~35 s |
| `client/dist` total | 15.3 MB |
| largest JS chunk | 1.38 MB (431 kB gzipped) |
| `Workflow jsons/` vs `client/public/workflows/` | all 5 byte-identical |
| secrets inside the public workflow JSONs | none (n8n stores credential names, not values) |

Fourteen problems were catalogued in `lessons.md`; session 2 acted on twelve of
them.

---
## Commit history so far

### 2026-08-01
- `04cd2f7` Update index.html — added the Autologic chatbot widget script and
  the umami analytics tag. **The analytics tag still ships unreplaced
  `%VITE_*%` placeholders** (see `lessons.md` L5).

### 2026-05-06 — workflow viewer polish and booking link
- `7f63714` Google Calendar link updated to the final appointment URL
- `6612aa9` Google Calendar link corrected
- `a811692` Google Calendar booking link added to `CaseStudyModal`
- `1c06ae0` Hero overlay opacity adjusted
- `b338e26` Hero overlay darkened on the left for text readability
- `b3c7761` Back button reverted to the n8n-style design
- `b826dcb` Workflow viewer z-index fixed by rendering through a React Portal
- `8d43c7f` Back button visibility improved in `WorkflowViewer`
- `8dba433` Workflow fetch 404 paths fixed; back button added to the map viewer
  *(one path was missed — see `lessons.md` L9)*
- `aa59f33` Hero, About and workflow sections updated

### 2026-05-05 — hero and content
- `43f2f8f` Hero background zoom / hover visibility
- `64804e4` Photo frame removed from the hero
- `a9ec68f` Hero background replaced with the reference image, zoom-on-face effect
- `c954478` Syntax error fixed in About (duplicate code at end of file)
- `1dbb36b` AutoLogic Systems and Autolinium links added
- `19ff12f` Large upgrade: interactive n8n workflow viewer, Stats, Process
  roadmap, Client Stories, network background — commit message notes
  "secrets redacted"

### 2026-05-04 — first build-out and deployment fixes
- `88d7c56` AiChat responses and Languages section polished
- `074ca7f` Professional details, education and projects added
- `85d49c4` **Client login, dashboard and related components removed** —
  this is where `src/const.ts`, `express` and `axios` were orphaned
  (`lessons.md` L4, L14)
- `f57fc7f` Components, layout and configuration updated
- `2209c7d` `nahid2.png` added
- `9f76655` Hero image frame changed to a LinkedIn-style frame
- `46b49a8` Hero section redesigned to match the reference layout
- `34f06d4` Hero background added; name changed to Afzal Nahid
- `5f31d41` Brand name set to Afzal Nahid
- `ff4212e` Tailwind Vite plugin enabled
- `9551496` Small hero text change to trigger a redeploy
- `c6b0bb8` Vite build configured for the client app and Vercel output
- `5625364` Invalid npm `overrides` block removed
- `70f8fdb` npm `overrides` syntax fixed for nanoid
- `cb546f6` Vercel install fixed by removing a missing pnpm patch reference
- `7477a08` Static build replaced with the real source project
- `a633b17` Initial portfolio deploy


