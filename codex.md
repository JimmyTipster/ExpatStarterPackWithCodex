# Codex Memory

## Project

- Name: Expat Starter Pack
- Domain target: `expatstarterpack.com`
- Current implementation status: Phase 1 completed, Phase 2 completed

## What Was Done

### Phase 1

- Bootstrapped a Next.js 15 App Router project in the repo root.
- Installed core dependencies and shadcn/ui foundations.
- Added branded layout, navigation, mobile bottom nav, footer, dark mode toggle, theme tokens, and homepage shell.
- Added placeholder routes for main navigation paths.
- Added Supabase-safe browser/server client wrappers and auth-refresh middleware.
- Added persisted Zustand `UserProfile` store.
- Added utility helpers for EU logic, dates, platform detection, and `cn`.
- Added `.env.local.example`.
- Updated `README.md` for local setup.
- Verified with:
  - `npm.cmd run lint`
  - `npm.cmd run build`

### Phase 2

- Re-read `part1.txt`, `part2.txt`, and `part3.txt` before continuing.
- Added full shared data interfaces in `src/data/types.ts`.
- Added task category definitions in `src/data/categories.ts`.
- Added checklist generator in `src/lib/checklist/generator.ts`.
- Added country registry and Fuse-based search in `src/data/countries/index.ts`.
- Added first real country dataset in `src/data/countries/germany.ts`.
- Updated homepage and countries page to use the real country registry.
- Updated dynamic country route to load real country data and statically pre-generate known slugs.
- Verified again with:
  - `npm.cmd run lint`
  - `npm.cmd run build`

## Important Repo Notes

- On this Windows setup, use `npm.cmd` and `npx.cmd`, not plain `npm` or `npx`, because PowerShell script execution can block the `.ps1` shims.
- Some build commands needed escalation outside the sandbox because of Windows spawn/permission behavior.
- `part1.txt`, `part2.txt`, and `part3.txt` remain in the repo root intentionally as planning references.
- The text files show encoding artifacts like `â€”`, but their intent is still clear and they have already been rechecked.

## Current Data Layer Direction

- Germany is the template country for the rest of the rollout.
- The checklist engine filters by:
  - audience
  - EU/EEA free-movement logic
  - origin-specific rules
- Current country registry only includes:
  - `germany`

## What Needs To Happen Next

### Immediate next phase target

- Phase 3: build the onboarding wizard at `src/app/wizard/page.tsx` with:
  - `WizardLayout.tsx`
  - `StepDestination.tsx`
  - `StepOrigin.tsx`
  - `StepAboutYou.tsx`
  - `StepEmployment.tsx`
  - `StepPriorities.tsx`

### Expectations for Phase 3

- Use the existing Zustand `UserProfile` store instead of inventing a new profile source.
- Use the real country registry for destination and nationality selection.
- Auto-calculate EU citizen state from the chosen nationality.
- Persist wizard progress to localStorage through Zustand.
- Redirect completion to `/country/[destinationSlug]`.
- Keep the UI mobile-first and aligned with the existing warm editorial visual system.

### After Phase 3

- Phase 4 should replace the country placeholder page with the real 19-tab country experience using Germany as the first fully rendered country.

## Files To Remember

- `src/stores/userProfileStore.ts`
- `src/data/types.ts`
- `src/data/categories.ts`
- `src/data/countries/index.ts`
- `src/data/countries/germany.ts`
- `src/lib/checklist/generator.ts`
- `src/app/wizard/page.tsx`
- `src/app/country/[slug]/page.tsx`
