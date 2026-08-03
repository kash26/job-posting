Product Requirements Document (PRD) for Talent RDC Express.

This document synthesizes everything we've established so far:

## Project Context

## Product Summary
Talent RDC Express is a job platform focused on connecting candidates in the Democratic Republic of Congo with local and international employers through a modern, trustworthy, mobile-friendly experience.

## Product Goal
Build a recruitment platform that makes job discovery, application tracking, and candidate presentation feel fast, credible, and easy to use on both desktop and mobile.

## Primary Users
- Candidates looking for jobs, internships, and career growth opportunities.
- Recruiters and employers are part of the future scope, but the current product direction is candidate-first.

## Current Scope
- Landing page with strong value proposition and job search entry points.
- Job listings with filters, tags, and pagination.
- Job detail page with clear requirements, salary, company context, and prominent apply actions.
- Candidate dashboard for applications, interviews, and profile visibility.
- Candidate profile page for professional presentation.

## Future Scope
- Employer portal for posting jobs and managing applicants.
- Premium services such as curated placement or recruiter access.

## Canonical Design Direction
- Official design source: root DESIGN.md.
- Brand name: Talent RDC Express.
- Primary visual direction: vibrant enterprise aesthetic with a professional technology feel.
- Primary color: #2563EB.
- Primary typeface: Hanken Grotesk.
- Approved logo assets: data/resources/logo.png and data/resources/logo-no-background.png.

## Technical Stack
- Frontend: Next.js with TypeScript and Tailwind CSS.
- Backend: Laravel API with MySQL and Redis.
- Local orchestration: Docker Compose with separated front and back services.
- Frontend deployment target: Vercel.

## Non-Negotiable Delivery Rules
- Follow AGENTS.md for quality, responsive behavior, accessibility, architecture, security, and pre-commit expectations.
- Validate responsive behavior at minimum on 375px, 768px, 1024px, and 1440px.
- Prefer reusable UI components, hooks, and centralized API access layers.
- Keep business logic out of presentation components and controllers.

## Source Of Truth Files
- Product and delivery rules: AGENTS.md.
- Product context: data/context.md.
- Official design guidance: DESIGN.md.
- Design exploration archive: data/stitch_design/.
- Project setup and local run instructions: README.md.

## Explicitly Out Of Scope
- Duplicating AGENTS.md content inside feature prompts.
- Treating design exploration artifacts as canonical implementation guidance.
- Introducing new visual directions without updating DESIGN.md.

I Would you like to expand on specific section, such as the Employer Portal requirements, or shall we continue refining the existing screens
