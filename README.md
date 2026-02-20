# Heart Clinic Melbourne (hcm2025)

Patient-facing website for Heart Clinic Melbourne built with React, TypeScript, and Vite.

## Stack
- React 18
- TypeScript (strict)
- Vite 5
- Tailwind CSS
- Vitest + React Testing Library

## Getting Started
```bash
npm install
npm run dev
```

## Quality Checks
```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
```

## Scripts
- `npm run dev` — start local Vite dev server
- `npm run typecheck` — run TypeScript checks (`tsconfig.app.json`)
- `npm run lint` — run ESLint
- `npm run test` — run Vitest in watch mode
- `npm run test:run` — run Vitest once
- `npm run test:coverage` — run tests with coverage
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build locally

## Repository Notes
- Main app shell: `src/App.tsx`
- Mobile-specific UI: `src/components/mobile/`
- Referral wizard: `src/components/Wizard/`
- PDF generation: `src/components/pdf/generatePdf.ts`
- Utility tests: `src/utils/__tests__/`

## Deployment
- CI/CD workflow: `.github/workflows/deploy.yml`
- Production deploy runs from `main` and uploads built `dist/` via FTPS.
- Do not manually edit `dist/`.
