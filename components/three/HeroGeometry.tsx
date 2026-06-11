"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export function HeroGeometry({ isMobile }: { isMobile: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g || isMobile) return;
    // Gentle parallax toward the cursor
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.18, 0.05);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.25, 0.05);
  });

  return (
    // Right-of-center so the type lockup intersects the geometry's edge
    <group ref={group} position={[isMobile ? 0 : 1.6, 0.2, 0]} scale={isMobile ? 0.9 : 1.15}>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.7}>
        {/* Outer wireframe shell */}
        <mesh scale={1.95}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial wireframe color="#4a443a" transparent opacity={0.45} />
        </mesh>

        {/* Inner breathing solid */}
        <mesh scale={1.15}>
          <icosahedronGeometry args={[1, isMobile ? 6 : 24]} />
          {isMobile ? (
            <meshStandardMaterial color="#201d18" wireframe />
          ) : (
            <MeshDistortMaterial
              color="#1b1815"
              roughness={0.25}
              metalness={0.75}
              distort={0.28}
              speed={1.6}
            />
          )}
        </mesh>
      </Float>
    </group>
  );
}
