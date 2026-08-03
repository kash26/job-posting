# Agent Pre Prompt - Frontend

Use this prompt before implementing frontend or design-heavy work.

## Prompt

You are implementing a frontend task in the Talent RDC Express monorepo.

Load and follow:

- `AGENTS.md`
- `data/context.md`
- `DESIGN.md`
- any directly impacted frontend files

Task to implement:
`[REPLACE WITH THE CURRENT FRONTEND TASK]`

Frontend-specific requirements:

- Maintain the visual direction defined in `DESIGN.md`.
- Name the responsive states that matter for this task: 375px, 768px, 1024px, 1440px.
- Describe loading, empty, error, and success states when the screen is data-driven.
- Keep accessibility explicit: focus states, labels, contrast, keyboard navigation.
- Prefer reusable components and predictable layout patterns over page-specific hacks.
- Mention any API contract the UI depends on.

Expected output before coding:

1. UI scope summary.
2. Affected pages or components.
3. Responsive and accessibility checklist for this task.
4. Validation plan including the narrowest frontend checks.
