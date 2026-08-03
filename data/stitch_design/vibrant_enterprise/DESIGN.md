---
name: Vibrant Enterprise
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#525657'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b6e70'
  on-tertiary-container: '#eff1f3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
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

## Brand & Style

This design system is built for high-growth SaaS and professional networking platforms. It balances corporate reliability with a modern, energetic pulse. The aesthetic is **Corporate / Modern** but elevated through the use of subtle depth and geometric patterns. 

The primary goal is to evoke a sense of "Dynamic Professionalism"—a UI that feels stable enough for enterprise data but vibrant enough to signal innovation and forward momentum. We achieve this through crisp edges, high-quality typography, and a deliberate move away from flat surfaces toward layered, textured backgrounds.

## Colors

The palette is anchored by a **Vibrant Blue** (#2563EB) extracted from the core brand identity, serving as the primary driver for actions and highlights. 

To add professional depth, background surfaces (Surface and Surface-Container) are no longer flat. They utilize a very subtle linear gradient or a faint geometric "mesh" pattern using a slightly darker neutral tint.
- **Primary:** High-saturation blue for buttons, active states, and brand-critical elements.
- **Surface:** A soft gradient from #F8FAFC to #F1F5F9 to create a sense of environmental depth.
- **On-Surface:** Use deep slate (#0F172A) for maximum legibility in text.

## Typography

This design system uses **Hanken Grotesk** exclusively to maintain a cohesive, sharp, and modern appearance. The hierarchy is refined through a "Heavy Top" approach:
- **Headlines:** Use Bold (700) or ExtraBold (800) weights with tighter letter-spacing to command attention.
- **Body Text:** Use Regular (400) for long-form reading to maintain breathability.
- **Interactive Labels:** Use SemiBold (600) to distinguish clickable elements from static metadata.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a maximum container width of 1280px to ensure readability on ultra-wide monitors.
- **Desktop:** 12-column grid, 24px gutters, and 40px outer margins.
- **Tablet:** 8-column grid, 16px gutters, and 24px outer margins.
- **Mobile:** 4-column grid, 16px gutters, and 16px outer margins.

Spacing follows an 8px geometric progression (8, 16, 24, 32, 48, 64) to maintain mathematical harmony across the UI.

## Elevation & Depth

To move away from flat design, this system employs **Tonal Layering** combined with **Ambient Shadows**.
- **Level 0 (Base):** Subtle background patterns or gradients.
- **Level 1 (Cards/Containers):** Pure white background with a 1px border (#E2E8F0) and a soft, highly diffused shadow (0px 4px 20px rgba(15, 23, 42, 0.05)).
- **Level 2 (Dropdowns/Modals):** Increased shadow spread and depth to signify immediate priority over the base layer.

## Shapes

The system adopts a **Rounded** aesthetic with an 8px base radius.
- **Buttons & Inputs:** 8px (standard).
- **Cards:** 12px or 16px (rounded-lg/xl) to create a softer, more approachable container for content.
- **Tags/Chips:** Fully pill-shaped to contrast against the structured grid of the cards.

## Components

### Headers
1. **Guest State:** Features a clean navigation menu on the left/center, with a distinct "Log In" (ghost button) and "Sign Up" (filled primary button) pairing on the right.
2. **Authenticated State:** Replaces authentication buttons with a notification bell icon, a search shortcut, and a circular user profile avatar with a dropdown chevron.

### Footer
A robust, 4-column footer on a dark slate background (#0F172A):
- **Column 1:** Brand logo and a brief value proposition.
- **Column 2 & 3:** Sitemaps (Product, Company, Resources) using `label-md` for headers and `body-md` for links.
- **Column 4:** Newsletter signup with a single-field input and icon-only submit button, plus social media icon links (LinkedIn, Twitter, GitHub).

### Buttons
- **Primary:** Filled #2563EB with white text.
- **Secondary:** Light blue tint background with #2563EB text.
- **Outline:** 1px border with #64748B text for tertiary actions.

### Cards & Inputs
Inputs use a white background with a subtle gray border, transitioning to a 2px primary blue border on focus. Cards should always use the `Level 1` elevation style.