# Security Policy

## Supported Versions

Doma is currently in early alpha. Security fixes are handled on the default branch until the first public release is tagged.

| Version | Supported |
|---|---|
| main | Yes |
| pre-release branches | Best effort |

## Reporting a Vulnerability

Please do not open public issues for security vulnerabilities.

Use GitHub private vulnerability reporting if it is enabled for this repository. If it is not enabled, contact the maintainer through GitHub and share only the minimum information needed to establish a private reporting path.

## What to Report

Please report:

- credential leaks;
- dependency vulnerabilities with practical impact;
- unsafe handling of family or user data;
- privacy leaks in logs, analytics, test fixtures, or screenshots;
- insecure authentication or authorization logic once backend work begins;
- accidental exposure of invite tokens or sync data.

## Privacy-Sensitive Data

Do not include real family schedules, names, emails, medical details, school details, shopping history, or private screenshots in a public issue or pull request.

Use the demo data in the repository.

## Current Security Scope

The project does not yet include production authentication, backend sync, push notifications, or native widgets. Security review will expand as those areas are implemented.

Current focus:

- repository hygiene;
- dependency safety;
- privacy-safe mock data;
- no secrets in source control;
- safe documentation and issue examples.
