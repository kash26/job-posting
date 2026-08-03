# Reusable Agent Prompts

This folder contains reusable prompts and lightweight references for AI-assisted development in this repository.

## Files

- `agent_pre_prompt.md`: generic implementation prompt for most tasks.
- `agent_pre_prompt_frontend.md`: frontend-focused version with UI, responsiveness, and accessibility emphasis.
- `agent_pre_prompt_backend.md`: backend-focused version with API, validation, and security emphasis.
- `agent_post_prompt.md`: delivery and review prompt to summarize work and validation.
- `asset-manifest.md`: approved design assets and usage notes.

## Usage

1. Start from `agent_pre_prompt.md` or one of the specialized variants.
2. Paste the task-specific goal where the template expects it.
3. Keep `AGENTS.md`, `data/context.md`, and `DESIGN.md` as referenced sources of truth.
4. Finish with `agent_post_prompt.md` to force a consistent delivery summary.

## Rules

- Do not duplicate the full content of `AGENTS.md` in new prompts.
- Keep prompts implementation-oriented and project-specific.
- Update the canonical docs first when the product direction changes.
