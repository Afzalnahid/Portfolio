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
**Severity: content. Status: OPEN (needs the owner's real numbers).**

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
