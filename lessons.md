# lessons.md — mistakes already in this repo

> Every entry is something that is **actually true of this codebase right now**,
> found by reading the files on 2026-09-06 — not general advice.
> Add a new entry whenever something goes wrong. Never delete an entry; mark it
> `FIXED` with the date and the commit instead.

---

## L1 — A GitHub personal access token is stored in the git remote
**Severity: critical. Status: OPEN.**

`git remote -v` prints:

```
origin  https://ghp_XXXXXXXX@github.com/Afzalnahid/Portfolio.git
```

The token lives in `.git/config` in clear text. Anyone with the folder, a backup,
a screen-share or a shipped ZIP has push access to the account's repos.

**What to do**

1. Revoke that token at <https://github.com/settings/tokens> — revoke first,
   fix the config after. A revoked token is harmless; a rotated-but-live one is not.
2. Replace the remote with a clean URL:
   ```bash
   git remote set-url origin https://github.com/Afzalnahid/Portfolio.git
   ```
3. Authenticate with Git Credential Manager or SSH instead of an inline token.

**Lesson:** never paste a token into a URL. It survives in `.git/config`, in
shell history, and in every clone made from that folder.

---

## L2 — A file full of API keys sits in the repo root, unignored
**Severity: critical. Status: FIXED 2026-09-06** — files moved to `D:\Projects\Portfolio-private`, `*.txt` now ignored. The key itself still needs rotating if it was ever pushed.

`MY APIS FOR OPENCLAW AND N8N.txt` is untracked but **not listed in
`.gitignore`**. A single `git add .` publishes it, and this repository is public.
`Queries.txt`, `champion_code.txt` and `key products.txt` are in the same
position (they scan clean today, but nothing stops keys landing in them tomorrow).

**What to do**

- Move the file out of the repo folder entirely — a secrets file has no reason
  to live next to code.
- Meanwhile add to `.gitignore`:
  ```
  # local scratch notes — never commit
  *.txt
  !README.txt
  ```
- If a key ever *did* get pushed, rotating the key is the fix. Deleting the file
  in a later commit does not remove it from history.

**Lesson:** `.gitignore` protects you only for files you thought of in advance.
Keep secrets outside the working tree, not merely ignored inside it.

---

## L3 — The AI assistant is fake, and the bundle says so
**Severity: reputational. Status: FIXED 2026-09-06** — `AiChat.tsx` deleted; the real Autologic widget in `index.html` is now the only chat.

`client/src/components/AiChat.tsx` sends nothing anywhere. It runs
`if (lowerInput.includes("n8n")) { ... }` over four keywords and fakes a typing
animation with `setTimeout`. The header still says "Online" with a pulsing dot.

On a portfolio whose entire pitch is *"I build real AI chatbots"*, a visitor who
opens DevTools sees a keyword `if`-chain. That is a worse first impression than
having no chat widget at all.

**Options, in order of effort**

1. Delete `AiChat` — `client/index.html` already loads the real Autologic widget,
   so the page keeps a working chat.
2. Point `handleSend()` at a real endpoint.
3. Keep it, but relabel the header ("Quick answers", not "Nahid's AI Assistant /
   Online") so nothing is claimed that is not delivered.

**Lesson:** a demo that pretends to be the product is a liability on the very
page that sells the product.

---

## L4 — `src/const.ts` imports a module that does not exist
**Severity: latent build breaker. Status: FIXED 2026-09-06** — `src/const.ts` and the `@shared/const` declaration are gone.

```ts
// client/src/const.ts
export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
```

There is **no `shared/` directory** in this repo. It survives only because:

- `client/src/vite-env.d.ts` hand-declares `declare module "@shared/const"`, so
  TypeScript is satisfied and `npm run check` passes; and
- nothing imports `const.ts`, so Vite never tries to resolve it.

The moment any component writes `import { COOKIE_NAME } from "@/const"`, the
**build fails** — and `vite.config.ts` has no `@shared` alias, so it will keep
failing until someone works out why.

**What to do:** delete `client/src/const.ts` and the `@shared/const` block in
`vite-env.d.ts`. Leftovers from the deleted client-login feature (commit
`85d49c4`).

**Lesson:** a hand-written `declare module` hides a missing file from the type
checker. It buys a green check and a red build later.

---

## L5 — Analytics tags are unreplaced placeholders
**Severity: silent failure. Status: FIXED 2026-09-06** — the broken umami tag was removed. Re-add it properly if analytics is wanted.

`client/index.html`:

```html
<script defer src="%VITE_ANALYTICS_ENDPOINT%/umami"
        data-website-id="%VITE_ANALYTICS_WEBSITE_ID%"></script>
```

Vite substitutes `%VITE_*%` only when the variable is defined. No `.env` file
defines either one, so the literal text ships and the browser requests a URL
called `%VITE_ANALYTICS_ENDPOINT%/umami`, which 404s. **No visitor is being
counted, and nothing warns you.**

**What to do:** define both in Vercel's environment variables, or delete the tag.

**Lesson:** an analytics script that fails silently looks exactly like an
analytics script that works. Verify by opening the Network tab once.

---

## L6 — Duplicated workflow JSONs, two copies of the same 265 kB
**Severity: maintenance. Status: FIXED 2026-09-06** — the root `Workflow jsons/` folder moved to `D:\Projects\Portfolio-private`.

`Workflow jsons/` (repo root) and `client/public/workflows/` hold the same five
files — verified byte-identical by hash. Only the `client/public/` copy is
served; the root copy is dead weight that will silently drift out of date the
first time one is edited.

**What to do:** delete the root `Workflow jsons/` folder. `client/public/` is
the served copy and therefore the source of truth.

**Lesson:** two copies of a file are not a backup. They are a future bug about
which copy was the real one.

---

## L7 — Public workflow JSONs expose internal identifiers
**Severity: low. Status: FIXED 2026-09-06** — the served JSONs are rebuilt to node name/type/position plus connections only (259 kB -> 50 kB). Older commits still hold the originals.

The five files under `client/public/workflows/` are downloadable by anyone. They
contain **no raw API keys** (n8n exports credential *names*, not values), which
is good. They do expose:

- an n8n cloud host name (a client's n8n cloud host),
- two e-mail addresses (`nahidafzal97@gmail.com`, a client contact address),
- webhook IDs and internal node/credential IDs,
- the full architecture of five client automations.

Showing off the workflow maps is the whole point of the Showcase section, so
this may be intended. But a webhook ID plus a host name narrows an attacker's
search considerably, and a client's e-mail was probably not meant to ship.

**What to do:** publish a sanitised copy — strip `webhookId`, credential ids and
e-mail addresses — and keep the originals out of `public/`.

**Lesson:** anything in `public/` is published. Read a file as an outsider before
putting it there.

---

## L8 — Dead code from three abandoned features is still shipped
**Severity: low. Status: FIXED 2026-09-06** — all listed dead files deleted, plus `express`, `axios`, `@types/express`, `@types/google.maps`, `add` and `pnpm` removed from `package.json`.

Never imported by anything reachable from `Home.tsx`:

- `client/src/components/sections/Projects.tsx`
- `client/src/components/sections/Services.tsx`
- `client/src/components/sections/MapSection.tsx`
- `client/src/components/Map.tsx` (only `MapSection` used it)
- `client/src/const.ts` (see L4)
- four unused hero images inside `client/src/`: `Hero reference image.png`
  (1.6 MB), `Hero.jpeg`, `HeroDesign.jpg`, `HeroReference.jpeg`
- root-level image duplicates: `Hero Ref.jpeg`, `Hero reference.jpeg`,
  `ref image hero.jpg`
- most of `client/src/components/ui/` (~50 shadcn files, a handful are used)

Tree-shaking keeps the unused *code* out of the bundle, so this costs nothing at
runtime — but `Map.tsx` still reads `VITE_FRONTEND_FORGE_API_KEY`, which reads
like a live integration and is not one.

**Lesson:** deleting a feature means deleting its files. A half-removed feature
is read by the next person as a working one.

---

## L9 — One workflow path is missing its leading slash
**Severity: low. Status: FIXED 2026-09-06** — leading slash added, and a failed fetch now shows a visible message instead of only a console line.

`client/src/components/sections/Showcase.tsx`, the UGC Ads entry:

```ts
workflowPath: "workflows/UGC Ads Veo & Sora.json",   // the other four start with "/"
```

A relative path resolves against the current URL. From `/` it happens to become
`/workflows/...` and works. From any other path it would 404 — and the `catch`
only writes to `console.error`, so the user sees a button that does nothing.

**What to do:** add the leading `/`, and show a visible message in the `catch`.

**Lesson:** "it works on the homepage" is not "it works". And a `catch` that only
logs is, to the user, no error handling at all.

---

## L10 — The mobile menu button does nothing
**Severity: usability, mobile. Status: FIXED 2026-09-06** — a real menu: opens, closes on Escape or link tap, locks the page behind it, and reports `aria-expanded`.

`client/src/components/sections/Navbar.tsx` — the nav links are
`hidden md:flex`, and the hamburger below them is three `<div>`s with
`cursor-pointer` and **no `onClick`**. The code comment admits it:
`{/* Mobile menu trigger - currently decorative */}`.

So on every phone the site has **no navigation at all** — the icon looks
tappable and does nothing.

**What to do:** either wire it to a real menu, or remove the icon so nothing
looks clickable that is not.

**Lesson:** most visitors to a portfolio arrive on a phone. Check the small
screen before the large one.

---

## L11 — The error screen shows a raw stack trace to visitors
**Severity: low. Status: FIXED 2026-09-06** — the stack trace now renders only under `import.meta.env.DEV`.

`client/src/components/ErrorBoundary.tsx` renders
`{this.state.error?.stack}` in a `<pre>`. Great in development; in production a
visitor sees minified internals, and the "Automation Error / An unexpected
exception occurred in the system core" wording lands badly on a site selling
reliable automation.

**What to do:** show a short human message in production, keep the stack behind
`import.meta.env.DEV`.

**Lesson:** the error screen is part of the product. Design it for the visitor,
not for the developer.

---

## L12 — 1.38 MB of JavaScript and a 735 kB hero image on first paint
**Severity: performance. Status: FIXED 2026-09-06** — 1.38 MB -> 480 kB main chunk, 15.3 MB -> 1.10 MB dist, hero 735 kB -> 100 kB WebP.

Verified from a real `npm run build`:

- main chunk `index-*.js` — **1.38 MB, 431 kB gzipped**; Vite prints the
  >500 kB warning.
- `client/dist` totals **15.3 MB**.
- `heroimage.jpg` is **735 kB**, imported directly by `Hero.tsx`, so it blocks
  the first screen.

The three biggest causes:

1. `streamdown` (used only for the fake chat bubble) drags in mermaid, shiki and
   katex — that is where the hundreds of language chunks come from.
2. `WorkflowViewer` imports the whole of `@xyflow/react` **eagerly**, although
   the viewer only opens after a click.
3. The hero image is a full-size JPEG, not WebP/AVIF, and has no `srcset`.

**What to do**, in order of payoff:

1. Convert `heroimage.jpg` to WebP at the size actually displayed (a portfolio
   hero rarely needs more than ~150 kB).
2. `const WorkflowViewer = lazy(() => import("../WorkflowViewer"))` — same for
   `CaseStudyModal` and `AiChat`.
3. Drop `streamdown` if `AiChat` goes away (L3); the chat only renders plain text.

**Lesson:** on a Bangladeshi mobile connection, 431 kB of gzipped JS plus a
735 kB image is several seconds of blank screen — on the page whose only job is
a first impression.

---

## L13 — There are no tests, and `vitest` pretends otherwise
**Severity: process. Status: OPEN.**

`vitest` is in `devDependencies`, there is no `test` script, and there is not a
single test file. There is also no CI workflow — nothing runs `npm run check` or
`npm run build` before a Vercel deploy.

Most of this site is presentational, so heavy testing would be waste. But
`parseN8nToReactFlow()` in `WorkflowViewer.tsx` is real logic on untrusted-shaped
JSON and deserves a test.

**Lesson:** a dependency is not a safety net. Only a test that actually runs is.

---

## L14 — `express` is a dependency of a site with no server
**Severity: cosmetic. Status: FIXED 2026-09-06** — unused dependencies removed.

`express` and `@types/express` are in `package.json`; the project is a pure
static Vite build with `outputDirectory: client/dist`. Leftovers from the
removed client-login work. Same for `axios` (nothing imports it) and `recharts`
(only the unused `ui/chart.tsx` touches it).

**Lesson:** unused dependencies are unread security advisories. Remove them.

---

## L15 — Sanitising a public file does not erase it from git history
**Severity: important to understand. Status: OPEN (owner decision).**

The workflow JSONs under `client/public/workflows/` were rewritten on
2026-09-06 to hold nothing but node names, types, positions and connections.
The **live site is clean from the next deploy onward**.

But every earlier commit still contains the full exports, including
a client's n8n cloud host, a client contact address, the webhook ids and the
n8n `instanceId`. Anyone can read them with `git log -p`. Deleting a file in a
new commit never removes it from history.

**The only real remedies**

1. Treat those identifiers as exposed and change what can be changed —
   regenerate the n8n webhook URLs on that instance. This is the meaningful fix.
2. Rewriting history (`git filter-repo`, then a force-push) is possible but
   breaks every existing clone and is not worth doing alone. Ask for help first.

**Lesson:** git is an archive, not a document. The moment something private is
committed and pushed, rotating the secret is the fix — not deleting the file.

---

## L16 — Case-study copy is identical for all five solutions
**Severity: content. Status: FIXED 2026-09-06** — the owner supplied his CV, so
every project now has its own problem / what-I-built / result text and its own
stack line, and a sixth project was added.

`CaseStudyModal.tsx` renders the same three paragraphs no matter which card was
clicked — the same "The Problem", the same "The Solution", and the same ROI
claim of "90% reduction in response time, 20+ hours saved per week". A visitor
who opens two cards sees it immediately, and the numbers cannot be backed up.

The fabricated testimonials and the placeholder stats were dealt with on
2026-09-06 (see `updates.md`); this copy was left alone because replacing it
needs facts only the owner has.

**What to do:** give each solution its own problem/solution/result text, using
outcomes you can actually stand behind — even "cut first-reply time from hours
to seconds" is stronger than an invented percentage.

**Lesson:** one set of numbers reused across five case studies reads as a
template, which is the opposite of what a case study is for.

---

## L17 — I assumed the owner's own figures were template placeholders
**Severity: process. Status: FIXED 2026-09-06, but do not repeat it.**

The Stats section read "10k+ tasks automated", "500+ hours saved",
"50+ integrations" and "99.9% AI accuracy". Sitting next to three invented
testimonials, they looked like the same boilerplate, so they were replaced with
figures counted from the repository.

They were not boilerplate. All four are the owner's own numbers, stated under
IMPACT on his CV. He stands behind them; it was never my call to soften them.
They are now restored exactly as he wrote them.

The testimonials genuinely were invented, and removing those was right. The
error was treating two different things as one because they sat side by side.

**Update 2026-09-06:** the owner then supplied a newer, complete CV that drops
all four figures. The site no longer states them — not because I judged them
unverifiable, but because his own current CV does not claim them. If he wants
them back, they are his to restore.

**Lesson:** unverifiable is not the same as untrue. When a claim cannot be
checked from the repository, that is a question for the owner — not a licence
to rewrite what they say about their own work. Flag it and ask.

---

## L18 — The CV carries an unfilled template placeholder
**Severity: low. Status: RESOLVED 2026-09-06 — superseded by a new CV.**

The owner replaced the whole document with
`Noray_Afzal_Nahid_Resumeupdated.pdf`, which carries real dates throughout. The
placeholder is gone with the old file.

The owner confirmed the year is **2026**, and the site now says "2026 — Present"
for that role. The PDF itself still reads "20XX" and is the owner's to correct.

`Noray_Afzal_Nahid_Resume_1.pdf` dates the freelance role as **"20XX – Present"**.
That is the template's placeholder, never replaced. A recruiter reading the PDF
sees it immediately.

The portfolio does not repeat it — the site carries the real year — but the PDF
should be corrected before it goes to anyone else.

**Lesson:** worth reading a source document for its own errors, not only for the
content being lifted out of it.

---

## L19 — Two CVs, two different people
**Severity: important. Status: RESOLVED 2026-09-06 by using the newer one.**

The site was rebuilt from one CV and then rebuilt again a few hours later from a
newer one, because the two describe noticeably different candidates:

| | First CV | Updated CV |
| --- | --- | --- |
| Title | AI Solutions Engineer / Product Builder / Automation Architect | Full-Stack Developer / AI Automation Expert (n8n) |
| Autolinium | AI Automation Intern, Apr 2026 – Present, Agrabad | Software Developer Intern, Mar – Aug 2026, Remote |
| Impact figures | 10k+ / 500+ / 50+ / 99.9% | none |
| Skills | ~60 items over nine groups | ~21 items over two groups |
| Named projects | generic descriptions | getvoicium, ezpzbd, Champion, Nandi ERP with URLs |
| Goal | implied consulting | "Seeking a full-time or contract remote role" |

The second is tighter, more concrete and easier to defend in an interview. The
first claimed tools — Claude, Groq, Whisper, Veo, Sora, HeyGen, Make.com,
GoHighLevel — that the newer one does not, and that do not all appear in the
published workflow graphs either.

**Lesson:** ask which document is current before building anything on it, and
when two versions disagree, the narrower and more specific one is usually the
one that survives contact with a technical interviewer.

---

## L20 — Describe a workflow from its graph, not from its title
**Severity: accuracy. Status: applied 2026-09-06.**

The workflow card copy originally described tools that the CV mentioned but the
graphs do not contain. Before rewriting it, every node type in the five files
was listed and the copy written from that.

What the graphs actually show, for reference:

- **E-commerce** — Gemini and OpenAI chat, Gemini embeddings, Supabase vector
  store, PostgreSQL chat memory, Sheets, calculator tool. No Groq or Whisper
  node, so no Whisper claim.
- **Agency** — Gemini agent, memory buffer, Google Calendar as a tool, Sheets,
  Telegram. No GoHighLevel node, so no GoHighLevel claim.
- **RAG** — Google Drive, file extraction, text splitter, OpenAI embeddings,
  Supabase vector store, schedule trigger.
- **Facebook auto-post** — schedule trigger, Gemini agent, Graph API over HTTP,
  Sheets, Telegram. No image-generation node, so no "generates the visual" claim.
- **UGC ads** — Sheets, OpenRouter and OpenAI, HTTP with wait-polling.

**Lesson:** the artifact is on the page and a reviewer can open it. Any claim the
map contradicts is worse than no claim.

---

## L21 — A project with no link needs to say why
**Severity: low, but it costs credibility. Status: FIXED 2026-09-06.**

Champion Sales SaaS and Nandi Real Estate ERP are the clients' own systems,
behind their logins. The cards simply had no link, which reads to a recruiter as
either an oversight or a project that does not exist.

Both cards now carry a "Private" badge, and their case studies say plainly that
the system is the client's and sits behind a login, with an offer to walk
through it in a call. getvoicium and ezpzbd keep their "Live" links.

**Lesson:** on a portfolio, an unexplained absence is read as a weakness. Naming
the reason — client system, under NDA, still in development — turns the same
fact into a normal professional constraint.

---

## L22 — The workflow viewer faked an interface it could not deliver
**Severity: was the worst thing on the site. Status: REMOVED 2026-09-06.**

The n8n map viewer reproduced n8n's own chrome — a "Personal" breadcrumb,
"+ Add tag", a "0 / 4" counter, a green **Active** badge, a "Live Execution Log"
bar, a sidebar and a zoom toolbar. Every one of those was a `<div>` with a hover
colour and no handler. A technical reviewer clicks the zoom button within
seconds, finds it dead, and reads the rest of the page with suspicion. The fake
"Active" badge was worse: it asserted something untrue about a running system.

The owner chose to drop the viewer entirely rather than rebuild it. The five
automations remain as written case studies, which is what a recruiter reads
anyway.

**Lesson:** never render a control that does nothing. An interface element is a
promise; a decorative one is a broken promise the visitor discovers by clicking.

---

## L23 — 3D did not need a 3D library
**Severity: judgement call worth keeping. Status: shipped 2026-09-06.**

The brief asked for 3D. The obvious route — three.js or React Three Fiber —
costs about **155 kB gzipped**, on a site that ships 157 kB in total. It would
have doubled the download for a portfolio whose audience opens links on phones.

What the design actually needed was a rotating constellation of connected points
with depth: perspective projection, depth fade, painter's-algorithm ordering and
pointer parallax. That is roughly 150 lines of arithmetic on a 2D canvas, and it
costs **nothing**. `HeroScene.tsx` does it, pauses when off screen or when the
tab is hidden, and renders a single still frame under
`prefers-reduced-motion`.

three.js earns its size when you need materials, lighting, shadows or model
loading. None of those were in the brief.

**Lesson:** name the effect you actually need before reaching for the library
that would deliver a hundred effects you don't.

---

## L24 — Uppercase is not emphasis when 28% of the page is uppercase
**Severity: this was the "not professional" feeling. Status: FIXED 2026-09-06.**

Measured on the live build before the redesign: **214 of 777 elements** were set
in uppercase, one border-radius appeared on **72** elements, and a single
typeface (Roboto) set everything. Every block wore the same costume — rounded
card, icon in a bordered box, uppercase micro-label, small grey paragraph — so
the eye had nowhere to land.

After: 48 uppercase elements, three typefaces with distinct roles, and the page
cut from **11,052px to 6,389px**.

A related bug the sweep caught: `font-black` (weight 900) was used throughout
while only weights 500-800 were loaded, so the browser was faking it or falling
back.

**Lesson:** emphasis is a scarce resource. Spend it on a few things or it stops
existing, and check that the weights you write are the weights you loaded.

---

## L25 — The owner did not want the 3D he asked for
**Severity: none, but worth remembering. Status: reverted 2026-09-06.**

The brief asked for 3D animation. It was built — a rotating node constellation,
hand-written, costing nothing — and shipped. On seeing it live the owner's
answer was simply "I don't like the 3D animation", and what he actually wanted
in that space was **a good photograph of himself**.

The audit had already flagged that the hero said nothing specific about him. A
portrait answers that better than an abstract graphic does, and on a page aimed
at recruiters a face is not decoration.

**Lesson:** "add 3D" was a guess at a solution for a problem the owner felt but
had not named — the hero was impersonal. Build the asked-for thing, show it
early, and be ready for the real answer to arrive only once something concrete
is on screen. Nothing was wasted: the 3D was one self-contained file and removing
it was a two-line change.

---

## L26 — Check whether the exposed thing is still reachable
**Severity: process. Status: resolved 2026-09-06.**

Two sessions were spent telling the owner to rotate the n8n webhook URLs leaked
in old commits. Auditing the original exports before repeating the warning a
third time showed the picture was narrower than stated:

| Workflow | Active | Webhook | Protected |
| --- | --- | --- | --- |
| Agency chatbot | yes | 2-character path | no |
| E-commerce chatbot | yes | 7-character path | no |
| RAG chatbot | yes | 10-character path | **header auth** |
| Facebook auto-post | yes | none — schedule trigger | n/a |
| UGC ads | no | none | n/a |

So three of five were never exposed, and the worst one was weak on its own
merits: a two-character path is brute-forceable in minutes whether or not it
ever leaked.

Then the owner said he no longer has that n8n instance at all, which closes the
question entirely.

**Lesson:** measure the exposure before prescribing the remedy, and check
whether the system is still live before asking anyone to fix it. A generic
"rotate your secrets" is cheap to say and can send someone chasing nothing.

---

## L27 — What this assistant can and cannot make
**Severity: scope. Status: recorded 2026-09-06.**

The owner asked, in good faith, for three things that are not code:

1. Turn his photograph into "a real person face reference, dress reference will
   be same" — image generation.
2. A short film of someone entering a dark room, switching on the light and
   sitting down — video.
3. A 3D character who walks and sits — a rigged model, made in Blender.

**None of those can be produced here.** This assistant writes code and processes
files the owner supplies (resize, crop, convert, compress). It has no image,
video or 3D asset generation.

What it could do was take the *idea* underneath the request — the room lighting
up — and build that in code against the photograph already in the repository:
the backdrop, the lamp glow, the light falling across the portrait and the
caption all come up together about half a second after load, over two seconds.
Zero added bytes.

The walking and sitting still need footage the owner films himself. A phone
video of exactly that action, compressed, would be 1-3 MB and would be *him*,
which beats any 3D stand-in on a hiring page.

**Lesson:** when the request needs an asset rather than code, say so in one
sentence, then find the part of the idea that *is* code and build that. Do not
quietly substitute something smaller and call it done, and do not refuse the
whole thing because one part is out of reach.

---

## L28 — The strongest claim was in a document nobody had read
**Severity: high value. Status: FIXED 2026-09-06.**

Five sessions were spent polishing a portfolio whose best fact was missing.
Autolinium's experience certificate says, in the CEO's own words, that Nahid
joined as an intern and *"on the strength of his performance during the
three-month training phase, was confirmed into a full-time position."*

That is third-party, signed, reference-numbered evidence that he was worth
keeping — the one claim a candidate cannot make about themselves. The site said
"Software Developer Intern" and stopped.

The same document also contradicted the site on the title, the dates, the
tenure, the location and the languages. A recruiter holding both would have
trusted neither.

**Lesson:** ask for the paperwork early. A CV is what someone says about
themselves; a certificate is what an employer signed. When they disagree, the
signature wins — and the disagreement itself is the damage.

---

## L29 — A token name collision made the whole site unreadable
**Severity: the site was barely legible. Status: FIXED 2026-09-07.**

Theme B declared `--color-muted: #B2C2BA` inside `@theme inline`. That block
already contained `--color-muted: var(--muted)` from the shadcn setup, pointing
at `oklch(0.25 0.02 280)` — a near-black grey. The later declaration won, so
every `text-muted` on the site rendered at roughly **1.5:1** against the
ground. The owner spotted it immediately from a screenshot.

The fix was to rename the token to `--color-body`, which collides with nothing,
and sweep 37 usages.

**Lesson:** when adding design tokens to a file that already has a system in it,
list the existing names first. A duplicate custom property does not warn — it
just quietly replaces yours.

---

## L30 — A contrast check that skips what it cannot parse is worse than none
**Severity: I reported a false pass. Status: fixed, method changed.**

Asked to verify the contrast fix, I ran a script that read
`getComputedStyle(el).color` and matched it against `/rgba?\(([^)]+)\)/`. Every
broken element returned `oklch(0.25 0.02 280)`, which that regex does not match,
so the script returned `null` and **skipped exactly the elements that were
broken**. It printed "no failures" and I passed that on as proof while the page
was plainly unreadable in the screenshot beside it.

The working method resolves any CSS colour through a 1x1 canvas — fill, read the
pixel back — so `oklch`, `color-mix`, named colours and hex all reduce to RGB:

```js
const cx = document.createElement("canvas").getContext("2d");
function toRGB(col) {
  cx.fillStyle = "#000"; cx.fillRect(0, 0, 1, 1);
  cx.fillStyle = col;    cx.fillRect(0, 0, 1, 1);
  const d = cx.getImageData(0, 0, 1, 1).data;
  return { r: d[0], g: d[1], b: d[2] };
}
```

It also now reports how many elements it checked, so a suspiciously small count
is visible instead of silent.

**Lesson:** a verification script must fail loudly on input it cannot handle.
Silently dropping the unparseable turns a test into a rubber stamp — and the
user had already seen the truth with their own eyes.

---

## L31 — Passing the contrast rule is not the same as looking clear
**Severity: design. Status: FIXED 2026-09-07.**

After the token collision was fixed, body text measured 10.4:1 — comfortably
past WCAG AA — and the owner still said it did not read clearly: *"it should be
more clear like headline"*. He was right. Next to a near-white headline at
17.9:1, a grey-green at 10.4:1 still registers as *dim*, because the eye judges
against what is beside it, not against a threshold.

The values that satisfied him:

| Role | Was | Now | Contrast |
| --- | --- | --- | --- |
| Headline | `#F2F5F3` | `#F4F7F5` | 17.9:1 |
| Body | `#B2C2BA` | `#DEE7E2` | 15.3:1 |
| Secondary | `#8A9A93` | `#A8B8B0` | 9.3:1 |
| Green labels | `#0E9F6E` | `#4ADE9B` | 11.2:1 |

The deep green is still right for button fills, where the text sits *on* it. It
was wrong for small type, where it was the text.

**Lesson:** WCAG is a floor, not a target, and it is measured against the
background — not against the brightest thing on the page. When someone says text
looks dim while the numbers say it passes, the numbers are answering a different
question.

---

## L32 — Uppercase and wide tracking made a sentence unreadable
**Severity: legibility. Status: FIXED 2026-09-07.**

The owner sent a crop of one line: "GETVOICIUM, ARCHITECTURE TO DEPLOYMENT". It
was a **sentence** set at 11.5px, uppercase, `tracking-widest`, in the
secondary colour. Four legibility costs stacked on one short line:

- uppercase removes ascenders and descenders, so the word shapes people actually
  read by are gone
- wide tracking breaks the remaining shapes into separate letters
- 11.5px is below comfortable reading size
- the secondary colour was the dimmest text on the page

Now: 13px, sentence case, no extra tracking, in the body colour — **14.7:1**.

Uppercase with wide tracking still earns its place on the `.label` utility,
where the content is one or two words ("Education", "Verified documents"). The
rule is the length of the string, not the size of the type.

**Lesson:** a treatment that reads as *styled* on a two-word label reads as
*damaged* on a sentence. Check what the class is wrapping, not just how it looks
in isolation.

---

## L33 — An image will not shrink inside a flex column
**Severity: broke a section the whole site was rebuilt around. Status: FIXED 2026-09-07.**

The certificate lightbox was a `flex flex-col max-h-[94vh]` panel holding a
header row and then an `<img>`. An image in a flex column takes its intrinsic
height and refuses to shrink, so a 2329px-tall document forced the panel far
past 94vh and pushed the header off the top of the screen. The owner saw a
certificate with its own title sliced in half.

The pattern that works, for any scrollable-document panel:

```
panel   flex flex-col max-h-[94vh] overflow-hidden
header  shrink-0
body    flex-1 min-h-0 overflow-auto     <- min-h-0 is the part people miss
footer  shrink-0
```

Without `min-h-0`, a flex child's minimum size is its content, and `flex-1`
cannot shrink it below that. With it, the row takes the space left over and
scrolls its own contents.

The certificates were also re-rendered at 1800px and 2000px wide instead of
1400px, and a footer link opens the full-size file, so the small print in a
scanned document is actually readable.

**Lesson:** `overflow-auto` on the image does nothing — images do not scroll.
The scrolling belongs on a wrapper, and that wrapper needs `min-h-0`.
