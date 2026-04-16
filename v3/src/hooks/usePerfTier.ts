import { useEffect, useState } from 'react';

export type PerfTier = 'high' | 'balanced' | 'classic';

/**
 * Detects the device's capability tier for the 3D scene.
 * - classic: static fallback (reduced-motion, manual override, very old hardware, WebGL missing)
 * - balanced: scene without heavy post-processing (mid-tier mobile)
 * - high: full effects (modern dGPU laptop / desktop)
 *
 * Phase 1 returns a default; auto-detection deepens in later phases.
 */
export function usePerfTier(): PerfTier {
  const [tier, setTier] = useState<PerfTier>('high');

  useEffect(() => {
    // Manual override wins (persisted in localStorage by QualityBadge HUD).
    try {
      const stored = localStorage.getItem('v3.tier') as PerfTier | null;
      if (stored === 'high' || stored === 'balanced' || stored === 'classic') {
        setTier(stored);
        return;
      }
    } catch {}

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setTier('classic');
      return;
    }

    // WebGL feasibility sniff.
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      if (!gl) {
        setTier('classic');
        return;
      }
    } catch {
      setTier('classic');
      return;
    }

    const cores = navigator.hardwareConcurrency ?? 8;
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    if (cores < 4 || mem < 4) setTier('classic');
    else if (coarse || cores < 8) setTier('balanced');
    else setTier('high');
  }, []);

  return tier;
}
