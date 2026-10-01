"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import type { SceneConfig } from "@/lib/sceneStore";

export function HeroGeometry({
  isMobile,
  config,
}: {
  isMobile: boolean;
  config: SceneConfig;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    if (!isMobile) {
      // Gentle parallax toward the cursor
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.18, 0.05);
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.25, 0.05);
    }

    // Continuous spin governed by speed
    g.rotation.z += delta * 0.12 * config.speed;
  });

  const isWireframe = config.meshMode === "wireframe";
  const isCrystal = config.meshMode === "crystal";

  return (
    // Right-of-center so the type lockup intersects the geometry's edge
    <group ref={group} position={[isMobile ? 0 : 1.6, 0.2, 0]} scale={isMobile ? 0.9 : 1.15}>
      <Float
        speed={1.4 * config.speed}
        rotationIntensity={0.5 * config.speed}
        floatIntensity={0.7 * config.speed}
      >
        {/* Outer wireframe shell */}
        <mesh scale={1.95}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            wireframe
            color={isWireframe ? config.colorHex : "#4a443a"}
            transparent
            opacity={isWireframe ? 0.85 : 0.45}
          />
        </mesh>

        {/* Inner solid / wireframe / crystal */}
        <mesh scale={1.15}>
          <icosahedronGeometry args={[1, isMobile ? 6 : isCrystal ? 8 : 24]} />
          {isWireframe ? (
            <meshStandardMaterial
              color={config.colorHex}
              wireframe
              emissive={config.colorHex}
              emissiveIntensity={0.6}
            />
          ) : isCrystal ? (
            <meshPhysicalMaterial
              color="#0d0d0d"
              roughness={0.1}
              metalness={0.9}
              transmission={0.4}
              ior={1.5}
              flatShading
              clearcoat={1}
            />
          ) : isMobile ? (
            <meshStandardMaterial color="#201d18" wireframe />
          ) : (
            <MeshDistortMaterial
              color="#1b1815"
              roughness={0.25}
              metalness={0.75}
              distort={0.28}
              speed={1.6 * config.speed}
            />
          )}
        </mesh>
      </Float>
    </group>
  );
}
