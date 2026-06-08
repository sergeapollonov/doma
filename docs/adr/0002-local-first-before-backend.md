# ADR 0002: Build Local-First Behavior Before Backend Sync

Status: Accepted
Date: 2026-06-08

## Context

Doma is a household planning app. The long-term product needs authentication, family membership, shared calendars, reminders, realtime updates, and secure data isolation.

Those features require backend work, but the public alpha is still validating the mobile product shape, data model, and daily workflows. Adding backend complexity too early would make contribution harder and increase privacy risk before the local app behavior is stable.

## Decision

Doma will build local-first product behavior before shared backend sync.

The near-term implementation should prioritize:

- deterministic mock data;
- typed local models;
- local state for events, tasks, shopping items, language, and selected date;
- clear boundaries between UI state, domain data, and future server state;
- TypeScript checks in CI.

Backend sync will be introduced after local flows are usable and privacy rules are documented.

## Consequences

Contributors can run and improve the app without production credentials.

Product behavior can be reviewed through small PRs before Supabase, Row Level Security, invites, and realtime sync are added.

The data model still needs to remain compatible with future family-scoped backend tables.

## Follow-up

- Track local state work in the local-state milestone.
- Add tests around domain models before replacing mock data with server data.
- Document backend boundaries before adding Supabase credentials or migrations.
