# Cerebra

3D brain viewer scaffold in the browser. Wires up a rough brain surface, clickable Brodmann-like regions, a heatmap overlay, and camera controls that switch to direct orbit once a region is selected.

Built with Vite, React, Three.js (`@react-three/fiber` + `@react-three/drei`), Tailwind v4, Zustand, and Vitest.

## What it does
- Procedural brain-like mesh with gyri/sulci-ish displacement.
- Nine Brodmann area bubbles positioned on a left hemisphere layout: hover to highlight, click to select.
- Three heatmap modes — `activation`, `metabolism`, `pathology` — that recolor regions from a cyan/orange/magenta scale.
- Orbit camera, zoom, pan. Auto-rotating idle view. When you click a region, orbit controls unlock so a visitor can inspect it.

## Source layout
```
src/
  App.jsx                  # root canvas + overlays + control panel
  main.jsx                 # entrypoint
  stores/
    brainStore.js          # region/hover/heatmap state
  lib/
    regions.js             # Brodmann-like region data
    heatmap.js             # color interpolation + mode mapping
  components/
    three/
      BrainViewer.jsx      # brain mesh, region bubbles, camera rig
    ui/
      ControlPanel.jsx     # heatmap buttons, info readout
  styles/
    index.css              # Tailwind v4 + global base styles
```

## Dev
```bash
npm install
npm run dev
```

## Tests
```bash
npm test
```

Currently covers:
- heat color interpolation
- heatmap mode mapping + immutability
- brain store actions, hover/selected state transitions

## Caveats
- Single-hemisphere scaffold, not scientifically accurate.
- Region positions are illustrative, not Talairach.
- This is an engineering demo, not a clinical visualization tool.

## Why the repo exists
I wanted a clean starting point for building 3D neuro viz tooling in React without importing a full atlas in one pass. This keeps the shell usable, the interactions obvious, and the data/UI concerns separated.
