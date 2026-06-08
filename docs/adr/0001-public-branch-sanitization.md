# ADR 0001: Publish a Sanitized Public Branch

Status: Accepted
Date: 2026-06-08

## Context

Doma started as a private product and design workspace. The private workspace may contain planning notes, chat exports, screenshots, archived experiments, and other materials that are useful locally but should not become part of the public repository.

The public repository should be safe for open-source contributors and understandable without private context.

## Decision

Doma will publish a sanitized public branch instead of pushing the full private working tree.

The public branch may include:

- app source needed to run and inspect the alpha;
- sanitized documentation;
- sanitized design references;
- public icon assets;
- issue templates, contribution docs, and CI configuration;
- mock data that does not identify real people or households.

The public branch must not include:

- `chat_history/`;
- private planning exports;
- local archives;
- trashed files;
- real family names, emails, tokens, or private screenshots;
- secrets, credentials, or local environment files.

## Consequences

Maintainers can iterate publicly without exposing private source material.

Contributors should treat `README.md`, `docs/PROJECT-INDEX.md`, and the documented design/product files as the source of truth. Private chat history is not required to contribute.

The public branch may not contain every historical decision. Decisions that matter for contributors should be moved into docs or ADRs.

## Follow-up

- Keep the public branch checklist current.
- Run a privacy scan before public releases.
- Add ADRs when private planning context needs to become public project context.
