import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

/**
 * Phase 1 — pipeline verification.
 * Test icosphere that spins to prove R3F + three + GLSL tooling all wire up.
 * Real graph scene lands in Phase 2.
 */
function TestIcosphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.35;
    ref.current.rotation.x += dt * 0.22;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#7CFF6B"
          emissive="#7CFF6B"
          emissiveIntensity={0.6}
          roughness={0.25}
          metalness={0.15}
          wireframe
        />
      </mesh>
      <mesh scale={1.01}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#05060B" transparent opacity={0.85} />
      </mesh>
    </Float>
  );
}

export default function Graph() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={['#05060B']} />
      <fog attach="fog" args={['#05060B', 8, 22]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={1.1} />
      <pointLight position={[-4, -2, -2]} intensity={0.55} color="#5EE6FF" />
      <Suspense fallback={null}>
        <TestIcosphere />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </Canvas>
  );
}
