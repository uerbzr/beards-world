// src/App.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Model } from "./Model";
import { ScrollMove } from "./ScrollMove";

export default function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
      }}
    >
      <Canvas
        style={{
          width: "1024px",
          height: "768px",
          background: "black",
          display: "block",
        }}
        camera={{ position: [0, 800, 90], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Add this line */}
        <Environment preset="sunset" />

        <Model />

        <OrbitControls />
        <ScrollMove />
      </Canvas>
    </div>
  );
}
