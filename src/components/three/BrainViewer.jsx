import React, { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useBrainStore } from "./../../stores/brainStore";
import { DEFAULT_REGIONS } from "./../../lib/regions";
import { applyHeatmapToRegions } from "./../../lib/heatmap";

function BrainMesh() {
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1.1, 128, 128);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const nx = x / 1.1;
      const ny = y / 1.1;
      const nz = z / 1.1;
      const offset =
        (0.04 * Math.sin(6 * nx) * Math.sin(5 * ny) * Math.sin(4 * nz)) +
        (0.025 * Math.sin(9 * nx + ny) * Math.cos(7 * nz)) +
        (0.02 * Math.cos(11 * ny) * Math.sin(8 * nx - nz));
      const scale = 1 + offset * 0.6;
      pos.setXYZ(i, x * scale, y * scale, z * scale);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial color="#6b7b8c" roughness={0.55} metalness={0.05} />
    </mesh>
  );
}

function RegionBubble({ region }) {
  const setHoveredRegion = useBrainStore((s) => s.setHoveredRegion);
  const setSelectedRegion = useBrainStore((s) => s.setSelectedRegion);
  const hoveredRegion = useBrainStore((s) => s.hoveredRegion);
  const selectedRegion = useBrainStore((s) => s.selectedRegion);
  const isHovered = hoveredRegion === region.id;
  const isSelected = selectedRegion === region.id;

  return (
    <mesh
      position={region.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredRegion(region.id);
      }}
      onPointerOut={() => setHoveredRegion(null)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedRegion(region.id);
      }}
      scale={isHovered || isSelected ? 1.15 : 1}
    >
      <sphereGeometry args={[region.radius, 48, 48]} />
      <meshStandardMaterial
        color={isHovered || isSelected ? "#ffffff" : region.color}
        emissive={isHovered || isSelected ? region.color : "#000000"}
        emissiveIntensity={isHovered || isSelected ? 0.7 : 0}
        roughness={0.35}
        metalness={0.1}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

function CameraRig({ enabled }) {
  useFrame((state) => {
    if (!enabled) return;
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.15) * 3.2;
    state.camera.position.z = Math.cos(t * 0.15) * 3.2;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function BrainViewer() {
  const heatmapMode = useBrainStore((s) => s.heatmapMode);
  const regions = useBrainStore((s) => s.regions);
  const selectedRegion = useBrainStore((s) => s.selectedRegion);

  const visibleRegions = useMemo(() => (regions.length ? regions : DEFAULT_REGIONS), [regions]);
  const processedRegions = applyHeatmapToRegions(visibleRegions, heatmapMode);

  return (
    <>
      <CameraRig enabled={!selectedRegion} />
      <OrbitControls
        makeDefault={!!selectedRegion}
        enabled={!!selectedRegion}
        autoRotate={!selectedRegion}
        autoRotateSpeed={0.6}
        enableDamping
        dampingFactor={0.08}
        minDistance={1.8}
        maxDistance={8}
      />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -2, 3]} intensity={0.8} color="#cfe9ff" />
      <BrainMesh />
      <group>
        {processedRegions.map((region) => (
          <RegionBubble key={region.id} region={region} />
        ))}
      </group>
    </>
  );
}
