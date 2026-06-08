# AGENTS.md

Guidance for Codex and other AI coding agents working on Doma.

## Project Identity

Doma is an open-source, privacy-first family planning app built with Expo, React Native, and TypeScript.

It is not a generic productivity tool. Keep the product calm, family-oriented, local-first, and easy to use in seconds.

## Source of Truth

Before making product or UX changes, read:

- `docs/PROJECT-INDEX.md`
- `docs/product-brief.md`
- `docs/design-system.md`
- `docs/screens.md`
- `docs/user-flows.md`
- `docs/privacy-notes.md`
- `docs/oss-roadmap.md`

If documents conflict, follow `docs/PROJECT-INDEX.md` first.

## Working Rules

- Prefer small, reviewable pull requests.
- Keep changes scoped to one milestone or issue.
- Do not introduce backend, auth, sync, notifications, or widgets unless the issue explicitly asks for it.
- Run `npm run typecheck` before marking work complete.
- Update docs when product behavior, data structures, privacy assumptions, or workflows change.
- Use existing project structure and theme tokens before adding new abstractions.

## Privacy Rules

- Do not add real family data, personal schedules, emails, invite links, access tokens, or private screenshots.
- Use demo data only.
- Keep logs, analytics examples, tests, and fixtures free of private content.
- Treat family data as sensitive even in examples.
- Do not add telemetry that tracks event titles, task titles, shopping item names, notes, emails, or invite tokens.

## Localization Rules

- Keep Russian and Polish localization synchronized.
- Do not add visible UI strings in one language only.
- Prefer `src/i18n` for UI copy.
- Keep demo names as user data, not translation keys.
- Follow terminology from `docs/localization.md`.

## Design Rules

- Use `src/theme/tokens.ts` for colors, spacing, radius, typography, shadows, and sizing.
- Preserve the warm, premium, iOS-first visual direction.
- Avoid corporate task-management language and dense productivity dashboards.
- Keep UI patterns consistent with `docs/design-system.md`.

## Testing and Verification

Add or update tests when changing:

- local state;
- reminders;
- recurrence;
- invitations;
- permissions;
- privacy-sensitive data handling;
- localization helpers;
- reusable components.

If a test runner is not yet available for the affected area, document the manual verification steps in the pull request.

## Pull Request Expectations

Every pull request should include:

- a short summary;
- linked issue or roadmap item when available;
- verification steps;
- screenshots for UI changes;
- privacy impact notes when relevant.

Do not mix broad refactors with feature work.

## Things to Avoid

- Do not turn Doma into a Trello, Jira, Notion, or Google Calendar clone.
- Do not add real production credentials or environment values.
- Do not publish private planning exports or chat history.
- Do not add large dependencies without explaining why they are needed.
- Do not rewrite unrelated code to satisfy stylistic preferences.
