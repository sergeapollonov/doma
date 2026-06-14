# Roadmap: extract reusable design system components

Labels: `roadmap`, `design-system`

## Summary

Extract repeated UI blocks into reusable components that use Doma design tokens.

## Context

The prototype currently keeps many UI blocks in the main app file. A public project should make contribution easier by separating reusable components from screen-specific layout.

## Suggested Components

- `Button`
- `Card`
- `Chip`
- `Input`
- `Avatar`
- `IconButton`
- `Screen`
- `Header`
- `TabBar`
- `EventCard`
- `TaskRow`
- `ShoppingItemRow`
- `ShoppingCategory`
- `AvatarGroup`

## Acceptance Criteria

- Components are typed.
- Components use `src/theme/tokens.ts`.
- Existing visual behavior is preserved.
- `npm run typecheck` passes.
