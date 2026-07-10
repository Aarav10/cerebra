const BROCKMANN_REGIONS = [
  { id: "ba4", name: "Brodmann area 4", short: "BA4", side: "left", color: "#ff7d7d", heatValue: 0.45, position: [0.35, 0.15, 0.55], radius: 0.12 },
  { id: "ba6", name: "Brodmann area 6", short: "BA6", side: "left", color: "#ffaa7d", heatValue: 0.38, position: [0.2, 0.25, 0.45], radius: 0.14 },
  { id: "ba44", name: "Brodmann area 44", short: "BA44", side: "left", color: "#ffd27d", heatValue: 0.22, position: [0.1, 0.35, 0.4], radius: 0.08 },
  { id: "ba45", name: "Brodmann area 45", short: "BA45", side: "left", color: "#fff37d", heatValue: 0.18, position: [0.0, 0.38, 0.38], radius: 0.07 },
  { id: "ba17", name: "Brodmann area 17", short: "BA17", side: "left", color: "#c8ff7d", heatValue: 0.57, position: [-0.4, -0.1, 0.45], radius: 0.09 },
  { id: "ba19", name: "Brodmann area 19", short: "BA19", side: "left", color: "#7dffa4", heatValue: 0.41, position: [-0.25, -0.2, 0.35], radius: 0.1 },
  { id: "ba21", name: "Brodmann area 21", short: "BA21", side: "left", color: "#7dffe0", heatValue: 0.33, position: [0.05, -0.15, 0.28], radius: 0.1 },
  { id: "ba22", name: "Brodmann area 22", short: "BA22", side: "left", color: "#7dd0ff", heatValue: 0.29, position: [0.15, -0.25, 0.25], radius: 0.09 },
  { id: "ba37", name: "Brodmann area 37", short: "BA37", side: "left", color: "#7da6ff", heatValue: 0.51, position: [-0.15, -0.4, 0.2], radius: 0.11 },
];

export const DEFAULT_REGIONS = BROCKMANN_REGIONS.map((r) => ({ ...r, active: false }));
