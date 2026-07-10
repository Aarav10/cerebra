import React, { useEffect, useState } from 'react';
import BrainViewer from "./components/three/BrainViewer";
import ControlPanel from "./components/ui/ControlPanel";
import { useBrainStore } from "./stores/brainStore";
import { DEFAULT_REGIONS } from "./lib/regions";

export default function App() {
  const setRegions = useBrainStore((s) => s.setRegions);
  const [infoMarker, setInfoMarker] = useState(null);

  useEffect(() => {
    if (!useBrainStore.getState().regions.length) {
      setRegions(DEFAULT_REGIONS);
    }
  }, [setRegions]);

  return (
    <div className="font-sans w-screen h-screen relative">
      <BrainCanvas />

      <div className="absolute top-5 left-5 z-10 pointer-events-none">
        <div className="pointer-events-auto select-none rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/[0.08] shadow-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display font-bold text-sm tracking-wide">Cerebra</div>
              <div className="text-[11px] text-white/50">3D brain viewer scaffold</div>
            </div>
            <span className="text-[11px] font-mono text-white/40">β</span>
          </div>

          <div className="h-px bg-white/[0.06]" />

          <ControlPanel />
        </div>
      </div>
    </div>
  );
}
