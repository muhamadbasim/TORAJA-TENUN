# AGENTS.md - Components

## Package Identity
- **Purpose**: UI Building blocks and page sections.
- **Tech**: React Functional Components, Tailwind CSS, Framer Motion.

## Patterns & Conventions
- **File Structure**: Flat structure in `components/`. One file per component.
- **Naming**: PascalCase for files and components (e.g., `Hero.tsx`).
- **Styling**:
  - Use Tailwind utility classes.
  - **Avoid** inline `style={{}}` unless for dynamic values (like background images).
  - Use `framer-motion` for entrance animations.

### Code Examples
- **✅ DO**: Functional component with typed props (if any).
  ```tsx
  // components/Example.tsx
  import React from 'react';
  import { motion } from 'framer-motion';

  export default function Example() {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 bg-white rounded-lg"
      >
        <h2 className="text-xl font-bold">Title</h2>
      </motion.div>
    );
  }
  ```
- **❌ DON'T**: Class components or separate CSS files for single components.

## Touch Points / Key Files
- **Navigation**: `components/Navigation.tsx` (Sticky header)
- **Hero Section**: `components/Hero.tsx` (Main landing visual)
- **Chat Interface**: `components/GeminiChat.tsx` (AI interaction)
- **Gallery**: `components/Gallery.tsx` (Image grid)

## JIT Index Hints
- **Find Animation usage**: `rg "motion\." components`
- **Find Tailwind colors**: `rg "text-|bg-" components`

## Common Gotchas
- **Tailwind CDN**: Since Tailwind is loaded via CDN, custom config in `tailwind.config.js` might not apply unless configured in the script tag. Rely on standard utility classes or arbitrary values (e.g., `bg-[#fafaf9]`).
- **Images**: Ensure images are accessible or use placeholders if local assets are missing.
