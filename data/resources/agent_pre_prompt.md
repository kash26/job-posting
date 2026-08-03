# Agent Pre Prompt

Use this prompt before starting implementation work in this repository.

## Prompt

You are implementing work in the Talent RDC Express monorepo.

Before making changes, load and follow these source-of-truth documents:

- `AGENTS.md`
- `data/context.md`
- `DESIGN.md`
- `README.md`

Task to implement:
`[REPLACE WITH THE CURRENT TASK]`

Execution requirements:

- Restate the scope in one short paragraph.
- Identify the files or modules most likely to change.
- State backend, frontend, Docker, data model, and API implications if any apply.
- Call out responsive, accessibility, and security requirements relevant to this task.
- Avoid broad exploration after the controlling code path is identified.
- Implement the smallest coherent change set that satisfies the task.
- Validate the result with the narrowest meaningful checks available.

Expected output before coding:

1. Scope summary.
2. Constraints pulled from the source-of-truth files.
3. Likely touched files.
4. Validation plan.

Expected behavior during implementation:

- Reuse existing patterns before introducing new abstractions.
- Keep frontend logic split between UI, hooks, and API layers.
- Keep backend logic out of controllers when business rules are involved.
- Preserve design consistency with the official root `DESIGN.md`.
- Ensure mobile behavior remains usable at 375px.
