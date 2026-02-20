# CLAUDE.md

## Project
Heart Clinic Melbourne website built with React + TypeScript + Vite.

## Stack
- React 18
- TypeScript (strict mode)
- Vite 5
- Tailwind CSS
- Framer Motion
- React Router
- Vitest + React Testing Library

## Runbook
```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run test
npm run test:run
npm run test:coverage
npm run build
npm run preview
```

## Repository Layout
- `src/App.tsx`: Desktop/mobile app shell and route setup.
- `src/components/`: Main UI sections and shared components.
- `src/components/mobile/`: Mobile-specific layouts and interactions.
- `src/components/Wizard/`: Referral workflow UI.
- `src/components/pdf/generatePdf.ts`: PDF generation logic.
- `src/hooks/`: Shared hooks (including mobile detection).
- `src/utils/`: Utility functions and tests.
- `src/setupTests.ts`: Vitest global setup.
- `.github/workflows/deploy.yml`: CI build + FTPS deploy.

## App Notes
- Mobile rendering is selected through `useMobileDetection()`.
- Heavy sections are lazy-loaded with `Suspense` fallbacks.
- `?remotion=true` enables the alternate hero path.
- Referral/PDF behavior is business-critical; validate this flow after edits.

## Testing Expectations
- Keep tests green with `npm run test:run`.
- Coverage thresholds are configured at 80% global in `vitest.config.ts`.
- MobileHeader has extensive test suites under `src/components/mobile/__tests__/`.

## Deployment
- Deploy runs on push to `main` via `.github/workflows/deploy.yml`.
- Workflow uses Node 20, builds with `npm run build`, uploads `dist/` via FTPS to VentraIP.
- Do not manually edit `dist/`; treat it as build output.

## Coding Guidelines
- Preserve strict TypeScript compatibility.
- Prefer small, local changes over broad refactors unless requested.
- Keep accessibility intact (semantic HTML, labels, keyboard support).
- Maintain existing color/token conventions (`primary`, `secondary`, `accent`, `sage`, `cream`).
- Avoid adding large dependencies unless justified.

## Documentation Rule
If commands or tooling change, update this file and `AGENTS.md` in the same change.
