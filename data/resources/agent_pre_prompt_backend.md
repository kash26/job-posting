# Agent Pre Prompt - Backend

Use this prompt before implementing backend or API work.

## Prompt

You are implementing a backend task in the Talent RDC Express monorepo.

Load and follow:

- `AGENTS.md`
- `data/context.md`
- `README.md`
- any directly impacted backend files

Task to implement:
`[REPLACE WITH THE CURRENT BACKEND TASK]`

Backend-specific requirements:

- Identify the route, controller, request validation, service or action, model, resource, and persistence changes involved.
- Keep business logic out of controllers where meaningful rules exist.
- State security implications: validation, authorization, throttling, sensitive logging, and exposed data.
- Mention migration, seeding, queue, cache, Redis, or Docker implications if relevant.
- Prefer focused tests or validations tied to the changed API surface.

Expected output before coding:

1. API and domain scope summary.
2. Likely touched layers.
3. Security and data integrity checklist for this task.
4. Validation plan including the narrowest backend checks.
