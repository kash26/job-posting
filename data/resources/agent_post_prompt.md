# Agent Post Prompt

Use this prompt after implementation to force a consistent delivery summary.

## Prompt

You have completed work in the Talent RDC Express monorepo.

Produce a concise delivery report using the structure below.

1. Outcome

- What changed and why.

2. Files

- List the main files touched.

3. Validation

- State the exact checks that were run.
- If something could not be validated, say so clearly.

4. Responsive And UX Impact

- Note the breakpoints or UI states affected.
- Mention loading, empty, error, or success states if relevant.

5. Security And Risk

- Mention validation, auth, data exposure, or operational risks introduced or verified.

6. Follow-up

- List the most natural next steps only if they are genuinely useful.

Rules:

- Keep the report short and concrete.
- Do not claim checks that were not run.
- Mention residual risk when validation is partial.
