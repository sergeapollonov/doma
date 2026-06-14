# Doma Design Fix Prompts

Этот файл содержит готовые промпты для Codex, Gemini Antigravity или другого coding agent.

GitHub repository: https://github.com/sergeapollonov/doma

Как использовать:

1. Открой агенту этот файл.
2. Напиши: `Выполни П1` или `Выполни П2`.
3. Агент должен выполнить только выбранный пункт, создать отдельную ветку, провести проверки, запушить ветку и подготовить PR description.

## Общие правила для всех пунктов

Перед любой задачей прочитай:

- `AGENTS.md`
- `README.md`
- `docs/PROJECT-INDEX.md`
- `docs/product-brief.md`
- `docs/design-system.md`
- `docs/screens.md`
- `docs/user-flows.md`
- `docs/definition-of-done.md`
- `src/theme/tokens.ts`
- `App.tsx`
- затронутые компоненты в `src/components`
- затронутые экраны в `src/screens`

Если доступны дизайн-скилы или браузерные инструменты, используй их для UI-задач:

- `impeccable`
- `design-taste-frontend`
- in-app Browser / Playwright / локальный web preview

Правила:

- Отвечай на русском.
- Работай только над выбранным пунктом.
- Не меняй backend, auth, sync, notifications, widgets или production credentials.
- Не меняй продуктовый scope.
- Не добавляй новые функции, если они не указаны в выбранном пункте.
- Не меняй тексты без необходимости.
- Не добавляй новые языки.
- Не редизайни приложение заново.
- Сохраняй теплое, premium, iOS-first направление Doma.
- Используй `src/theme/tokens.ts` для цветов, spacing, radius, typography, shadows и sizing.
- Не добавляй новые hardcoded цвета, если их можно вынести в токены.
- Не трогай `public-branch-kit/`.
- Делай маленький, reviewable PR.

Проверки для всех пунктов:

```bash
npm run typecheck
npm test
npm run verify:web
git diff --cached --check
rg -n "github_pat_|ghp_|password=|BEGIN .*PRIVATE|olgapuchowska|Puchowska|Ольга|Olga" README.md SECURITY.md docs App.tsx src package.json package-lock.json
```

Если задача меняет только документацию, можно не запускать `npm run verify:web`, но это нужно явно указать в отчете.

Формат финального ответа:

```md
Готово, П<N> завершен: <короткое описание>.

Branch: `<branch-name>`
PR: <pull request link или compare link>

Создано:
- `<file>`

Изменено:
- `<file>`: <что изменено>

Компоненты/экраны:
- <что затронуто>

Проверки:
- `npm run typecheck` passed
- `npm test` passed
- `npm run verify:web` passed
- `git diff --cached --check` passed
- privacy scan clean

Labels для PR: `<label-1>`, `<label-2>`

Description для PR:

<готовый markdown description>

Ограничения / follow-up:
- <если есть>
```

Если созданы git branch / commit / push, добавь служебные директивы Codex в самом конце финального ответа:

```text
::git-create-branch{cwd="/Users/olgapuchowska/Documents/Doma" branch="<branch-name>"}
::git-stage{cwd="/Users/olgapuchowska/Documents/Doma"}
::git-commit{cwd="/Users/olgapuchowska/Documents/Doma"}
::git-push{cwd="/Users/olgapuchowska/Documents/Doma" branch="<branch-name>"}
```

---

## П1. Рабочий формат для дизайн-итераций

Task: prepare the repository and workflow for the next design polish sequence.

Goal:
Confirm the current branch state, sync with `public/main`, and prepare to run the design polish tasks as separate PRs.

Tasks:

1. Check current git status.
2. Fetch `public/main`.
3. Confirm whether the current local branch has already been merged.
4. Do not change app code.
5. Report the recommended next design task.

Rules:

- Do not create a new branch unless code/docs need to change.
- Do not close issues automatically.
- Do not modify files unless a small documentation note is clearly needed.

Verification:

- If no files changed, no npm checks are required.
- If files changed, run `npm run typecheck` and `npm test`.

Report:

1. Current branch.
2. Whether local branch is clean.
3. Whether `public/main` is up to date.
4. Which design task should be done next.
5. Any warnings before continuing.

Labels for PR, if a PR is needed:

- `documentation`
- `developer experience`

Suggested branch, if needed:

- `docs/design-polish-plan-sync`

---

## П2. Fix mobile bottom safe-area overlap

Task: fix bottom tab overlap on mobile layouts only.

Context:
The visual review found that the floating bottom navigation can overlap content on Today, Calendar, Tasks, and Shopping screens. This is a P1 usability issue before backend work.

Read first:

- `docs/design-system.md`
- `docs/screens.md`
- `src/theme/tokens.ts`
- `App.tsx`
- `src/components/layout/TabBar.tsx`
- tab screen files under `src/screens/tabs`

Goal:
Ensure scrollable screen content always has enough bottom inset so the floating tab bar does not cover cards, empty states, buttons, or form entry points.

Tasks:

1. Inspect current App shell, scroll container, TabBar height, and safe-area handling.
2. Replace magic bottom padding with a token-based or clearly named layout constant.
3. Apply the fix consistently to Today, Calendar, Tasks, and Shopping.
4. Preserve existing visual design and navigation behavior.
5. Verify mobile viewport and desktop viewport.

Rules:

- Do not redesign the TabBar.
- Do not change tab labels.
- Do not change state logic.
- Do not add new screens.
- Do not add backend work.

Acceptance criteria:

- Bottom tab no longer overlaps content.
- Last visible content remains readable and reachable on mobile.
- Desktop layout is not degraded.
- No hardcoded new colors introduced.
- TypeScript passes.
- Unit tests pass.
- Web export passes.

Suggested branch:

- `design/fix-mobile-bottom-safe-area`

Labels for PR:

- `design`
- `frontend`
- `accessibility`

Description for PR:

```md
## Summary

Fixes mobile bottom safe-area spacing so floating bottom navigation no longer overlaps tab content.

## Changes

- Adjusts app scroll content bottom inset for the floating tab bar.
- Keeps the current TabBar visual treatment and app navigation behavior.
- Verifies Today, Calendar, Tasks, and Shopping remain readable in mobile viewport.

## Verification

- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run verify:web`
- [ ] `git diff --cached --check`
- [ ] privacy scan

## Scope

Design/layout fix only. No backend work, copy changes, data model changes, or navigation behavior changes.
```

---

## П3. Harden form layouts and field states

Task: improve form layout robustness without changing form behavior.

Context:
The design review found that the event form and sheet forms can feel cramped, especially with focused inputs and longer text values. This is a P1/P2 design hardening task.

Read first:

- `docs/design-system.md`
- `docs/definition-of-done.md`
- `src/theme/tokens.ts`
- `src/components/ui/Input.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/ModalSheet.tsx`
- `src/screens` files that render forms
- `src/validation/forms.ts`
- `src/i18n/index.ts`

Goal:
Make Login, Create Family, New Event, New Task, and New Shopping Item form layouts more resilient while preserving current validation, copy, and submit behavior.

Tasks:

1. Audit all five forms in mobile viewport.
2. Fix cramped spacing, clipped labels, overlapping focus states, and long value wrapping.
3. Ensure error text has stable spacing and does not shift layout harshly.
4. Ensure disabled and loading button states still look intentional.
5. Keep React Hook Form + Zod behavior unchanged.

Rules:

- Do not change validation rules.
- Do not change form fields.
- Do not change user-facing copy unless a string is already broken.
- Do not redesign the modal sheet.
- Do not add backend/auth.

Acceptance criteria:

- Focused inputs are readable and visually stable.
- Long text values do not break layout.
- Validation messages remain localized.
- Submit buttons preserve existing behavior.
- TypeScript passes.
- Unit tests pass.
- Web export passes.

Suggested branch:

- `design/harden-form-layouts`

Labels for PR:

- `design`
- `frontend`
- `accessibility`

Description for PR:

```md
## Summary

Hardens Doma form layouts so inputs, errors, and submit controls remain stable across mobile and desktop web previews.

## Changes

- Improves spacing and wrapping behavior for form fields.
- Keeps validation and submit behavior unchanged.
- Preserves existing localized copy and visual direction.

## Verification

- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run verify:web`
- [ ] `git diff --cached --check`
- [ ] privacy scan

## Scope

UI robustness only. No backend, auth, validation rule, or product scope changes.
```

---

## П4. Refine onboarding focus

Task: make onboarding more focused without changing the product flow.

Context:
The onboarding screen is visually strong, but the preview composition can distract from the primary first-time user decision. The screen should feel warm and premium, while making the next action obvious.

Read first:

- `docs/product-brief.md`
- `docs/design-system.md`
- `docs/screens.md`
- `docs/user-flows.md`
- `src/screens/onboarding/OnboardingScreen.tsx`
- `src/i18n/index.ts`
- `src/theme/tokens.ts`

Goal:
Improve first-screen clarity by strengthening the hierarchy of the onboarding title, supporting copy, and primary actions while preserving current visual direction.

Tasks:

1. Review onboarding screen in mobile and desktop viewport.
2. Reduce visual competition between preview content and primary action area.
3. Keep the screen warm, family-oriented, and iOS-first.
4. Preserve existing onboarding behavior and language switching.
5. Keep text unchanged unless a minor copy bug is found.

Rules:

- Do not add new onboarding steps.
- Do not remove language support.
- Do not add auth/backend.
- Do not replace the design with a generic landing page.
- Do not introduce new imagery unless already available in the project.

Acceptance criteria:

- Primary action is visually clearer.
- Preview content supports the screen instead of competing with it.
- Mobile viewport remains unclipped.
- Language switch still works.
- TypeScript passes.
- Unit tests pass.
- Web export passes.

Suggested branch:

- `design/refine-onboarding-focus`

Labels for PR:

- `design`
- `frontend`
- `onboarding`

Description for PR:

```md
## Summary

Refines onboarding hierarchy so the first-time user decision is clearer while preserving Doma's warm premium visual direction.

## Changes

- Rebalances onboarding layout hierarchy.
- Keeps existing onboarding flow, copy, and language behavior.
- Preserves the current family-oriented visual style.

## Verification

- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run verify:web`
- [ ] `git diff --cached --check`
- [ ] privacy scan

## Scope

Onboarding UI refinement only. No auth, backend, routing, or product-scope changes.
```

---

## П5. Refine product typography

Task: reduce decorative typography in working screens.

Context:
Doma's serif display style works well for brand moments, but the design review found that it may be overused inside working UI. Operational screens should stay warm but become easier to scan repeatedly.

Read first:

- `docs/design-system.md`
- `src/theme/tokens.ts`
- `src/components`
- `src/screens`
- `App.tsx`

Goal:
Reserve display typography for brand/high-emphasis moments and use more readable product typography in dense working areas.

Tasks:

1. Audit typography usage in Today, Tasks, Shopping, Calendar, forms, sheets, and onboarding.
2. Keep brand/display typography where it adds warmth.
3. Use more practical typography for compact cards, rows, inputs, labels, and repeated UI.
4. Update tokens or component usage only where needed.
5. Preserve visual direction and copy.

Rules:

- Do not change text content.
- Do not add new font dependencies unless absolutely necessary.
- Do not redesign layouts.
- Do not make the interface feel corporate or generic.

Acceptance criteria:

- Working screens are easier to scan.
- Brand warmth remains visible.
- Typography choices are token-driven.
- TypeScript passes.
- Unit tests pass.
- Web export passes.

Suggested branch:

- `design/refine-product-typography`

Labels for PR:

- `design`
- `frontend`

Description for PR:

```md
## Summary

Refines typography usage so Doma keeps its warm brand voice while making repeated working screens easier to scan.

## Changes

- Reserves display typography for high-emphasis brand moments.
- Uses practical product typography for compact cards, rows, inputs, and repeated UI.
- Keeps existing copy and product behavior unchanged.

## Verification

- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run verify:web`
- [ ] `git diff --cached --check`
- [ ] privacy scan

## Scope

Typography refinement only. No copy, navigation, backend, or feature changes.
```

---

## П6. Add action feedback states

Task: make local actions feel responsive and visible.

Context:
The current local alpha supports adding events, tasks, and shopping items, plus completing/reopening tasks and purchased/unpurchased shopping items. The design review found feedback states too subtle.

Read first:

- `docs/design-system.md`
- `docs/empty-error-states.md`
- `docs/user-flows.md`
- `src/state/appState.ts`
- `src/store/localAppStore.ts`
- `src/components/tasks`
- `src/components/shopping`
- `src/components/calendar`
- `src/screens/tabs`
- `src/i18n/index.ts`

Goal:
Improve visible feedback for completed tasks, purchased shopping items, and successful local additions without changing local state behavior.

Tasks:

1. Audit current visual states for completed tasks and purchased shopping items.
2. Make completed/purchased states clearer while keeping the premium calm style.
3. Add or improve lightweight success feedback for add actions if already supported by existing state flow.
4. Ensure all visible feedback text, if any is added, is localized.
5. Keep state logic and data model unchanged unless a tiny UI-state helper is required.

Rules:

- Do not add notifications.
- Do not add backend persistence.
- Do not add animation libraries.
- Do not change task/shopping domain behavior.
- Do not add new visible copy unless necessary.

Acceptance criteria:

- Completed task state is obvious.
- Purchased shopping item state is obvious.
- Add actions feel acknowledged.
- Feedback remains subtle and family-app appropriate.
- TypeScript passes.
- Unit tests pass.
- Web export passes.

Suggested branch:

- `design/add-action-feedback-states`

Labels for PR:

- `design`
- `frontend`
- `local-state`

Description for PR:

```md
## Summary

Improves visual feedback for local task and shopping actions so completed and purchased states are easier to recognize.

## Changes

- Strengthens completed task and purchased shopping item states.
- Keeps local state behavior unchanged.
- Preserves Doma's calm, premium visual direction.

## Verification

- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run verify:web`
- [ ] `git diff --cached --check`
- [ ] privacy scan

## Scope

UI feedback only. No backend, notifications, persistence, or domain behavior changes.
```

---

## П7. Improve accessibility semantics

Task: improve accessibility semantics for interactive UI.

Context:
The design review found that many interactive elements need clearer accessibility roles, labels, and states. This should be handled before backend work because it affects component foundations.

Read first:

- `docs/design-system.md`
- `docs/definition-of-done.md`
- `src/components/ui`
- `src/components/layout`
- `src/components/tasks`
- `src/components/shopping`
- `src/components/calendar`
- `src/screens`
- `src/i18n/index.ts`

Goal:
Add or improve accessibility roles, labels, hints, and selected/checked/disabled states for core interactive components.

Tasks:

1. Audit buttons, icon buttons, tab bar items, task rows, shopping rows, calendar days, chips, inputs, and modal sheets.
2. Add accessibility labels/hints/states where missing.
3. Keep labels localized where user-visible or language-dependent.
4. Ensure touch targets remain stable.
5. Do not change visual design except tiny spacing fixes needed for touch target quality.

Rules:

- Do not redesign components.
- Do not change app behavior.
- Do not add new accessibility packages unless necessary.
- Do not add backend/auth.

Acceptance criteria:

- Tab items expose selected state.
- Task and shopping toggles expose checked state.
- Disabled controls expose disabled state.
- Icon-only controls have labels.
- Inputs have meaningful labels.
- TypeScript passes.
- Unit tests pass.
- Web export passes.

Suggested branch:

- `design/improve-accessibility-semantics`

Labels for PR:

- `accessibility`
- `design`
- `frontend`

Description for PR:

```md
## Summary

Improves accessibility semantics for Doma's core interactive components.

## Changes

- Adds roles, labels, hints, and state metadata to reusable controls.
- Improves accessibility for tabs, icon buttons, inputs, task rows, shopping rows, and calendar days.
- Keeps visual design and behavior unchanged.

## Verification

- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run verify:web`
- [ ] `git diff --cached --check`
- [ ] privacy scan

## Scope

Accessibility semantics only. No backend, navigation, data model, or feature changes.
```

---

## П8. Consolidate visual tokens

Task: reduce hardcoded visual values by consolidating tokens.

Context:
The design review found that some translucent colors, shadows, and layout values may still be hardcoded in components/screens. Doma should rely on the theme system before backend work.

Read first:

- `docs/design-system.md`
- `src/theme/tokens.ts`
- `App.tsx`
- `src/components`
- `src/screens`

Goal:
Move repeated visual constants into `src/theme/tokens.ts` or existing local theme helpers, without changing the visible design.

Tasks:

1. Search for hardcoded colors, alpha colors, shadows, radius, and repeated spacing values.
2. Move repeated values into tokens when they represent design system decisions.
3. Leave one-off geometry alone if tokenizing it would add noise.
4. Update components/screens to use tokens.
5. Preserve the current visual appearance.

Rules:

- Do not redesign UI.
- Do not rename tokens broadly unless necessary.
- Do not refactor unrelated code.
- Do not add a new theme library.
- Do not change copy or behavior.

Acceptance criteria:

- No obvious repeated hardcoded colors remain in touched UI.
- Token names are understandable.
- Visual appearance remains the same or nearly the same.
- TypeScript passes.
- Unit tests pass.
- Web export passes.

Suggested branch:

- `design/consolidate-visual-tokens`

Labels for PR:

- `design`
- `frontend`
- `developer experience`

Description for PR:

```md
## Summary

Consolidates repeated visual constants into Doma theme tokens.

## Changes

- Moves repeated colors, spacing, and layout values into `src/theme/tokens.ts`.
- Updates touched components to use shared tokens.
- Preserves the current visual design.

## Verification

- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run verify:web`
- [ ] `git diff --cached --check`
- [ ] privacy scan

## Scope

Design-system cleanup only. No UI redesign, copy changes, backend work, or product behavior changes.
```

---

## П9. Final alpha polish pass

Task: perform a final visual polish pass after P2-P8 are merged.

Context:
This task should run only after the targeted design fixes are complete. It is for small inconsistencies, not broad redesign.

Read first:

- `docs/design-system.md`
- `docs/screens.md`
- `docs/definition-of-done.md`
- `src/theme/tokens.ts`
- `src/components`
- `src/screens`
- `App.tsx`

Goal:
Polish remaining visual inconsistencies across the public alpha so screens feel coherent and ready for the next milestone.

Tasks:

1. Review Onboarding, Login, Family Setup, Invite, Today, Calendar, Tasks, Shopping, Quick Add, and all form sheets.
2. Fix small spacing, alignment, clipping, state, and rhythm inconsistencies.
3. Keep changes minimal and coherent.
4. Update tokens only if a repeated polish value needs to become system-level.
5. Capture screenshots or describe visual verification.

Rules:

- Do not introduce new features.
- Do not redesign whole screens.
- Do not change copy unless fixing a clear typo.
- Do not change backend/auth/sync scope.
- Do not add large dependencies.

Acceptance criteria:

- Screens feel visually consistent.
- No obvious mobile clipping or overlap remains.
- No obvious broken typography remains.
- Web export passes.
- TypeScript passes.
- Unit tests pass.

Suggested branch:

- `design/final-alpha-polish-pass`

Labels for PR:

- `design`
- `frontend`
- `polish`

Description for PR:

```md
## Summary

Applies a final visual polish pass across the Doma public alpha screens.

## Changes

- Fixes small spacing, alignment, clipping, and rhythm inconsistencies.
- Keeps existing product behavior and visual direction.
- Verifies core onboarding and tab flows after prior design fixes.

## Verification

- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run verify:web`
- [ ] `git diff --cached --check`
- [ ] privacy scan

## Scope

Small visual polish only. No backend, product scope, navigation, or data model changes.
```

---

## П10. Final post-fix design review

Task: perform a final design review after all design fix PRs are merged.

Context:
This is a review-only task unless the agent finds a small critical issue that can be safely fixed.

Read first:

- `README.md`
- `docs/product-brief.md`
- `docs/design-system.md`
- `docs/screens.md`
- `docs/user-flows.md`
- `docs/definition-of-done.md`
- `src/theme/tokens.ts`
- `src/components`
- `src/screens`
- `App.tsx`

Goal:
Evaluate whether the Doma public alpha visual layer is ready for the next backend/Supabase foundation milestone.

Tasks:

1. Run the app or web export preview.
2. Review mobile and desktop viewports.
3. Check onboarding, login, family setup, invite, Today, Calendar, Tasks, Shopping, Quick Add, and form sheets.
4. Evaluate:
   - visual hierarchy;
   - mobile safety;
   - form readability;
   - action feedback;
   - accessibility semantics;
   - token consistency;
   - brand fit.
5. Do not write code unless a small critical issue blocks readiness.

Output format:

```md
# Doma Design Readiness Review

## 1. Current design status

## 2. What is ready

## 3. What still needs work

## 4. Blocking issues before backend

## 5. Non-blocking issues

## 6. Recommendation

## 7. Exact next task prompt
```

Verification:

- `npm run typecheck`
- `npm test`
- `npm run verify:web`

Suggested branch, only if code changes are required:

- `design/final-readiness-fixes`

Labels for PR, only if code changes are required:

- `design`
- `frontend`
- `polish`

---

## Recommended order

1. `П1` - sync and confirm starting point.
2. `П2` - fix bottom tab overlap.
3. `П3` - harden form layouts.
4. `П4` - refine onboarding focus.
5. `П5` - refine product typography.
6. `П6` - add action feedback states.
7. `П7` - improve accessibility semantics.
8. `П8` - consolidate visual tokens.
9. `П9` - final alpha polish pass.
10. `П10` - final post-fix design review.

Most important before backend:

- `П2`
- `П3`
- `П7`
