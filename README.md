# Mohsen Zare — portfolio

Live: https://mohsenz72.github.io/portfolio/

**From roots to networks.** One WebGL particle field (28,000 points, no 3D models) tells the story while you scroll:
a seed (hero) grows into a root system (background in agriculture → software), the roots rewire into a network graph
of the products I build, and the graph settles into a signal (contact). Colours come from Westland greenhouses at night,
lit by magenta and blue grow-lights.

## Stack
React 19 · TypeScript · Vite · React Three Fiber · custom GLSL point shader · postprocessing (bloom) · GSAP (SplitText, ScrollTrigger) · Lenis · Tailwind CSS 4

## How it works
- `src/three/shapes.ts` builds four deterministic point clouds (seed, roots, network, signal).
- `src/three/Field.tsx` morphs between them in the vertex shader; the stage is driven by scroll (`src/lib/scroll.ts`).
- Hovering a project lights up its hub in the graph.
- All content is plain DOM (`src/data/profile.ts`), so it reads without WebGL. Reduced motion stops the animation; there is a static fallback when WebGL is missing; Three.js is lazy-loaded after the text.

## Develop
```bash
npm ci
npm run dev
npm run build   # GITHUB_PAGES=true for the /portfolio/ base path
```
Deploys to GitHub Pages on every push to `main` (`.github/workflows/deploy.yml`).
