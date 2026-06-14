# Testing: expand CI beyond typecheck

Labels: `testing`, `developer experience`

## Summary

Add the next lightweight verification step after TypeScript checks.

## Context

The first CI workflow should run `npm ci` and `npm run typecheck`. The next step is to add tests for pure utility logic or extracted components once those files exist.

## Suggested Files

- `.github/workflows/ci.yml`
- `package.json`
- future test files under `src`

## Acceptance Criteria

- A test command is added only after a test runner is configured.
- CI remains fast and reliable.
- Tests do not require private data or network access.
- Documentation explains how to run checks locally.
