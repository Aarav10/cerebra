import { create } from "zustand";

export const useBrainStore = create((set, get) => ({
  regions: [],
  hoveredRegion: null,
  selectedRegion: null,
  heatmapMode: "none",
  heatmapScale: [0, 1],
  setRegions: (regions) => set({ regions }),
  setHoveredRegion: (id) => set({ hoveredRegion: id }),
  setSelectedRegion: (id) => set({ selectedRegion: id }),
  setHeatmapMode: (mode) => set({ heatmapMode: mode }),
  setHeatmapScale: (scale) => set({ heatmapScale: scale }),
  activateRegion: (id) => {
    const next = get().regions.map((r) => (r.id === id ? { ...r, active: true } : { ...r, active: false }));
    set({ regions: next, selectedRegion: id });
  },
  clearSelection: () => set({ selectedRegion: null }),
  assignHeatValue: (id, value) => {
    const next = get().regions.map((r) => (r.id === id ? { ...r, heatValue: value } : r));
    set({ regions: next });
  },
}));
