# AGENTS.md - Root

## Project Snapshot
- **Type**: Single Project (React + Vite)
- **Stack**: React 19, TypeScript, Vite, Tailwind CSS (CDN), Framer Motion
- **Key Note**: Tailwind is loaded via CDN in `index.html`.
- **Sub-Agents**: See `components/AGENTS.md` and `services/AGENTS.md` for specific details.

## Root Setup Commands
- **Install**: `npm install`
- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## Universal Conventions
- **Style**: TypeScript strict mode. Functional components only.
- **Styling**: Tailwind utility classes directly in JSX.
- **State**: React Hooks (`useState`, `useEffect`).
- **Animation**: `framer-motion` for transitions and effects.
- **Imports**: Use relative imports or `@/` alias (mapped to root).

## Security & Secrets
- **Secrets**: `.env` file for local secrets (e.g., `GEMINI_API_KEY`).
- **Usage**: Access via `import.meta.env` or `process.env` (shimmed in vite config).
- **Rule**: NEVER commit `.env` files.

## JIT Index (Directory Map)
### Package Structure
- **UI Components**: `components/` → [see components/AGENTS.md](components/AGENTS.md)
- **Business Logic**: `services/` → [see services/AGENTS.md](services/AGENTS.md)
- **Config**: Root files (`vite.config.ts`, `tailwind.config.js` if exists)

### Quick Find Commands
- **Find Component**: `rg -n "export function.*" components`
- **Find Service**: `rg -n "export.*" services`
- **Find Env Usage**: `rg "process.env|import.meta.env" .`

## Definition of Done
- Code compiles without TypeScript errors.
- Component looks good on mobile and desktop (responsive).
- No console errors in browser.