---
name: Professional Trust Interface
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#40484f'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#707880'
  outline-variant: '#c0c7d0'
  surface-tint: '#006496'
  primary: '#004d75'
  on-primary: '#ffffff'
  primary-container: '#006699'
  on-primary-container: '#bfe0ff'
  inverse-primary: '#90cdff'
  secondary: '#566064'
  on-secondary: '#ffffff'
  secondary-container: '#dae4e9'
  on-secondary-container: '#5c666a'
  tertiary: '#004d73'
  on-tertiary: '#ffffff'
  tertiary-container: '#29658c'
  on-tertiary-container: '#bce0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#90cdff'
  on-primary-fixed: '#001e31'
  on-primary-fixed-variant: '#004b72'
  secondary-fixed: '#dae4e9'
  secondary-fixed-dim: '#bec8cd'
  on-secondary-fixed: '#141d21'
  on-secondary-fixed-variant: '#3f484c'
  tertiary-fixed: '#cae6ff'
  tertiary-fixed-dim: '#96ccf9'
  on-tertiary-fixed: '#001e30'
  on-tertiary-fixed-variant: '#004b70'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
  background-surface: '#F8FAFB'
  border-subtle: '#E1E8ED'
  text-heading: '#1A1A1A'
  success-accent: '#28A745'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
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
  container-max-width: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is engineered for a high-trust recruitment ecosystem, bridging the gap between talent and opportunity with a sense of stability and professional momentum. The target audience includes both corporate HR professionals and ambitious job seekers, requiring a balance of rigorous efficiency and accessible encouragement.

The design style is **Corporate / Modern**, leaning heavily into high-functioning minimalism. It utilizes a vast amount of whitespace to reduce cognitive load during complex tasks like job application or candidate screening. The interface communicates "reliability" through a structured grid, precise alignment, and a sophisticated blue-led palette. The overall emotional response should be one of clarity, professionalism, and institutional strength.

## Colors

The palette is anchored by a deep **Professional Blue (#006699)**, chosen for its psychological association with intelligence and trust. 

- **Primary Blue:** Used for call-to-action buttons, active states, and brand-critical iconography.
- **Secondary Tint:** A very soft, desaturated blue used for subtle backgrounds, hover states, and informational chips to maintain a tonal connection to the brand without overwhelming the eye.
- **Neutral Grays:** We use a tiered gray scale to establish a clear content hierarchy. Pure black is avoided for body text in favor of `#1A1A1A` and `#666666` to reduce eye strain and improve reading endurance.
- **Background:** The primary workspace uses a slightly off-white `#F8FAFB` to distinguish card elements (which are pure white) from the page architecture.

## Typography

This design system utilizes a dual-font strategy to maximize both character and utility.

**Hanken Grotesk** is used for headlines. Its sharp, contemporary geometry provides a modern tech-forward feel that remains highly professional. 
**Inter** is the workhorse for body copy and UI labels. It was chosen for its exceptional legibility in data-heavy environments, such as job descriptions and application dashboards.

Scale is used to create an immediate visual path for the user. Large, bold headlines anchor page sections, while tight, uppercase labels are reserved for status indicators (e.g., "URGENT", "CLOSED").

## Layout & Spacing

The layout follows a **Fixed Grid** approach for desktop views to ensure content density remains comfortable on wide monitors, centering the information within a 1200px container.

- **Grid:** A 12-column grid is used for desktop, 8 columns for tablet, and 4 columns for mobile.
- **Rhythm:** An 8px linear scale governs all padding and margins. This ensures mathematical harmony between unrelated components.
- **Job Cards:** On job listing pages, cards should utilize a consistent `24px` gutter to provide enough visual "breathing room," preventing the list from feeling cluttered or overwhelming.
- **Mobile Reflow:** Content stacks vertically on mobile, with margins reduced to `16px` to maximize screen real estate for job title and company information.

## Elevation & Depth

Depth is achieved through **Tonal Layers** supplemented by **Ambient Shadows**. This approach creates a "physical" feel that guides the user's focus without the jarring nature of high-contrast borders.

- **Level 0 (Base):** The main background (`#F8FAFB`).
- **Level 1 (Surface):** Cards, input fields, and containers are pure white (`#FFFFFF`). They use a very soft, highly diffused shadow (Color: `Primary Blue` at 5% opacity, Blur: 10px, Y-Offset: 4px).
- **Level 2 (Hover/Action):** Active cards or buttons utilize a slightly more pronounced shadow (10% opacity) to signify interactability.
- **Outlines:** Subtle `1px` borders in `#E1E8ED` are used on input fields to define boundaries without adding visual weight.

## Shapes

The shape language is defined as **Rounded**, striking a balance between the clinical feel of sharp corners and the overly casual feel of pill shapes.

Standard UI components like buttons and cards use a `0.5rem (8px)` radius. Larger containers or hero sections may scale up to `1rem (16px)` to feel more approachable. This consistent rounding softens the "corporate" aesthetic, making the recruitment process feel more human-centric while maintaining its professional edge.

## Components

### Buttons
Primary buttons use the brand blue with white text. Secondary buttons use a transparent background with a blue border. Buttons have a height of 48px for primary actions to ensure they are "touch-friendly" and prominent.

### Chips
Used for job categories or skill tags. They use the `Secondary Tint` background with `Primary Blue` text. These have a smaller radius (`4px`) to distinguish them from larger interactive buttons.

### Input Fields
Fields feature a subtle `#E1E8ED` border and a 16px horizontal padding. On focus, the border transitions to `Primary Blue` with a soft glow (box-shadow).

### Job Cards
The primary component for the platform. Cards must have a white background, the standard `8px` roundedness, and a subtle ambient shadow. Information is structured with the job title in `headline-md` and company details in `body-sm`.

### Lists
Candidate and job lists should use dividers in `#E1E8ED` only if the cards do not have shadows. Preference is for shadowed cards on a neutral background to create separation.

### Checkboxes & Radios
Custom-styled to match the primary blue. When selected, they should have a clear, high-contrast mark to ensure accessibility.