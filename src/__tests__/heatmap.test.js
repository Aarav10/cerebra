import { describe, it, expect, vi } from "vitest";
import { heatColor, applyHeatmapToRegions } from "../lib/heatmap";

describe("heatColor", () => {
  it("clamps values below 0 to the background", () => {
    const color = heatColor(-0.5, "#ff0000", "#000000");
    expect(color).toBe("#000000");
  });

  it("clamps values above 1", () => {
    const c = heatColor(1.5, "#ff0000", "#000000");
    expect(["#ff0000", "#ff8080"]).toContain(c);
  });

  it("produces full center color at 1", () => {
    const c = heatColor(1, "#ff0000", "#000000");
    expect(c).toBe("#ff0000");
  });

  it("stays background when value is 0", () => {
    expect(heatColor(0, "#ff0000", "#000000")).toBe("#000000");
  });

  it("is deterministic for identical inputs", () => {
    const a = heatColor(0.4, "#ff00aa", "#1e1605");
    const b = heatColor(0.4, "#ff00aa", "#1e1605");
    expect(a).toBe(b);
  });
});

describe("applyHeatmapToRegions", () => {
  const sampleRegions = [
    { id: "x", heatValue: 0.5, color: "#aabbcc" },
    { id: "y", heatValue: 0.2, color: "#ddeeff" },
    { id: "z", heatValue: undefined, color: "#123456" },
  ];

  it("returns original regions when mode is none", () => {
    const out = applyHeatmapToRegions(sampleRegions, "none");
    expect(out).toEqual(sampleRegions);
  });

  it("returns original regions when mode missing", () => {
    const out = applyHeatmapToRegions(sampleRegions, null);
    expect(out).toEqual(sampleRegions);
  });

  it("does not mutate input", () => {
    applyHeatmapToRegions(sampleRegions, "activation");
    expect(sampleRegions[0].color).toBe("#aabbcc");
  });

  it("returns typed arrays same length", () => {
    const out = applyHeatmapToRegions(sampleRegions, "pathology");
    expect(out.length).toBe(sampleRegions.length);
  });

  it("applies same mapping consistently", () => {
    const first = applyHeatmapToRegions(sampleRegions, "metabolism");
    const second = applyHeatmapToRegions(sampleRegions, "metabolism");
    expect(first).toEqual(second);
  });
});
