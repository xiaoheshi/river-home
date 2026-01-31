// src/stores/navigationStore.ts
import { create } from 'zustand';

export type Region = 'home' | 'works' | 'nexus' | 'about';

interface RegionCoords {
  position: [number, number, number];
  lookAt: [number, number, number];
}

export const REGION_COORDS: Record<Region, RegionCoords> = {
  home: { position: [0, 0, 20], lookAt: [0, 0, 0] },
  works: { position: [50, 0, 0], lookAt: [50, 0, -20] },
  nexus: { position: [-50, 10, -10], lookAt: [-50, 10, -30] },
  about: { position: [0, 40, -20], lookAt: [0, 40, -40] },
};

interface NavigationState {
  currentRegion: Region;
  isTransitioning: boolean;
  setRegion: (region: Region) => void;
  setTransitioning: (value: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentRegion: 'home',
  isTransitioning: false,
  setRegion: (region) => set({ currentRegion: region }),
  setTransitioning: (value) => set({ isTransitioning: value }),
}));
