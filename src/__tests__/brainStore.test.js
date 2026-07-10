import { describe, it, expect, beforeEach } from "vitest";
import { useBrainStore } from "../stores/brainStore";

describe("brainStore", () => {
  beforeEach(() => {
    useBrainStore.setState({
      regions: [],
      hoveredRegion: null,
      selectedRegion: null,
      heatmapMode: "none",
      heatmapScale: [0, 1],
    });
  });

  it("starts empty and can load regions", () => {
    expect(useBrainStore.getState().regions).toEqual([]);
    useBrainStore.getState().setRegions([{ id: "a", name: "A" }]);
    expect(useBrainStore.getState().regions).toEqual([{ id: "a", name: "A" }]);
  });

  it("tracks selected and hovered ids", () => {
    useBrainStore.getState().setSelectedRegion("ba4");
    useBrainStore.getState().setHoveredRegion("ba4");
    expect(useBrainStore.getState().selectedRegion).toBe("ba4");
    expect(useBrainStore.getState().hoveredRegion).toBe("ba4");
  });

  it("clears selection cleanly", () => {
    useBrainStore.getState().setSelectedRegion("ba4");
    useBrainStore.getState().clearSelection();
    expect(useBrainStore.getState().selectedRegion).toBeNull();
  });

  it("updates heatmap mode deterministically", () => {
    useBrainStore.getState().setHeatmapMode("activation");
    expect(useBrainStore.getState().heatmapMode).toBe("activation");
  });

  it("does not throw on any of the actions", () => {
    expect(() => useBrainStore.getState().activateRegion("ba4")).not.toThrow();
    expect(() => useBrainStore.getState().assignHeatValue("ba4", 0.5)).not.toThrow();
  });
});
