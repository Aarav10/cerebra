import React from "react";
import { useBrainStore } from "./../../stores/brainStore";

const HEATMAP_MODES = ["none", "activation", "metabolism", "pathology"];

export default function ControlPanel() {
  const selectedRegion = useBrainStore((s) => s.selectedRegion);
  const hoveredRegion = useBrainStore((s) => s.hoveredRegion);
  const heatmapMode = useBrainStore((s) => s.heatmapMode);
  const setHeatmapMode = useBrainStore((s) => s.setHeatmapMode);
  const regions = useBrainStore((s) => s.regions);
  const clearSelection = useBrainStore((s) => s.clearSelection);

  const selected = regions.find((r) => r.id === selectedRegion);
  const hovered = regions.find((r) => r.id === hoveredRegion);

  return (
    <div className="pointer-events-auto select-none">
      <div className="rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/[0.08] shadow-2xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display font-bold text-sm tracking-wide">Cerebra</div>
            <div className="text-[11px] text-white/50">3D brain viewer scaffold</div>
          </div>
          <span className="text-[11px] font-mono text-white/40">β</span>
        </div>

        <div className="h-px bg-white/[0.06]" />

        <div className="space-y-2">
          <div className="text-[11px] font-semibold text-white/60 tracking-wide uppercase">Heatmap</div>
          <div className="flex-wrap flex gap-2">
            {HEATMAP_MODES.map((mode) => (
              <button
                key={mode}
                onClick={() => setHeatmapMode(mode === heatmapMode ? "none" : mode)}
                className={`px-2 py-1 transition-colors text-[11px] rounded-lg border ${
                  heatmapMode === mode
                    ? "bg-white/10 border-white/25 text-white"
                    : "bg-white/5 border-white/[0.08] text-white/60 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-white/[0.06]" />

        <div className="space-y-2">
          <div className="text-[11px] font-semibold text-white/60 tracking-wide uppercase">Info</div>
          {selected ? (
            <div className="space-y-1">
              <div className="font-display font-semibold text-white">{selected.name}</div>
              <div className="text-[11px] font-mono text-white/60">
                {selected.short} · side: {selected.side} · heat: {selected.heatValue ?? 0}
              </div>
              <button
                onClick={clearSelection}
                className="text-[11px] text-white/40 hover:text-white transition-colors"
              >
                clear selection
              </button>
            </div>
          ) : hovered ? (
            <div className="space-y-1">
              <div className="font-display font-semibold text-white/90">{hovered.name}</div>
              <div className="text-[11px] font-mono text-white/60">
                {hovered.short} · click to select
              </div>
            </div>
          ) : (
            <div className="text-[11px] text-white/40 leading-relaxed">
              Select a region to capture camera controls. Hover regions for names; click to lock the view.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
