"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SceneFallback } from "./SceneFallback";

// Splits three/fiber/drei out of the initial bundle; hero text paints first
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

type Mode = "pending" | "scene" | "fallback";

export function HeroSceneLoader() {
  const [mode, setMode] = useState<Mode>("pending");

  useEffect(() => {
    // Deferred a frame: avoids a synchronous cascading render during commit
    const id = requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setMode(!reduced && supportsWebGL() ? "scene" : "fallback");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (mode !== "scene") return <SceneFallback />;
  return <HeroScene />;
}
