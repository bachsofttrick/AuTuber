# AuTuber Style Guide

Extracted from the Electron app's design system (`src/renderer/styles/globals.css`). Use these tokens and patterns when building the landing page to ensure visual consistency.

## Fonts

```css
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap");
```

- **UI / body**: `Space Grotesk` (weights: 400, 500, 600, 700), fallback `Segoe UI, sans-serif`
- **Code / monospace**: `IBM Plex Mono` (weights: 400, 600)

## Color Tokens

All tokens are CSS custom properties set on the root shell element.

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#fff7fb` | Page background |
| `--bg-alt` | `#fff0f6` | Hover states, alternate surfaces |
| `--ink` | `#2a2a2a` | Body text |
| `--muted` | `#6b7280` | Secondary text, labels, placeholders |
| `--panel` | `rgba(255,255,255,0.92)` | Card / panel backgrounds |
| `--panel-border` | `#ffd6e7` | Card borders, input borders |
| `--divider` | `#f0f2f5` | Divider lines |
| `--accent` | `#ff8db8` | Primary pink accent |
| `--accent-strong` | `#ff7daf` | Hover / active states |
| `--accent-soft` | `rgba(255,141,184,0.16)` | Active tab background, subtle tints |
| `--accent-peach` | `#ffc89e` | Gradient end color for primary buttons |
| `--accent-cyan` | `#7ee9f3` | Secondary accent (top-right glow, meter bars) |
| `--accent-mint` | `#b8f5d6` | Tertiary accent |
| `--accent-purple` | `#cdb4ff` | Tertiary accent (bottom-left glow) |
| `--warning` | `#d97706` | Error / warning text |
| `--success` | `#4b9f7a` | Success / live status text |
| `--shadow` | `0 24px 80px rgba(255,141,184,0.14)` | Panel drop shadow |

## Background

The page uses a layered gradient for depth:

```css
background:
  radial-gradient(circle at top left,  rgba(255, 141, 184, 0.24), transparent 28%),
  radial-gradient(circle at top right, rgba(126, 233, 243, 0.20), transparent 24%),
  radial-gradient(circle at 15% 85%,   rgba(203, 180, 255, 0.18), transparent 28%),
  linear-gradient(180deg, #fff7fb 0%, #fffdfd 58%, #fff5f9 100%);
```

Two blurred pseudo-element orbs reinforce the depth:
- Top-right: cyan `rgba(126,233,243,0.28)`, `18rem` circle, `blur(8px)`
- Bottom-left: purple `rgba(203,180,255,0.24)`, `20rem` circle, `blur(8px)`

## Panels / Cards

```css
.panel {
  background: var(--panel);           /* rgba(255,255,255,0.92) */
  border: 1px solid var(--panel-border);
  border-radius: 28px;
  padding: 32px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(6px);
}

.panel__card {
  padding: 20px;
  border: 1px solid var(--panel-border);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.82);
}
```

## Typography Scale

| Use | Size | Weight | Notes |
|---|---|---|---|
| Large heading | `clamp(2rem, 4vw, 3.2rem)` | 700 | Letter-spacing `-0.04em` |
| Panel title | `1.8rem` | 600-700 | |
| Section title | `1.2rem` | 600 | |
| Body / subtitle | `0.85rem` | 400 | Color: `--muted` |
| Eyebrow / kicker | `0.7–0.72rem` | 600 | `text-transform: uppercase`, `letter-spacing: 0.22–0.3em` |
| Code / mono | `0.78–0.82rem` | 400 | `IBM Plex Mono` |
| Small label | `0.72rem` | 600 | Uppercase, `letter-spacing: 0.08em` |

## Buttons

Three variants, all `border-radius: 999px` (pill shape):

```css
/* Primary */
.primary-button {
  background: linear-gradient(120deg, var(--accent), var(--accent-peach));
  color: #ffffff;
  padding: 10px 20px;
  font-weight: 600;
}

/* Secondary */
.secondary-button {
  border: 1px solid var(--panel-border);
  background: rgba(255, 255, 255, 0.88);
  color: var(--ink);
  padding: 10px 20px;
  font-weight: 600;
}

/* Ghost */
.ghost-button {
  border: 1px solid var(--panel-border);
  background: transparent;
  color: var(--muted);
  padding: 10px 20px;
  font-weight: 600;
}
```

**Hover state** (all buttons):
```css
transform: translateY(-1px);
box-shadow: 0 10px 24px rgba(255, 141, 184, 0.18);
transition: transform 150ms ease, box-shadow 150ms ease;
```

## Status Pills

Pill badges with `border-radius: 999px`, `padding: 8px 16px`, `font-weight: 600`:

| Modifier | Background | Color |
|---|---|---|
| `--live` | `rgba(184,245,214,0.72)` | `var(--success)` (`#4b9f7a`) |
| `--idle` / `--manual` | `rgba(205,180,255,0.24)` | `#7b6aa8` |
| `--obs` | `rgba(189,230,255,0.72)` | `#3e6d92` |
| `--capture` | `rgba(184,245,214,0.72)` | `var(--success)` |

## Inputs & Form Fields

```css
input, select, textarea {
  border: 1px solid var(--panel-border);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--ink);
  padding: 8px 10px;
  font-family: "IBM Plex Mono", monospace;
}
```

## Meter / Progress Bar

```css
.meter {
  height: 10px;
  border-radius: 999px;
  background: rgba(205, 180, 255, 0.18);
}
.meter__bar {
  background: linear-gradient(90deg, var(--accent-cyan), var(--accent));
  transition: width 150ms ease;
}
```

## Navigation Bar

```css
.app-nav {
  height: 40px;
  background: rgba(255, 255, 255, 0.82);
  border-bottom: 1px solid var(--panel-border);
  backdrop-filter: blur(14px);
  padding: 0 16px;
}
.app-nav__tab--active {
  background: var(--accent-soft);    /* rgba(255,141,184,0.16) */
  color: var(--accent-strong);
  font-weight: 600;
}
```

## Animations

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes rise {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Use `animation: fadeIn 300ms ease-out` on cards/sections as they enter the viewport.

## Grid Patterns

```css
/* Responsive card grid */
grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
gap: 20px;

/* Status/stat grid */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
gap: 16px;
```

## Spacing & Layout

- Content padding: `padding: 32px clamp(20px, 6vw, 72px)`
- Section gap: `32px`
- Card-to-card gap: `20px`
- Inner card padding: `20–32px`
- Small element gap: `8–12px`

## Responsive Breakpoints

```css
@media (max-width: 720px) {
  /* Reduce padding, switch grids to single column */
  padding: 24px 20px;
}
```

## Design Principles

- **Light mode only** (`color-scheme: light`). The palette is soft pink/peach/cyan/purple on white -- no dark theme.
- **Glassmorphism**: panels use semi-transparent backgrounds (`rgba(255,255,255,0.82–0.92)`) with `backdrop-filter: blur`.
- **Rounded corners everywhere**: panels `28px`, cards `20px`, inputs `10px`, buttons `999px` (pill).
- **Subtle depth**: shadows use the pink accent color at low opacity rather than gray.
- **Minimal motion**: only translate + opacity transitions, `150–300ms ease-out`. No elaborate keyframe sequences.
