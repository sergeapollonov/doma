# Roadmap: prepare Doma public alpha

Labels: `roadmap`, `alpha`, `documentation`

## Summary

Prepare the repository for the first public alpha milestone.

## Context

Doma is currently an early-stage Expo/React Native app with strong product documentation and visual references. Before inviting external contributors, the repository should be safe, understandable, and easy to verify.

## Tasks

- Add public README.
- Add LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, and MAINTAINERS files.
- Add GitHub Actions CI.
- Add issue and PR templates.
- Remove private/local-only files from the public branch.
- Add `docs/oss-roadmap.md`.

## Acceptance Criteria

- `npm run typecheck` passes.
- CI passes on GitHub.
- Public branch does not include `chat_history`, `old`, `zip`, `.DS_Store`, or `.trashed-*`.
- README explains status, setup, docs, and contribution areas.
