---
name: Vibrant Enterprise
colors:
  surface: "#f8f9ff"
  surface-dim: "#cbdbf5"
  surface-bright: "#f8f9ff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#eff4ff"
  surface-container: "#e5eeff"
  surface-container-high: "#dce9ff"
  surface-container-highest: "#d3e4fe"
  on-surface: "#0b1c30"
  on-surface-variant: "#434655"
  inverse-surface: "#213145"
  inverse-on-surface: "#eaf1ff"
  outline: "#737686"
  outline-variant: "#c3c6d7"
  surface-tint: "#0053db"
  primary: "#004ac6"
  on-primary: "#ffffff"
  primary-container: "#2563eb"
  on-primary-container: "#eeefff"
  inverse-primary: "#b4c5ff"
  secondary: "#565e74"
  on-secondary: "#ffffff"
  secondary-container: "#dae2fd"
  on-secondary-container: "#5c647a"
  tertiary: "#525657"
  on-tertiary: "#ffffff"
  tertiary-container: "#6b6e70"
  on-tertiary-container: "#eff1f3"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#dbe1ff"
  primary-fixed-dim: "#b4c5ff"
  on-primary-fixed: "#00174b"
  on-primary-fixed-variant: "#003ea8"
  secondary-fixed: "#dae2fd"
  secondary-fixed-dim: "#bec6e0"
  on-secondary-fixed: "#131b2e"
  on-secondary-fixed-variant: "#3f465c"
  tertiary-fixed: "#e0e3e5"
  tertiary-fixed-dim: "#c4c7c9"
  on-tertiary-fixed: "#191c1e"
  on-tertiary-fixed-variant: "#444749"
  background: "#f8f9ff"
  on-background: "#0b1c30"
  surface-variant: "#d3e4fe"
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: "800"
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: "700"
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: "700"
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: "600"
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
---

## Design Role

This file is the official implementation-facing design source for Talent RDC Express. All frontend work must align with this document unless a new approved design direction replaces it.

## Product Feel

The interface should feel credible, modern, and energetic without drifting into generic startup UI. It must communicate trust for job seekers while still looking ambitious and technology-forward.

Key traits:

- Clean information hierarchy.
- Bright but disciplined brand color usage.
- Strong readability on mobile and desktop.
- Layered surfaces instead of flat white screens.
- Subtle geometry and depth rather than decorative noise.

## Brand Direction

- Product name: Talent RDC Express.
- Brand posture: professional, ambitious, accessible, regional, and mobile-first.
- Visual mood: vibrant enterprise rather than minimal monochrome.
- Core accent: vivid blue used deliberately on actions, highlights, and important data states.

## Approved Tokens

### Color Guidance

- Use `primary` and `primary-container` for primary actions, links of high importance, selected states, and brand emphasis.
- Use `surface`, `surface-container`, and `surface-container-high` for page backgrounds, cards, and grouped panels.
- Use `on-surface` and `on-surface-variant` for content hierarchy. Avoid low-contrast text on tinted surfaces.
- Use `error` only for destructive actions, validation failures, and critical states.

### Typography Guidance

- Hanken Grotesk is the only approved primary typeface.
- Display and headline styles should stay visually assertive and slightly condensed through tighter spacing.
- Body sizes must stay highly readable on small mobile screens.
- Labels should be semibold and concise, especially for buttons, chips, and navigation items.

### Radius And Depth

- Inputs and standard buttons use the base radius.
- Cards and larger containers should use `md`, `lg`, or `xl` radii depending on density.
- Use soft ambient shadows on cards, popovers, and modal surfaces. Avoid heavy dark shadows.

## Responsive Layout Rules

- Required validation breakpoints: 375px, 768px, 1024px, and 1440px.
- Mobile-first layout is mandatory.
- Max content width should remain aligned with `container-max`.
- Keep page content breathable with the documented gutter and margin tokens.
- Dense job metadata should stack gracefully on mobile rather than shrinking to unreadable text.
- Critical actions such as Apply, Save, Continue, and Submit must remain visible and easy to tap on mobile.

## Accessibility Rules

- All text and interactive states must maintain readable contrast.
- Focus states must be visible and consistent.
- Forms require labels, validation feedback, and keyboard accessibility.
- Decorative graphics or background patterns must not interfere with content readability.
- Motion should remain subtle and not block interaction.

## Core Screen Patterns

### Landing Page

- Lead with search, trust signals, and featured opportunities.
- Hero sections may use gradients or geometric texture, but text contrast must remain strong.
- Highlight pathways for popular categories, remote work, and urgent opportunities.

### Job Listings

- Prioritize fast scanning through strong card hierarchy.
- Filters must remain usable on mobile through drawers, accordions, or sticky controls.
- Remote, contract type, salary, and seniority indicators should be recognizable at a glance.

### Job Detail

- The page should support deep reading without overwhelming the user.
- Company context, responsibilities, requirements, and benefits should be separated into clear sections.
- Mobile should expose a sticky or consistently visible apply action.

### Candidate Dashboard

- Cards and stats should feel operational and calm.
- Use information grouping for applications, interviews, and profile completion.
- Empty and loading states must feel intentional, not placeholder-like.

### Candidate Profile

- Present experience, education, and skills with strong hierarchy.
- Make profile trust indicators and completeness signals easy to understand.

## Component Guidance

### Header

- Guest state: clear navigation plus distinct primary and secondary calls to action.
- Authenticated state: practical utility actions such as notifications, search, and profile menu.
- Header layout should remain stable across breakpoints and avoid collapsing into clutter.

### Footer

- Use a structured multi-column layout on large screens and an ordered stacked layout on mobile.
- Footer should feel trustworthy and complete rather than decorative.

### Buttons

- Primary buttons: strong filled blue with white text.
- Secondary buttons: tinted or low-emphasis filled actions.
- Outline buttons: neutral border with restrained emphasis.
- Disabled states must remain obviously inactive.

### Cards

- Cards are the main delivery surface for jobs, stats, grouped actions, and summaries.
- Standard card treatment: light surface, 1px border, soft shadow, rounded large corners.

### Forms And Inputs

- Inputs should have calm neutral borders by default.
- Focus states should shift to the primary blue with enough visual weight.
- Error states should be immediate, readable, and paired with helpful text.

## Motion Guidance

- Use short entrance and hover transitions for cards, buttons, and overlays.
- Keep motion purposeful and restrained.
- Avoid playful or overly bouncy effects for core recruitment workflows.

## Implementation Mapping

Use this document to drive Tailwind theme values or CSS variables.

Recommended mappings:

- Colors: expose the `colors` tokens as CSS variables in the root theme and mirror the most-used ones in Tailwind semantic aliases.
- Typography: map `display-lg`, `headline-lg`, `headline-md`, `body-lg`, `body-md`, `label-md`, and `label-sm` to reusable utility classes or component variants.
- Radius: map `sm`, `DEFAULT`, `md`, `lg`, and `xl` to the Tailwind border radius scale.
- Spacing: keep the 8px progression as the spacing baseline for layout and component padding.
- Shadows: define a light card shadow and a stronger overlay shadow in the design tokens or utility layer.

## Approved Assets

- Primary logo with background handling: data/resources/logo.png.
- Transparent logo asset: data/resources/logo-no-background.png.
- If a new logo export is introduced, register it in data/resources before use.

## Relationship To Exploration Files

- Root DESIGN.md is canonical.
- Files in data/stitch_design are reference explorations and historical design inputs.
- If a new exploration becomes the chosen direction, update this file rather than treating the exploration folder as active guidance.
