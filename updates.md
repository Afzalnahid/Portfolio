# updates.md — change log

> Newest first. One entry per working session or per meaningful change.
> Anything only *planned* belongs in `memory.md` section 7, not here.

---

## 2026-09-07 (session 15) — The real portrait

The owner supplied his own photograph and it replaces the placeholder.

- Source 1086x1448 (3:4). Cropped to **4:5 keeping the top**, so the face stays
  where it is and the crop comes off the bottom, where the name caption sits.
- Output `client/src/nahid-hero.webp`, 900x1125, **51 kB** — sharper than the
  500px square it replaces and a third of the weight.
- The 1.7 MB original is kept outside the repository, in
  `D:\Projects\Portfolio-private\originals\`.
- `nahid2.webp` deleted; nothing referenced it after About lost its photo.

A first attempt chained two sharp `resize` calls and silently produced 3:4 —
sharp keeps only the last resize in a pipeline (`lessons.md` L34). Caught by
reading the ratio back off the written file.

Verified: 900x1125 natural, rendering at 466x583, ratio exactly 0.800.

---
## 2026-09-07 (session 14) — Certificate viewer

The owner opened the experience certificate and its own header was sliced off
the top of the screen.

**Cause.** The panel was a flex column holding a header and then the image
directly. An image will not shrink inside a flex column, so a 2329px document
forced the panel past its `max-h-[94vh]` and pushed the header out of view
(`lessons.md` L33).

- The panel is now header / scrolling body / footer, with `flex-1 min-h-0
  overflow-auto` on the body — the document scrolls in its own row and the
  header and footer stay put.
- A footer bar names the issuer and links "Open full size".
- Certificates re-rendered at 1800px and 2000px wide (from 1400px) so the small
  print holds up when opened: 215 kB and 116 kB, loaded only when the lightbox
  opens.

Verified: panel 729px inside an 800px viewport, header visible, body scrollable,
image 1800x2329 rendering at 814px.

---
## 2026-09-07 (session 13) — The stat captions

The owner sent a crop of "GETVOICIUM, ARCHITECTURE TO DEPLOYMENT" — a sentence
set at 11.5px in uppercase with wide tracking, in the dimmest colour on the
page. Four legibility costs on one line (`lessons.md` L32).

- Stat captions are now 13px, sentence case, no extra tracking, in the body
  colour: **14.7:1**, up from the secondary colour at 11.5px.
- `--color-subtle` raised again, `#A8B8B0` to `#C6D3CC` (12.5:1), so the short
  uppercase labels elsewhere are clearly visible too.
- Confirmed every other `uppercase` use on the site is a one- or two-word label,
  which is what the treatment is for.

---
## 2026-09-07 (session 12) — Body text brought up to the headline

The contrast fix passed WCAG but the owner still found the text dim beside the
headline, and he was right: 10.4:1 next to 17.9:1 still reads as grey
(`lessons.md` L31).

| Role | Was | Now | Contrast |
| --- | --- | --- | --- |
| Headline | `#F2F5F3` | `#F4F7F5` | 17.9:1 |
| Body | `#B2C2BA` | `#DEE7E2` | 15.3:1 |
| Secondary | `#8A9A93` | `#A8B8B0` | 9.3:1 |
| Green labels | `#0E9F6E` | `#4ADE9B` | 11.2:1 |

The deep green stays for button fills, where text sits on top of it; it was only
wrong as type. Nine label usages switched from `text-brand` to
`text-brand-bright`.

Verified with the canvas method: 28 colour/size pairs on the homepage, zero
failures, lowest now 9.3:1 — up from 5.69:1.

---
## 2026-09-07 (session 11) — Fix unreadable body text

The owner sent a screenshot of the resume page: the text was barely visible.

**Cause.** Theme B declared `--color-muted` inside `@theme inline`, a block that
already mapped `--color-muted` to shadcn's near-black `var(--muted)`. The later
declaration won, so every `text-muted` on the site rendered at about **1.5:1**
against the ground (`lessons.md` L29). Renamed to `--color-body` and swept 37
usages.

**My first check was wrong and I reported it as proof.** The contrast script
matched colours with an `rgb()` regex, so every element returning
`oklch(0.25 0.02 280)` was silently skipped — exactly the broken ones. It said
"no failures" while the page was visibly unreadable. The script now resolves any
colour through a 1x1 canvas and reports how many elements it checked
(`lessons.md` L30).

Also fixed, in the same pass:

- `text-muted/40|55|60|70|75|80` and `text-fg/75|80|90` removed — opacity was
  diluting text that had already been given a colour. Genuinely secondary text
  now uses one `text-subtle` token at 6.5:1.
- `font-light` replaced with `font-normal`. Weight 300 was never loaded, so it
  rendered as 400 anyway while reading as washed out.
- Smallest type sizes nudged from 10px / 10.5px to 11px / 11.5px, and the
  `.label` utility from 11px to 11.5px.

**Verified with the corrected method:** 29 distinct colour/size pairs on the
homepage and 11 on the resume, **zero failures**. Lowest is 5.69:1 against a
4.5 requirement; body text is 10.39:1.

---
## 2026-09-06 (session 10) — Rebuild on Theme B, with the certificates

A blueprint was written and approved first: colour B, Autolinium until 10
September, Python left out, certificates shown.

### The certificates changed the content
Autolinium's experience certificate (ref AUT/HR/EXP/2026-015) states that he
joined as an intern and was **confirmed into a full-time position on the
strength of his performance**. The site said "Software Developer Intern" and
nothing more, and had the title, dates, tenure, location and languages wrong
against a document an employer can verify (`lessons.md` L28). All corrected.

### New: Experience & credentials section
A timeline — intern 10 Apr, promoted 11 Jul, specialist to 10 Sep — with a
"Promoted from intern" badge on the middle entry. Both certificates render as
images beside it, opening full size in a lightbox. The PDFs were rasterised to
WebP: 135 kB and 68 kB full, 46 kB and 22 kB as thumbnails.

### New: /resume
The CV as a real page, lazy-loaded (9.9 kB), with a print stylesheet so
**Print → Save as PDF** produces a clean A4 document. Every "Download CV" button
now points here instead of at a PDF that had fallen out of date. It is the
single source of truth for the CV.

### Theme B
`#07100E` ground, `#0F1A17` surface, `#0E9F6E` brand, `#4ADE9B` bright,
`#93A69E` muted, `#F2F5F3` foreground — registered as Tailwind colours in
`@theme` and swept across every component. No raw `slate-*` or `blue-*` class
remains outside `components/ui/`.

### Structure
Order is now Hero → Stats → Work → Credentials → About → Toolkit → Contact.
Evidence moved above the biography; About shortened to two paragraphs plus
education and languages, with its experience block absorbed into Credentials so
the two cannot disagree.

### One audience
The page leads to an employer. A single quiet line in Contact — "Also available
for contract and project work" — keeps the freelance door open without the site
sounding undecided.

Main chunk 494.73 kB (157.11 kB gzipped), resume split into its own 9.9 kB
chunk. Type check and build pass.

---
## 2026-09-06 (session 9) — Lights-on hero

The owner asked for a 3D sequence: a person walks into a dark room, switches on
the light, sits down, and the portfolio is revealed. He also asked for his
photograph to be regenerated as a photorealistic person.

Image generation, video and rigged 3D characters cannot be produced here
(`lessons.md` L27). What could be built is the part of that idea that is code —
the room lighting up — using the photograph already in the repository.

- The backdrop sits at 1.5% opacity until the light comes on, then 12%.
- A warm lamp bloom scales and fades in from the top right.
- The portrait animates from `brightness(0.22) saturate(0.25)` to full, with a
  soft-light gradient falling across it from the lamp's side.
- The name caption comes up last.
- It starts 550ms after load and runs ~2s. **The headline, buttons and links are
  never dimmed** — nothing a recruiter needs waits on the animation.
- Under `prefers-reduced-motion` the lit state renders immediately.

Zero added bytes: the whole effect is animated CSS properties on elements that
were already there. The walking and sitting still need footage the owner films.

---
## 2026-09-06 (session 8) — Portrait hero, 3D removed

The owner saw the 3D constellation live and did not want it. What he wants in
that space is a photograph of himself, which he is sending.

- `HeroScene.tsx` deleted. Nothing else depended on it.
- The hero right column is now a portrait panel: a 4:5 frame with a soft light
  source behind it, a scrim so it sits inside the section rather than on top of
  it, and his name and location set into the bottom of the frame.
- The workplace photograph stays as a faint backdrop.
- **The portrait is a placeholder** — it reuses the old About photo until the
  new photograph arrives. Swapping it is a one-line import change.
- About no longer shows the same photo twice; its text now runs at full measure.

Page height 6,389px to 6,281px, JS 157 kB to 156 kB gzipped.

---
## 2026-09-06 (session 7) — Option B redesign

A design audit was written first (measurements taken from the deployed build),
then the owner picked Option B: fix the structure, and add one piece of 3D
rather than several.

### Removed
- **The n8n map viewer.** It imitated n8n's interface — breadcrumb, "+ Add tag",
  a "0 / 4" counter, an "Active" badge, "Live Execution Log", a sidebar and a
  zoom toolbar — and none of those controls did anything (`lessons.md` L22). The
  owner chose to drop it rather than rebuild it. `@xyflow/react` and the five
  public workflow JSON files went with it.
- **"How I Work."** A five-step consulting pitch on a page aimed at recruiters.
- **The Autologic chat widget**, which on mobile sat where the CV button belongs.
- **The page-wide particle background**, replaced by one animation in the hero.

### Typography
Archivo for headings, IBM Plex Sans for reading, IBM Plex Mono for labels and
data. `font-black` was in use everywhere while only weights 500-800 are loaded,
so it never rendered as written — swept to `font-extrabold`. Uppercase cut from
**214 elements to 48**.

### The 3D hero
`HeroScene.tsx` draws a rotating constellation of connected nodes with a
hand-written 3D pipeline — rotation, perspective divide, depth fade, painter's
ordering, pointer parallax — on a 2D canvas. It uses **no 3D library**: three.js
would have added ~155 kB gzipped to a site that ships 157 kB in total, and
nothing here needs materials, lighting or model loading (`lessons.md` L23). It
pauses off screen and when the tab is hidden, and renders one still frame under
`prefers-reduced-motion`.

### Structure
getvoicium now leads as a featured block with its own panel; ezpzbd, Champion
and Nandi follow as three cards; the five automations sit below as a quiet row
list. Previously all nine had identical weight.

### Universal booking
`lib/booking.ts` holds the URL, email, WhatsApp number and label. A
`BookingProvider` renders one dialog, and any button anywhere calls
`openBooking(subject?)`. Opening it from a case study passes the project name
through to the dialog header and prefills the email and WhatsApp messages. The
three direct routes are always visible beneath the embed, so a blocked iframe is
no longer a dead end.

### Measured before and after

| | Before | After |
| --- | --- | --- |
| Page height | 11,052 px | **6,389 px** |
| Uppercase elements | 214 of 777 | **48 of 533** |
| Typefaces | 1 | **3, by role** |
| Weight-900 elements (not loaded) | many | **0** |
| `client/dist` | 1.10 MB | **0.87 MB** |
| JS gzipped | 157 kB | **157 kB** |
| Booking definitions | 4 | **1** |

Verified: type check and build pass; booking opens from the hero, contact and
any case study, carries the subject through, and keeps its direct routes; no
console errors; no horizontal overflow at 375px; the hero canvas renders on
mobile at 240px.

---
## 2026-09-06 (session 6) — Label the private client systems

Champion Sales SaaS and Nandi Real Estate ERP are custom software for their
clients, reachable only with those clients' credentials. Their cards previously
just had no link, which to a recruiter reads as an oversight rather than a
constraint.

- Both cards now carry a "Private" badge next to the title; getvoicium and
  ezpzbd keep their "Live" links.
- Their case studies say plainly that the system is the client's own and sits
  behind a login, with an offer to walk through it in a call.
- The case-study modal now shows either a "Visit <project>" link or the private
  note, so the question is answered wherever the reader is.
- The modal's action was "Book a similar setup" and its booking header said
  "Schedule a consultation" — client-sales language left over from before the
  site was aimed at recruiters. Now "Talk about this work" and "Book a call".

Verified: type check and build pass; the four application cards report
LIVE / LIVE / PRIVATE / PRIVATE, and the Champion modal carries the login note.

---
## 2026-09-06 (session 5) — Rebuilt again from the updated CV

The owner supplied a newer, complete CV that describes a noticeably different
candidate from the one used in session 4 (see `lessons.md` L19). The site now
follows the newer document throughout, and is aimed at recruiters rather than
consulting clients — the CV says he is seeking a full-time or contract remote
role.

**Positioning.** Full-Stack Developer / AI Automation Expert (n8n), not AI
Solutions Engineer. Hero, page title, meta description and footer follow.

**Download CV is now the primary action** — in the navbar, the hero, the mobile
menu and the contact section. The PDF is served from
`client/public/Noray-Afzal-Nahid-CV.pdf`.

**Showcase is nine cards in two groups.** Four applications from the CV —
getvoicium (getvoicium.com), ezpzbd (ezpzbd.com), Champion Sales SaaS and Nandi
Real Estate ERP, with live links where a public URL exists — then the five n8n
workflows, which keep their node maps.

**Workflow copy rewritten from the graphs themselves.** Every node type in the
five files was listed first, and claims the graphs do not support were dropped:
no Whisper on the e-commerce bot, no GoHighLevel on the agency bot, no image
generation on the auto-poster. Details in `lessons.md` L20.

**Stats replaced.** The 10k+ / 500+ / 50+ / 99.9% figures are not in the current
CV, so the site no longer states them. They are now 1 solo SaaS, 4 production
applications, 5 published workflows and 4 messaging channels, under the CV's own
heading of "built in under a year". **These were the owner's numbers and are his
to restore if he wants them.**

**Skills cut back** from nine groups to the CV's two, Full-Stack/Web and
AI/Automation. Claude, Groq, Whisper, Veo, Sora, HeyGen, Make.com, GoHighLevel,
SSLCommerz and others came from the older CV and are gone.

**About rewritten.** Full-Stack Developer, self-employed since Aug 2026, and
Software Developer Intern at Autolinium from Mar to Aug 2026 — a past role,
remote, not the current Chittagong-based one the site was showing. Education is
B.Pharm only. Languages were kept although the new CV omits them, since the site
targets remote work.

**Contact rebuilt** around hiring: Download CV and Book a call, "open to remote,
worldwide", and email / WhatsApp / LinkedIn / GitHub. The stale "Software
Technology Park, Agrabad" workplace was removed.

Verified: type check and build pass; the CV downloads as `application/pdf`; nine
cards render with live links on the two that have public URLs and Map buttons on
the five workflows; a workflow map opens with 38 nodes and closes on Escape; the
mobile menu carries Download CV; no console errors; no horizontal overflow at
375px.

---
## 2026-09-06 (session 4) — Rebuilt the content from the owner's CV

The owner supplied his resume, which carries far more, and far better, material
than the site was showing. Everything below comes from that document.

**Positioning.** The site sold him as an "AI Automation Expert & n8n
Specialist". His CV says AI Solutions Engineer, Product Builder, Automation
Architect — someone who ships products from schema and API design through
retrieval pipelines to the interface. Hero headline, role line, page title,
meta description and footer all follow the CV now.

**Stats restored.** Session 2 replaced "10k+ / 500+ / 50+ / 99.9%" with figures
counted from the repository, on the assumption they were template placeholders.
They are not — all four are the owner's own numbers under IMPACT on his CV.
Restored verbatim. Recorded as `lessons.md` L17 so it is not repeated.

**Showcase rebuilt, six projects instead of five.** Added the Multi-Tenant AI
Chatbot Platform, his largest piece of work and previously absent from the
site. Each card now carries the CV's own description plus its stack line. Cards
without an n8n graph simply do not render a "Map" button.

**Case studies are per project.** All five previously shared one block of text
and one ROI claim. Each project now has its own problem / what-I-built / result,
written from the CV, plus its feature list and stack.

**About rewritten.** The CV's profile paragraph, then real experience: AI
Automation Intern at Autolinium Ltd (Apr 2026 – present) and Independent AI
Solutions Engineer. At the owner's instruction the "CEO & Lead Technical
Consultant, AutoLogic Systems" line was dropped, since the CV does not carry it.

**Toolkit is now the CV's skills matrix** — nine groups from AI Engineering and
RAG through Messaging Platforms to DevOps, each with a sentence of context.

**GitHub added** to the hero icons, the contact grid and the footer. The CV
lists it; the site did not.

Verified: type check and build pass; six cards render with the SaaS card
correctly showing no Map button; all five workflow maps open with the right
node counts (38 / 31 / 34 / 21 / 28); case-study modal shows per-project text;
no console errors; no horizontal overflow at 375px.

---
## 2026-09-06 (session 3) — Deployed, verified live, SEO tags added

The three commits from session 2 were pushed to `main` and Vercel deployed
them. Verified against **https://nahid-afzal-portfolio.vercel.app/**: the live
bundle hash matches the local build, there are no console errors, the mobile
menu works at 375x812 with no horizontal overflow, the workflow map opens with
31 nodes, and `/workflows/*.json` now serves only node name, type, position and
connections — no webhook ids, hosts, emails or credentials.

With the real domain finally known, added to `client/index.html`:

- `<link rel="canonical">` and `og:url`
- absolute URLs for `og:image` and `twitter:image` — social crawlers do not
  resolve relative image paths, so the previews would still have been blank
- `og:image:width` / `height` / `alt`

Also added `client/public/robots.txt` and `client/public/sitemap.xml`. The
`*.txt` ignore rule from session 2 carries a `!client/public/*.txt` exception so
`robots.txt` is still tracked.

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
















