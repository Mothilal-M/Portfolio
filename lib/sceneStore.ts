"use client";

import { useSyncExternalStore } from "react";

export type MeshMode = "solid" | "wireframe" | "crystal";
export type SpeedMode = 0.5 | 1 | 2.5;
export type ParticleMode = "normal" | "supernova" | "off";
export type ColorTheme = "lime" | "cyan" | "amber";

export interface SceneConfig {
  meshMode: MeshMode;
  speed: SpeedMode;
  particleMode: ParticleMode;
  theme: ColorTheme;
  colorHex: string;
}

const THEME_COLORS: Record<ColorTheme, string> = {
  lime: "#d6ff3f",
  cyan: "#38bdf8",
  amber: "#fbbf24",
};

const DEFAULT_CONFIG: SceneConfig = {
  meshMode: "solid",
  speed: 1,
  particleMode: "normal",
  theme: "lime",
  colorHex: THEME_COLORS.lime,
};

let currentConfig: SceneConfig = { ...DEFAULT_CONFIG };
const subscribers = new Set<() => void>();

function notify() {
  subscribers.forEach((callback) => callback());
}

export const sceneStore = {
  get: () => currentConfig,
  set: (partial: Partial<SceneConfig>) => {
    let newTheme = partial.theme ?? currentConfig.theme;
    let newHex = partial.colorHex ?? THEME_COLORS[newTheme] ?? currentConfig.colorHex;

    currentConfig = {
      ...currentConfig,
      ...partial,
      theme: newTheme,
      colorHex: newHex,
    };
    notify();
  },
  reset: () => {
    currentConfig = { ...DEFAULT_CONFIG };
    notify();
  },
  subscribe: (callback: () => void) => {
    subscribers.add(callback);
    return () => {
      subscribers.delete(callback);
    };
  },
};

export function useSceneConfig(): SceneConfig {
  return useSyncExternalStore(
    sceneStore.subscribe,
    sceneStore.get,
    () => DEFAULT_CONFIG
  );
}
