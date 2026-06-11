"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count: number;
  /** Cursor repulsion — disabled on touch devices */
  interactive: boolean;
}

const REPULSION_RADIUS = 1.5;
const HEAL = 0.06; // how fast displaced points ease back to their base position

// Seeded PRNG (mulberry32) — pure across renders, same cloud every visit
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function ParticleField({ count, interactive }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const pointerWorld = useRef(new THREE.Vector3());
  const scratch = useRef(new THREE.Vector3());

  // Loose spherical shell around the hero geometry
  const base = useMemo(() => {
    const rand = mulberry32(0x10f5ca1e);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.4 + rand() * 1.9;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  const positions = useMemo(() => base.slice(), [base]);

  useFrame((state, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;

    pts.rotation.y += delta * 0.04;
    pts.rotation.x += delta * 0.012;

    if (!interactive) return;

    // Pointer projected near the geometry plane, smoothed so the field
    // parts ahead of the cursor and heals behind it
    scratch.current.set(state.pointer.x * 4.5, state.pointer.y * 2.8, 0.5);
    pointerWorld.current.lerp(scratch.current, 0.08);
    const local = pts.worldToLocal(pointerWorld.current.clone());

    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      arr[ix] += (base[ix] - arr[ix]) * HEAL;
      arr[ix + 1] += (base[ix + 1] - arr[ix + 1]) * HEAL;
      arr[ix + 2] += (base[ix + 2] - arr[ix + 2]) * HEAL;

      const dx = arr[ix] - local.x;
      const dy = arr[ix + 1] - local.y;
      const dz = arr[ix + 2] - local.z;
      const d2 = dx * dx + dy * dy + dz * dz;
      if (d2 < REPULSION_RADIUS * REPULSION_RADIUS) {
        const d = Math.sqrt(d2) || 0.0001;
        const force = ((REPULSION_RADIUS - d) / REPULSION_RADIUS) * 0.14;
        arr[ix] += (dx / d) * force;
        arr[ix + 1] += (dy / d) * force;
        arr[ix + 2] += (dz / d) * force;
      }
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d6ff3f"
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
