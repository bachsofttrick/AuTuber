# AuTuber Landing Page

Single-page Next.js 15 app showcasing the AuTuber AI live streaming agent.

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **React 19** with hooks (`"use client"` on main page for IntersectionObserver)
- **Tailwind CSS 4** (minimal usage, mostly custom CSS classes)
- **Space Grotesk** (UI font) + **IBM Plex Mono** (monospace), loaded via `next/font/google`

## Structure

```
app/
├── page.tsx       main component (~620 lines), all five sections
├── layout.tsx     root layout, font init, metadata
└── globals.css    full design system (~340 lines)

public/images/
├── antuber/       solution section screenshots (general.png, screen1.png, screen2.png, screen3.png)
└── dev-team.png   team section hero photo
```

## Design System (globals.css)

CSS custom properties on `:root`:
- Colors: `--bg` (#fff7fb), `--ink` (#2a2a2a), `--muted` (#6b7280), `--accent` (#ff8db8), `--panel`, `--panel-border` (#ffd6e7), `--shadow`
- Secondary accents: `--accent-cyan` (#7ee9f3), `--accent-purple` (#cdb4ff), `--accent-peach` (#ffc89e)

Utility classes:
- `.panel` / `.panel__card` -- frosted glass cards (28px / 20px radius)
- `.pill-btn--primary` (pink gradient) / `--secondary` (outline) / `--ghost` (transparent)
- `.status-pill--live` / `--idle` / `--obs` / `--capture`
- `.eyebrow` -- uppercase small label
- `.grid--auto` / `.grid--2col` -- responsive grids, collapse to 1 column at 720px
- `.app-nav` / `.app-nav__tab--active` -- sticky nav styling
- Animations: `fadeIn`, `rise` (300ms ease-out, applied via IntersectionObserver)

Background: layered radial gradients (pink/cyan/purple) + two blurred orb pseudo-elements on `body`.

## Page Architecture (page.tsx)

All content is defined as const arrays at the top: `NAV_LINKS`, `PROBLEM_ITEMS`, `SOLUTION_ITEMS`, `COMPETITORS`, `DIFFERENTIATORS`, `TEAM_MEMBERS`.

Sections in order:
1. **Hero** (no nav id) -- headline, two CTA buttons
2. **Problem** (`#problem`) -- 5 pain-point cards in auto-fit grid
3. **Solution** (`#solution`) -- 4 feature cards + 4-image gallery from `/images/antuber/`
4. **Why** (`#why`) -- competitor comparison table + 5 differentiator cards
5. **Demo** (`#demo`) -- YouTube iframe in 16:9 responsive wrapper
6. **Team** (`#team`) -- dev-team.png hero photo + 4 member cards

Navigation highlights the active section via IntersectionObserver (`rootMargin: "-50% 0px -50% 0px"`). All images use `next/image` with `fill` + `object-cover`.

## Non-Obvious Details

- Hero section is not in NAV_LINKS; CTAs scroll manually (`#demo`, GitHub link).
- Team role badges all use `.status-pill--idle` (purple); no role-to-color mapping.
- Comparison table is hardcoded 7 rows + AuTuber row at the bottom.
- No `tailwind.config` file -- Tailwind 4 uses PostCSS plugin with default config.
- `next.config.ts` is empty (default settings).
