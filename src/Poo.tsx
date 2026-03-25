import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export interface PooItem {
  id: number;
  position: THREE.Vector3;
  velocity: number;
  text: string;
  landed: boolean;
}

const GRAVITY = 1.2;
const GROUND_Y = 0;
const COLLISION_RADIUS = 12;

interface PooManagerProps {
  poos: PooItem[];
  onCollision: (id1: number, id2: number) => void;
}

export function PooManager({ poos, onCollision }: PooManagerProps) {
  const meshRefs = useRef<Map<number, THREE.Group>>(new Map());
  const collisionCooldown = useRef<Set<string>>(new Set());

  useFrame(() => {
    for (const poo of poos) {
      const mesh = meshRefs.current.get(poo.id);
      if (!mesh) continue;

      if (!poo.landed) {
        // Apply gravity
        poo.velocity += GRAVITY;
        poo.position.y -= poo.velocity;

        // Check if hit the ground
        if (poo.position.y <= GROUND_Y) {
          poo.position.y = GROUND_Y;
          poo.velocity = 0;
          poo.landed = true;
        }

        // Check collision with landed poos
        if (!poo.landed) {
          for (const other of poos) {
            if (other.id === poo.id || !other.landed) continue;

            const dx = poo.position.x - other.position.x;
            const dz = poo.position.z - other.position.z;
            const dist = Math.sqrt(dx * dx + dz * dz);

            if (dist < COLLISION_RADIUS && poo.position.y <= other.position.y + 10) {
              const key = `${Math.min(poo.id, other.id)}-${Math.max(poo.id, other.id)}`;
              if (!collisionCooldown.current.has(key)) {
                collisionCooldown.current.add(key);
                onCollision(poo.id, other.id);
                // Clean up cooldown after a bit
                setTimeout(() => collisionCooldown.current.delete(key), 500);
              }
            }
          }
        }
      }

      // Update mesh position
      mesh.position.set(poo.position.x, poo.position.y, poo.position.z);
    }
  });

  return (
    <group>
      {poos.map((p) => (
        <group
          key={p.id}
          ref={(el) => {
            if (el) meshRefs.current.set(p.id, el);
            else meshRefs.current.delete(p.id);
          }}
          position={[p.position.x, p.position.y, p.position.z]}
        >
          {/* Poo emoji sphere */}
          <Text
            fontSize={8}
            color="#4b2e0e"
            rotation={[-Math.PI / 2, 0, 0]}
            anchorY="middle"
          >
            {p.text}
          </Text>
        </group>
      ))}
    </group>
  );
}
