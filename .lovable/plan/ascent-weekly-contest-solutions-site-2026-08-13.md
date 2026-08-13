# Ascent — Weekly Contest Solutions Site

A static, responsive React site holding solutions for the Ascent weekly contest series. Minimalist design, dark/light theme following the system setting with a toggle in the navbar.

## Pages

- **Home (/)** — Short intro to Ascent, latest contest highlight, link into solutions.
- **Solutions (/solutions)** — List of all contests (number, title, date, question count, difficulty mix), each linking to its own page.
- **Contest page (/solutions/$contestId)** — One section per question containing:
  - Heading (question number + title)
  - Meta row: tags, difficulty badge, acceptance rate
  - Problem statement (with examples/constraints)
  - Solution write-up (approach, complexity)
  - Optional images/diagrams
  - Code snippet block with C++ / Python / Java tabs
- **Leaderboard (/leaderboard)** — Static table of past contest winners/rankings.
- **Rules (/rules)** — Format, scoring, eligibility.
- **About (/about)** — About the series.
- **Contact (/contact)** — Static contact links.

## Navigation & theme

- Sticky minimal navbar: "Ascent" wordmark on the left, links (Solutions, Leaderboard, Rules, About, Contact) on the right, theme toggle at the end. Collapses to a hamburger sheet on mobile.
- Theme follows the OS preference by default; toggle overrides and persists in localStorage. No flash on load (inline script sets the class before paint).
- Simple footer with contest name and links.

## Content

All contests and questions live in typed TypeScript data files under `src/data/` — one file per contest plus an index. Adding a new contest = adding one file and one entry to the index. Ships with two fully written sample contests (3 questions each) so every part of the layout is visible; you replace the content with your own.

## Design

Minimal monochrome base with a single accent color, generous whitespace, subtle borders instead of heavy shadows, difficulty badges color-coded (easy/medium/hard). Type: a clean sans for UI with a monospace face for code. Fully responsive: single column and horizontally scrollable code blocks on mobile.

## Technical notes

- TanStack Start file routes: `index.tsx`, `solutions.index.tsx`, `solutions.$contestId.tsx`, `leaderboard.tsx`, `rules.tsx`, `about.tsx`, `contact.tsx`. Unknown contest ids render a not-found state.
- Types: `Contest`, `Question` (title, slug, tags, difficulty, acceptanceRate, statement, solution, images, code: { cpp, python, java }).
- Code blocks: syntax-highlighted with `shiki` (build-safe, no runtime provider), language tabs via shadcn Tabs, copy-to-clipboard button.
- Theme tokens added to `src/styles.css` (`:root` / `.dark`) — no hardcoded color classes.
- Per-route `head()` metadata: unique title/description/og tags, contest pages derive theirs from the contest data.
- Fully static, no backend.
