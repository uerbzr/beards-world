import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { PooItem } from "./Poo";

interface BirdProps {
  onPoo: (poo: PooItem) => void;
  height: number;
  onHeightChange: (h: number) => void;
  onRotationChange: (r: number) => void;
}

export function Bird({ onPoo, height, onHeightChange, onRotationChange }: BirdProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // State for bird transform
  const [pos] = useState(() => new THREE.Vector3(0, 150, 250));
  const heightRef = useRef(height);
  const [rotation, setRotation] = useState(0); // Y-axis rotation in radians
  const [speed] = useState(2);
  const [turnSpeed] = useState(0.03);

  // Keyboard state
  const keys = useRef<{ [key: string]: boolean }>({});
  const lastPooTime = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
      // Press 'P' to poo!
      if (e.key.toLowerCase() === "p" && Date.now() - lastPooTime.current > 300) {
        lastPooTime.current = Date.now();
        onPoo({
          id: Date.now(),
          position: pos.clone(),
          velocity: 0,
          text: "💩",
          landed: false,
        });
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => (keys.current[e.key] = false);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pos, onPoo]);

  // Report rotation changes to parent
  useEffect(() => {
    onRotationChange(rotation);
  }, [rotation, onRotationChange]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Update height ref
    heightRef.current = height;
    pos.y = height;

    if (groupRef.current) {
      // 1. Update Rotation
      if (keys.current["ArrowLeft"]) setRotation((r) => r + turnSpeed);
      if (keys.current["ArrowRight"]) setRotation((r) => r - turnSpeed);

      // 2. Height control with up/down arrows
      if (keys.current["ArrowUp"]) {
        onHeightChange(Math.min(500, height + 3));
      }
      if (keys.current["ArrowDown"]) {
        onHeightChange(Math.max(20, height - 3));
      }

      // 2. Update Position (Move forward in current direction)
      const direction = new THREE.Vector3(
        Math.sin(rotation),
        0,
        Math.cos(rotation)
      );
      pos.addScaledVector(direction, speed);
      
      // Add slight bobbing
      const bobbing = Math.sin(t * 2) * 0.2;
      groupRef.current.position.set(pos.x, pos.y + bobbing, pos.z);
      groupRef.current.rotation.y = rotation;

      // 3. Camera Follow Logic
      // Position camera behind and above the bird
      const camOffset = new THREE.Vector3(
        -Math.sin(rotation) * 150,
        80,
        -Math.cos(rotation) * 150
      );
      
      const targetCamPos = pos.clone().add(camOffset);
      camera.position.lerp(targetCamPos, 0.1); // Smooth follow
      
      // Look at a point slightly in front of the bird
      const lookAtTarget = pos.clone().add(direction.multiplyScalar(50));
      camera.lookAt(lookAtTarget);
    }

    // Flap wings
    if (leftWingRef.current && rightWingRef.current) {
      const flapSpeed = 15;
      const flapAmp = 0.6;
      const flapAngle = Math.sin(t * flapSpeed) * flapAmp;
      
      leftWingRef.current.rotation.z = flapAngle;
      rightWingRef.current.rotation.z = -flapAngle;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body - pointed forward (towards +Z in local space) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[5, 20, 8]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      
      {/* Left Wing Pivot */}
      <group position={[2, 2, 0]} ref={leftWingRef}>
        <mesh position={[8, 0, 0]}>
          <boxGeometry args={[16, 2, 8]} />
          <meshStandardMaterial color="#FFA500" />
        </mesh>
      </group>

      {/* Right Wing Pivot */}
      <group position={[-2, 2, 0]} ref={rightWingRef}>
        <mesh position={[-8, 0, 0]}>
          <boxGeometry args={[16, 2, 8]} />
          <meshStandardMaterial color="#FFA500" />
        </mesh>
      </group>
    </group>
  );
}
