# AuTuber Landing Page

Single-page Next.js 15 app showcasing the AuTuber AI live streaming agent.

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **React 19** with hooks (`"use client"` for IntersectionObserver in page.tsx and interactive components)
- **Tailwind CSS 4** (minimal usage, mostly custom CSS classes)
- **Space Grotesk** (UI font) + **IBM Plex Mono** (monospace), loaded via `next/font/google`

## Directory Structure

```
app/
├── page.tsx                main page (component orchestrator)
├── layout.tsx              root layout, font init, metadata
├── globals.css             CSS imports aggregator
├── components/
│   ├── Nav.tsx             sticky navigation with IntersectionObserver integration
│   ├── HeroSection.tsx      hero section with CTAs
│   ├── ProblemSection.tsx   5 pain-point cards
│   ├── SolutionSection.tsx  4 feature cards + image gallery
│   ├── WhySection.tsx       competitor table + 5 differentiators
│   ├── DemoSection.tsx      YouTube iframe (16:9 responsive)
│   ├── TeamSection.tsx      team photo gallery + 4 member cards
│   ├── SectionWrapper.tsx   layout wrapper for sections
│   └── ImageGallery.tsx     carousel + lightbox for images
└── styles/
    ├── variables.css       CSS custom properties (colors, shadows)
    ├── base.css            typography, body gradients/orbs
    ├── animations.css      fadeIn, slideInLeft/Right keyframes
    ├── buttons.css         pill buttons, status badges
    ├── components.css      panels, grids, utilities (eyebrow, closing-statement)
    ├── nav.css             navigation bar, dropdown (mobile)
    ├── carousel.css        image carousel, lightbox
    └── responsive.css      media queries for grids, mobile nav

public/images/
├── solution/               solution section screenshots (general1-4.png, screen1-3.png)
├── dev-team.png            team section hero photo
└── dev-team-2.png          team section secondary photo
```

## Design System

CSS custom properties on `:root` (variables.css):
- **Base colors**: `--bg` (#fff7fb), `--bg-alt` (#fff0f6), `--ink` (#2a2a2a), `--muted` (#6b7280)
- **Panel styling**: `--panel` (rgba white 0.92), `--panel-border` (#ffd6e7), `--divider` (#f0f2f5)
- **Accent colors**: `--accent` (#ff8db8), `--accent-strong` (#ff7daf), `--accent-soft` (rgba accent 0.16)
- **Secondary accents**: `--accent-peach` (#ffc89e), `--accent-cyan` (#7ee9f3), `--accent-mint` (#b8f5d6), `--accent-purple` (#cdb4ff)
- **Status colors**: `--warning` (#d97706), `--success` (#4b9f7a)
- **Effects**: `--shadow` (0 24px 80px rgba(ff8db8, 0.14))

### Utility Classes

**Typography** (base.css):
- `h1`: clamp(2rem, 4vw, 3.2rem), letter-spacing -0.04em
- `h2`: 1.8rem, letter-spacing -0.04em
- `h3`: 1.2rem
- `p`: color var(--muted), line-height 1.6

**Panels & Cards** (components.css):
- `.panel` -- 32px padding, 28px border-radius, frosted glass (blur 6px), shadow
- `.panel__card` -- 20px padding, 20px border-radius, light background

**Buttons** (buttons.css):
- `.pill-btn` -- 10px vertical, 20px horizontal, border-radius 999px, 600 weight
  - `--primary` -- pink-to-peach gradient
  - `--secondary` -- outlined style
  - `--ghost` -- transparent with border
- `.status-pill` -- uppercase 600 weight, letter-spacing 0.08em
  - `--live`, `--capture` -- green background
  - `--idle`, `--manual` -- purple background
  - `--obs` -- cyan background

**Grids** (components.css):
- `.grid--2col` -- 2 columns, collapses to 1 at 720px
- `.grid--5col` -- 5 columns, 3 columns at 1024px, 1 column at 720px
- `.grid--auto` -- auto-fit with 240px min

**Navigation** (nav.css):
- `.app-nav` -- 40px sticky bar, glass effect, flex layout
- `.app-nav__tab` -- 6px v / 12px h, muted color, active state uses `--accent-soft` background
- `.nav-dropdown-mobile` -- hidden desktop, block at 720px, absolute positioning
- `.nav-dropdown__menu` -- fadeIn animation, shadow, min-width 140px

**Carousel & Lightbox** (carousel.css):
- `.carousel__btn` -- 44px circular buttons (prev/next), hover scales 1.08
- `.carousel__dot` -- 9px circles, active scales 1.3 with `--accent` background
- `.lightbox` -- fixed overlay, dark background (rgba 10,8,18,0.9), blur effect, z-index 1000
- `.lightbox__content` -- 16:9 aspect ratio
- `.lightbox__close` -- fixed top-right, glass button

**Animations** (animations.css):
- `fadeIn` -- opacity 0→1, translateY 10px→0, 300ms ease-out
- `slideInFromRight` -- opacity 0→1, translateX 48px→0, 220ms ease-out
- `slideInFromLeft` -- opacity 0→1, translateX -48px→0, 220ms ease-out

**Utility** (components.css):
- `.eyebrow` -- uppercase 700 weight, letter-spacing 0.22em, `--accent-strong` color
- `.closing-statement` -- left border 3px `--accent`, padding-left 24px, 1.05rem, 500 weight
- `.meter` -- progress bar (height 10px, rounded)
- `.meter__bar` -- gradient from `--accent-cyan` to `--accent`

**Form inputs** (components.css):
- Input, select, textarea -- 1px border, 10px radius, light background, IBM Plex Mono

**Background** (base.css):
- Body: layered radial gradients (pink 0.24, cyan 0.2, purple 0.18) + linear gradient
- `body::before` -- cyan orb (top-right, 18rem, blur 8px)
- `body::after` -- purple orb (bottom-left, 20rem, blur 8px)

**Responsive** (responsive.css):
- At 1024px: `.grid--5col` → 3 columns
- At 720px: desktop nav hidden, mobile dropdown shown; grids collapse to 1 column; panel/card padding reduced

## Page Sections

### page.tsx
Main orchestrator. `"use client"` directive. Manages IntersectionObserver for nav highlighting. Contains `NAV_LINKS` array and renders six section components in sequence.

### Components

**Nav.tsx** (`"use client"`):
- Props: `links` (array), `activeSection` (string), `onNavClick` (callback)
- Desktop: horizontal tab buttons (flex row)
- Mobile: dropdown menu activated on 720px breakpoint
- Highlights active section based on IntersectionObserver output from page.tsx
- Closes dropdown on click-outside (useRef + mousedown listener)

**HeroSection.tsx**:
- Headline: "Your AI stage hand for live streaming."
- Subheading: "We watch the camera, the screen, and the mic so you can focus on the show."
- Two CTAs: "Watch the Demo" button (scrolls to demo), GitHub link (external)
- `fadeIn` animation

**ProblemSection.tsx**:
- Wrapped in `SectionWrapper` (id="problem", title="The Problem")
- Headline + description
- Five problem cards (PROBLEM_ITEMS): hotkey conflicts, forgotten triggers, awkward scene switches, VTuber emote selection, cognitive overload
- Closing statement (left-border callout style)
- All cards have `fadeIn` animation, use `.grid--5col`

**SolutionSection.tsx**:
- Wrapped in `SectionWrapper` (id="solution", title="The Solution")
- Headline + description
- Four feature cards (SOLUTION_ITEMS): OBS WebSocket, VTube Studio triggers, audience moment recognition, safety by default
- Image gallery below (7 images)
- Closing note about preserving existing setups
- Grid: `.grid--2col`

**ImageGallery.tsx** (`"use client"`):
- Props: `images` (array of { src, alt })
- Carousel with prev/next buttons (‹ › characters)
- Dot indicators (click to jump to image)
- Click main image to open lightbox
- Lightbox: full-screen overlay, escape/arrow keys to navigate, click background to close
- Slides animate with `slideInRight`/`slideInLeft` based on direction
- Portal rendered to document.body

**WhySection.tsx**:
- Wrapped in `SectionWrapper` (id="why", title="Why AuTuber")
- Headline + description
- Competitor comparison table (7 competitors + AuTuber row)
  - Columns: Product, OBS, VTS, LLM, Multimodal Context, Cost
  - Alternating row backgrounds (var(--panel) vs var(--bg-alt))
  - AuTuber row highlighted with `--accent-soft` background
- Five differentiator cards (DIFFERENTIATORS): multimodal context, LLM-driven planning, plug-and-play, open platform-agnostic, affordable pricing
- All cards have `fadeIn` animation

**DemoSection.tsx**:
- Wrapped in `SectionWrapper` (id="demo", title="Demo")
- YouTube iframe (16:9 ratio using padding-bottom technique)
- Embedded in `.panel` container
- `fadeIn` animation

**TeamSection.tsx**:
- Wrapped in `SectionWrapper` (id="team", title="Development Team")
- Image gallery (2 team photos)
- Four team member cards (TEAM_MEMBERS): name, LinkedIn link, roles (status pills), optional email
- All cards link to LinkedIn
- Grid: `.grid--2col`, `fadeIn` animation
- Roles use `.status-pill--idle` (purple)

**SectionWrapper.tsx**:
- Layout wrapper for all content sections except hero
- Props: `id` (for nav), `title` (eyebrow label), `children`
- Adds border-top (divider color)
- Centered flex layout with padding (clamp 24px-72px responsive)

## Data Structures

All content defined as const arrays in respective components:

- **PROBLEM_ITEMS** (ProblemSection): 5 items, title + body
- **SOLUTION_ITEMS** (SolutionSection): 4 items, title + body
- **SOLUTION_IMAGES** (SolutionSection): 7 images, src + alt
- **COMPETITORS** (WhySection): 7 products, properties: name, obs, vts, llm, context, cost, alt (for row striping)
- **DIFFERENTIATORS** (WhySection): 5 items, number + title + body
- **TEAM_PHOTOS** (TeamSection): 2 images, src + alt
- **TEAM_MEMBERS** (TeamSection): 4 members, name + roles array + LinkedIn + optional email
- **NAV_LINKS** (page.tsx): 5 links, label + id

## Key Implementation Details

- **IntersectionObserver** (page.tsx): Observes section elements with `rootMargin: "-50% 0px -50% 0px"` to detect when section is in viewport center. Updates `activeSection` state.
- **Image Gallery** (ImageGallery.tsx): Tracks current index, direction (left/right), lightbox open state. Keyboard navigation in lightbox (Escape, ArrowLeft, ArrowRight).
- **Mobile Nav** (Nav.tsx): Click-outside detection to close dropdown. Desktop/mobile split at 720px via `.nav-tabs-desktop` display toggle.
- **Animations**: Applied via class names (`.fadeIn`, `.slideInLeft`, `.slideInRight`). No Framer Motion.
- **Image optimization**: Uses Next.js `Image` component with `fill` + `object-contain`/`object-cover`.
- **Responsive padding**: Uses `clamp()` for section padding (24px-72px based on viewport width).
- **Tailwind usage**: Limited to layout utilities (flex, gap, grid, max-w, m-auto, px/py, text-center, etc.). Most styling via custom CSS classes.

## Non-Obvious Details

- Hero section is **not** in NAV_LINKS; no highlight on load.
- Team member email displayed inline in one card (Brian Phan); other cards only show LinkedIn.
- Comparison table uses `alt` property on COMPETITORS to determine striping; not data-driven.
- Image sources changed from `/images/antuber/` to `/images/solution/` (general1-4, screen1-3).
- No `tailwind.config` file -- Tailwind 4 uses PostCSS plugin with defaults.
- `next.config.ts` is empty (default settings).
- `globals.css` is now only @import statements; no inline rules.
- `rise` animation removed; only `fadeIn`, `slideInLeft`, `slideInRight` remain.
- SectionWrapper applies border-top divider to all sections except hero.
