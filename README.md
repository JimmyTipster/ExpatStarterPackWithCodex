# Expat Starter Pack

Phase 1 bootstrap for `expatstarterpack.com`, built with Next.js App Router, TypeScript, Tailwind CSS 4, shadcn/ui, Zustand, and Supabase-ready auth utilities.

## Local Setup

1. Copy `.env.local.example` to `.env.local`.
2. Fill in Supabase, Stripe, and Resend environment variables as they become available.
3. Install dependencies:

```powershell
npm.cmd install
```

4. Start the dev server:

```powershell
npm.cmd run dev
```

5. Run checks:

```powershell
npm.cmd run lint
npm.cmd run build
```

## Notes

- This repo intentionally keeps `part1.txt`, `part2.txt`, and `part3.txt` in the root as planning references.
- On this Windows setup, `npm` may be blocked by PowerShell execution policy, so use `npm.cmd` and `npx.cmd`.
- Phase 1 includes the branded shell, theme tokens, placeholder routes, utility layer, Supabase clients, and the persisted onboarding profile store.
