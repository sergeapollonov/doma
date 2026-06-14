# Public Branch Checklist

This folder contains files prepared for a future public branch of Doma.

## Copy Into Public Branch

Copy these files and folders to the repository root:

- `README.md`
- `LICENSE`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `SECURITY.md`
- `MAINTAINERS.md`
- `.gitignore`
- `.github/`
- `docs/oss-roadmap.md`
- `docs/issue-drafts/`

## Remove From Public Branch

Do not include:

- `chat_history/`
- `old/`
- `zip/`
- `docs/.trashed-*`
- `.DS_Store`
- local tokens or credentials

## Recommended Public Branch Steps

1. Create a new branch from `main`.
2. Remove private/local-only folders.
3. Copy the files from this kit into the repository root.
4. Run `npm run typecheck`.
5. Commit with `Prepare public OSS repository`.
6. Push the branch.
7. Open a pull request into `main` or set the public branch as needed.

## GitHub Setup

After the files are merged:

- enable GitHub Actions;
- enable Dependabot alerts;
- enable private vulnerability reporting;
- create issue labels listed in `docs/issue-drafts/LABELS.md`;
- create the issue drafts from `docs/issue-drafts`;
- add repository topics:
  - `expo`
  - `react-native`
  - `typescript`
  - `offline-first`
  - `privacy-first`
  - `family-planning`
  - `localization`
