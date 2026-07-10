import React, { useMemo } from "react";
import * as THREE from "three";

export function heatColor(value, centerColor, bgColor) {
  const color = new THREE.Color();
  const mix = Math.max(0, Math.min(1, value));
  color.copy(new THREE.Color(bgColor)).lerp(new THREE.Color(centerColor), mix);
  return `#${color.getHexString()}`;
}

export function applyHeatmapToRegions(regions, mode) {
  if (!mode || mode === "none") return regions;
  return regions.map((r) => {
    const t = Math.max(0, Math.min(1, r.heatValue ?? 0));
    let center = "#ff3355";
    let bg = "#1e2d3d";
    if (mode === "activation") {
      center = "#00d2ff";
      bg = "#0a1a22";
    }
    if (mode === "metabolism") {
      center = "#ffaa00";
      bg = "#1e1605";
    }
    if (mode === "pathology") {
      center = "#ff00aa";
      bg = "#200515";
    }
    return {
      ...r,
      color: heatColor(t, center, bg),
      emissive: center,
      emissiveIntensity: t,
    };
  });
}
