# AGENTS.md

## Purpose
Instructions for AI coding agents working in this repository.

## Primary Goals
- Make safe, minimal, reversible changes.
- Keep the site stable for patient-facing and referral workflows.
- Leave the repo in a buildable, testable state.

## Fast Start
```bash
npm install
npm run dev
npm run lint
npm run test:run
npm run build
```

## Working Rules
- Read relevant files before editing.
- Prefer targeted edits over sweeping rewrites.
- Do not modify generated output in `dist/`.
- Keep React + TypeScript patterns already used in the codebase.
- Preserve accessibility and responsive behavior for both desktop and mobile layouts.
- Keep Tailwind palette usage consistent with configured tokens.

## High-Risk Areas
- `src/components/ReferralForm.tsx`
- `src/components/Wizard/`
- `src/components/pdf/generatePdf.ts`
- `src/components/mobile/`

For these paths, validate behavior with at least:
```bash
npm run test:run
npm run build
```

## Testing Guidance
- Use Vitest suites under `src/**/__tests__/`.
- Add or update tests when behavior changes.
- Keep coverage thresholds in `vitest.config.ts` in mind.

## Deployment Context
- CI/CD is defined in `.github/workflows/deploy.yml`.
- Production deploy is triggered from `main` and uploads `dist/` via FTPS.
- If a change can affect deployment, mention it in your final summary.

## Handoff Checklist
Before finishing, confirm:
1. Lint/build/tests relevant to the change pass locally.
2. Updated docs if workflow or commands changed.
3. File-level summary includes what changed and why.
