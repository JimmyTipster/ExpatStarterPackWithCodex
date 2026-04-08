# Codex Memory

## Project

- Name: Expat Starter Pack
- Domain target: `expatstarterpack.com`
- Current implementation status: core web phases 1 through 10 are implemented
- Platform direction: web-first only for now; Capacitor was removed and deferred until later

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

### Phase 3

- Re-checked the wizard requirements in `part3.txt` before implementation.
- Replaced the `/wizard` placeholder with a real 5-step onboarding flow.
- Added shared wizard UI in:
  - `src/components/wizard/WizardLayout.tsx`
  - `src/components/wizard/CountrySearchField.tsx`
  - `src/components/wizard/WizardChoiceCard.tsx`
- Added the five step components:
  - `src/components/wizard/StepDestination.tsx`
  - `src/components/wizard/StepOrigin.tsx`
  - `src/components/wizard/StepAboutYou.tsx`
  - `src/components/wizard/StepEmployment.tsx`
  - `src/components/wizard/StepPriorities.tsx`
- Added `src/components/wizard/WizardFlow.tsx` to:
  - drive the multi-step state
  - validate inputs
  - animate transitions with Framer Motion
  - persist everything through the existing Zustand store
  - show a success screen
  - redirect to `/country/[destinationSlug]`
- Added `src/lib/countries/reference.ts` so origin, nationality, and driver-license pickers can use a broad ISO country list even though the supported destination registry currently only contains Germany.
- Kept destination selection tied to the real supported-country registry, so the wizard only routes to valid country pages.
- Added best-effort Supabase profile syncing on completion when auth and env config are present.
- Updated the country placeholder CTA text to reflect that the wizard is now live.
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
- The onboarding wizard now uses:
  - supported destination countries from `src/data/countries/index.ts`
  - reference ISO country options from `src/lib/countries/reference.ts` for origin-related searches

## What Needs To Happen Next

### Immediate next phase target

- Phase 4: replace the country placeholder page with the real 19-section country experience for Germany first.

### Expectations for Phase 4

- Build the first actual country page at `src/app/country/[slug]/page.tsx`.
- Add:
  - `CountryHeader`
  - `ProfileBanner`
  - `SectionTabs`
  - `PremiumGate`
  - the section components starting with checklist, emergency, profile, holidays, currency, documents, transport, and daily life
- Use the existing wizard output and `generateChecklist()` to personalize the checklist section.
- Keep premium content in the DOM even when blurred so the later SEO requirement still holds.
- Preserve static generation with `generateStaticParams()`.
- Use Germany as the first fully rendered country and keep the component shape ready for additional countries later.

## Files To Remember

- `src/stores/userProfileStore.ts`
- `src/data/types.ts`
- `src/data/categories.ts`
- `src/data/countries/index.ts`
- `src/data/countries/germany.ts`
- `src/lib/checklist/generator.ts`
- `src/app/wizard/page.tsx`
- `src/components/wizard/WizardFlow.tsx`
- `src/lib/countries/reference.ts`
- `src/app/country/[slug]/page.tsx`

## Phase 4 To 10 Update

### Phase 4

- Built the real 19-section country guide experience in `src/app/country/[slug]/page.tsx`.
- Added the country section component set under `src/components/country/`.
- Added share support and task-level "report outdated info" actions.

### Phase 5

- Reworked the homepage and countries browser into the real web app entry surfaces.
- Added homepage structured data for SEO.

### Phase 6

- Added launch-country seed datasets for Netherlands, Belgium, United Kingdom, Australia, Spain, France, Portugal, Canada, Switzerland, and United States.
- Added `src/data/countries/factory.ts` to keep seeded country structure consistent.

### Phase 7

- Added `AuthContext`, auth hooks, login, signup, and profile pages.
- Added guest-to-account profile syncing.
- Added Google OAuth trigger support.
- Fixed notifications so the profile toggle now persists to Supabase when configured.

### Phase 8

- Added Stripe checkout and webhook routes.
- Reworked pricing into a real page with CTA and FAQ.
- Premium gating keeps content in the DOM while blurred for SEO.

### Phase 9

- Added progress tracking, Supabase sync for logged-in users, reminder email generation helpers, and cron route support.

### Phase 10

- Implemented the web-focused polish work and intentionally skipped Capacitor.
- Added sitemap, robots, manifest, OG image route, not-found page, loading state, and global error boundary.
- Upgraded search to include countries, tasks, and key service entries.
- Added cookie consent, print support, and starter blog content with three posts.
- Added structured data to home, pricing, country pages, and blog posts.

## Current Verification

- `npm.cmd run lint` passes.
- `npm.cmd run build` passes.

## Current Follow-Up Direction

- Deepen country data beyond the current seeded launch set.
- Tighten Supabase schema assumptions with real migrations once backend setup begins.
- Expand editorial content and production deployment wiring.
