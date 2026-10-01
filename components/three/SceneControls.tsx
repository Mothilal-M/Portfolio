"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  sceneStore,
  useSceneConfig,
  type ColorTheme,
  type MeshMode,
  type ParticleMode,
  type SpeedMode,
} from "@/lib/sceneStore";
import { trackEvent } from "@/lib/analytics";

const MESH_OPTIONS: { label: string; value: MeshMode }[] = [
  { label: "Solid", value: "solid" },
  { label: "Wireframe", value: "wireframe" },
  { label: "Crystal", value: "crystal" },
];

const SPEED_OPTIONS: { label: string; value: SpeedMode }[] = [
  { label: "0.5x", value: 0.5 },
  { label: "1x", value: 1 },
  { label: "2.5x", value: 2.5 },
];

const PARTICLE_OPTIONS: { label: string; value: ParticleMode }[] = [
  { label: "Off", value: "off" },
  { label: "Normal", value: "normal" },
  { label: "Supernova", value: "supernova" },
];

const THEME_OPTIONS: { label: string; value: ColorTheme; hex: string }[] = [
  { label: "Lime", value: "lime", hex: "#d6ff3f" },
  { label: "Cyan", value: "cyan", hex: "#38bdf8" },
  { label: "Amber", value: "amber", hex: "#fbbf24" },
];

export function SceneControls() {
  const config = useSceneConfig();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="absolute right-5 bottom-16 z-20 md:right-10">
      {/* Collapsed HUD Trigger Pill */}
      {!expanded ? (
        <button
          type="button"
          onClick={() => {
            setExpanded(true);
            trackEvent("3d_controls_open", { category: "interactive_3d" });
          }}
          data-cursor="hover"
          aria-label="Open 3D Canvas Controls"
          className="group flex items-center gap-2.5 rounded-full border border-border/80 bg-surface/85 px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-wider text-muted shadow-lg backdrop-blur-md transition-all duration-300 hover:border-accent hover:text-text hover:shadow-accent/10"
        >
          <span
            className="h-2 w-2 rounded-full transition-colors animate-pulse"
            style={{ backgroundColor: config.colorHex }}
          />
          <span className="font-semibold text-text">3D Lab</span>
          <span className="hidden text-muted/80 sm:inline">
            // {config.meshMode} · {config.speed}x
          </span>
          <span className="text-accent transition-transform duration-200 group-hover:translate-x-0.5">
            ⚙
          </span>
        </button>
      ) : (
        /* Expanded HUD Control Panel */
        <div
          role="region"
          aria-label="3D Canvas Controls"
          className="w-72 sm:w-80 rounded-2xl border border-border/90 bg-surface/95 p-5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: config.colorHex }}
              />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-text">
                3D Engine Lab
              </p>
            </div>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Close 3D controls"
              className="rounded-full border border-border/60 px-2 py-0.5 font-mono text-[0.625rem] text-muted transition-colors hover:border-accent hover:text-accent"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 space-y-4 font-mono text-xs">
            {/* Mesh Mode */}
            <div>
              <p className="mb-1.5 text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                Geometry Mesh
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {MESH_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      sceneStore.set({ meshMode: opt.value });
                      trackEvent("3d_mesh_change", {
                        category: "interactive_3d",
                        label: opt.value,
                      });
                    }}
                    className={clsx(
                      "rounded-lg border px-2 py-1 text-center text-[0.6875rem] transition-all",
                      config.meshMode === opt.value
                        ? "border-accent/60 bg-accent/15 font-semibold text-text shadow-sm"
                        : "border-border/60 bg-base/40 text-muted hover:border-border hover:text-text"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Speed Control */}
            <div>
              <p className="mb-1.5 text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                Physics Speed
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {SPEED_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      sceneStore.set({ speed: opt.value });
                      trackEvent("3d_speed_change", {
                        category: "interactive_3d",
                        label: String(opt.value),
                      });
                    }}
                    className={clsx(
                      "rounded-lg border px-2 py-1 text-center text-[0.6875rem] transition-all",
                      config.speed === opt.value
                        ? "border-accent/60 bg-accent/15 font-semibold text-text shadow-sm"
                        : "border-border/60 bg-base/40 text-muted hover:border-border hover:text-text"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Particle Field */}
            <div>
              <p className="mb-1.5 text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                Particle Field
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {PARTICLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      sceneStore.set({ particleMode: opt.value });
                      trackEvent("3d_particle_change", {
                        category: "interactive_3d",
                        label: opt.value,
                      });
                    }}
                    className={clsx(
                      "rounded-lg border px-2 py-1 text-center text-[0.6875rem] transition-all",
                      config.particleMode === opt.value
                        ? "border-accent/60 bg-accent/15 font-semibold text-text shadow-sm"
                        : "border-border/60 bg-base/40 text-muted hover:border-border hover:text-text"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Accent */}
            <div>
              <p className="mb-1.5 text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                Accent Hue
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {THEME_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      sceneStore.set({ theme: opt.value, colorHex: opt.hex });
                      trackEvent("3d_hue_change", {
                        category: "interactive_3d",
                        label: opt.value,
                      });
                    }}
                    className={clsx(
                      "flex items-center justify-center gap-1.5 rounded-lg border px-2 py-1 text-[0.6875rem] transition-all",
                      config.theme === opt.value
                        ? "border-accent/60 bg-accent/15 font-semibold text-text shadow-sm"
                        : "border-border/60 bg-base/40 text-muted hover:border-border hover:text-text"
                    )}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: opt.hex }}
                    />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Reset */}
          <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
            <span className="font-mono text-[0.625rem] text-muted/70">
              WebGL 60fps
            </span>
            <button
              type="button"
              onClick={() => {
                sceneStore.reset();
                trackEvent("3d_reset", { category: "interactive_3d" });
              }}
              className="font-mono text-[0.625rem] uppercase tracking-wider text-muted hover:text-accent transition-colors"
            >
              Reset Defaults ↺
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
