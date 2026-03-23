// ScrollMove.tsx
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function ScrollMove() {
  const { camera } = useThree();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const speed = 0.01;
      camera.position.z += e.deltaY * speed;
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [camera]);

  return null;
}
