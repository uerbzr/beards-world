import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Bird() {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);

  // Randomize starting position/phase
  const [initialPhase] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const radius = 250;
    const speed = 0.5;
    const height = 150;

    if (groupRef.current) {
      // Current angle
      const angle = t * speed + initialPhase;
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = height + Math.sin(t * 2) * 20;

      groupRef.current.position.set(x, y, z);

      // Look ahead on the path
      const targetX = Math.cos(angle + 0.1) * radius;
      const targetZ = Math.sin(angle + 0.1) * radius;
      
      groupRef.current.lookAt(targetX, y, targetZ);
    }

    if (leftWingRef.current && rightWingRef.current) {
      const flapSpeed = 10;
      const flapAmp = 0.5;
      const flapAngle = Math.sin(t * flapSpeed) * flapAmp;
      
      leftWingRef.current.rotation.z = flapAngle;
      rightWingRef.current.rotation.z = -flapAngle;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[5, 20, 8]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      
      {/* Left Wing Pivot */}
      <group position={[2, 2, 0]} ref={leftWingRef}>
        {/* Wing Geometry offset from pivot */}
        <mesh position={[8, 0, 0]}>
          <boxGeometry args={[16, 2, 8]} />
          <meshStandardMaterial color="#FFA500" />
        </mesh>
      </group>

      {/* Right Wing Pivot */}
      <group position={[-2, 2, 0]} ref={rightWingRef}>
        {/* Wing Geometry offset from pivot */}
        <mesh position={[-8, 0, 0]}>
          <boxGeometry args={[16, 2, 8]} />
          <meshStandardMaterial color="#FFA500" />
        </mesh>
      </group>
    </group>
  );
}
