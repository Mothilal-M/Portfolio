"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { ParticleField } from "./ParticleField";
import { HeroGeometry } from "./HeroGeometry";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

/**
 * Hero Canvas. Dynamic-imported with ssr:false — never server-rendered.
 * Perf guards: DPR clamp, AdaptiveDpr, PerformanceMonitor degradation,
 * frameloop paused while the hero is scrolled out of view.
 */
export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [degraded, setDegraded] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    // The hero is sticky, so it never leaves the viewport — pause the
    // frameloop once the curtain content has fully covered it instead.
    const onScroll = () => setInView(window.scrollY < window.innerHeight * 1.15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const particleCount = isMobile ? 1200 : degraded ? 1600 : 3000;

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Canvas
        dpr={degraded ? 1 : [1, isMobile ? 1.5 : 1.75]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={inView ? "always" : "never"}
      >
        <PerformanceMonitor onDecline={() => setDegraded(true)}>
          <ambientLight intensity={0.35} />
          <pointLight position={[4, 3, 5]} intensity={18} color="#d6ff3f" />
          <pointLight position={[-5, -2, 3]} intensity={6} color="#f2efe8" />
          <Suspense fallback={null}>
            <HeroGeometry isMobile={isMobile} />
            <ParticleField
              key={particleCount}
              count={particleCount}
              interactive={!isMobile && !degraded}
            />
          </Suspense>
        </PerformanceMonitor>
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
