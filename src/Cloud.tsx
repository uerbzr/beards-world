import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CloudProps {
  position: [number, number, number];
}

function Cloud({ position: initialPosition }: CloudProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create a unique cloud shape with several spheres
  const [cloudParts] = useState(() => {
    const parts = [];
    const count = 5 + Math.floor(Math.random() * 5);
    for (let i = 0; i < count; i++) {
      parts.push({
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 30,
        ] as [number, number, number],
        scale: 0.8 + Math.random() * 1.5,
      });
    }
    return parts;
  });

  const [speed] = useState(() => 0.1 + Math.random() * 0.2);
  const [bobSpeed] = useState(() => 0.5 + Math.random() * 0.5);
  const [bobAmp] = useState(() => 5 + Math.random() * 10);

  useFrame((state) => {
    if (groupRef.current) {
      // Drift slowly
      groupRef.current.position.x += speed;
      
      // Wrap around wide bounds
      if (groupRef.current.position.x > 1500) {
        groupRef.current.position.x = -1500;
      }

      // Gentle vertical bobbing
      groupRef.current.position.y = initialPosition[1] + Math.sin(state.clock.elapsedTime * bobSpeed) * bobAmp;
    }
  });

  return (
    <group ref={groupRef} position={initialPosition}>
      {cloudParts.map((part, i) => (
        <mesh key={i} position={part.position} scale={part.scale}>
          <sphereGeometry args={[15, 16, 16]} />
          <meshStandardMaterial 
            color="white" 
            transparent 
            opacity={0.8} 
            flatShading={false}
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  );
}

export function Clouds() {
  return (
    <group>
      <Cloud position={[-800, 400, -600]} />
      <Cloud position={[-200, 500, -800]} />
      <Cloud position={[400, 450, -400]} />
      <Cloud position={[900, 550, -700]} />
      <Cloud position={[-500, 600, 200]} />
      <Cloud position={[200, 480, 500]} />
    </group>
  );
}
