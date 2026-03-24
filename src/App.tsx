// src/App.tsx
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Model } from "./Model";
import { ScrollMove } from "./ScrollMove";
import { Bird } from "./Bird";
import { Clouds } from "./Cloud";

export default function App() {
  const [ambientIntensity, setAmbientIntensity] = useState(0.5);
  const [directionalIntensity, setDirectionalIntensity] = useState(1);
  const [pointIntensity, setPointIntensity] = useState(1);
  const [pointPosition, setPointPosition] = useState<[number, number, number]>([
    10, 10, 10,
  ]);
  const [bgColor, setBgColor] = useState("#000000");
  const [fov, setFov] = useState(50);

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
        background: "#e0e0e0",
        position: "relative",
      }}
    >
      <div className="controls">
        <h3>Scene Controls</h3>

        <div className="control-group">
          <label>
            <div className="label-text">
              <span>Background Color</span>
            </div>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </label>
        </div>

        <div className="control-group">
          <label>
            <div className="label-text">
              <span>Camera FOV</span>
              <span className="value-display">{fov}°</span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              step="1"
              value={fov}
              onChange={(e) => setFov(Number(e.target.value))}
            />
          </label>
        </div>

        <hr />

        <div className="control-group">
          <label>
            <div className="label-text">
              <span>Ambient Intensity</span>
              <span className="value-display">{ambientIntensity.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={ambientIntensity}
              onChange={(e) => setAmbientIntensity(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="control-group">
          <label>
            <div className="label-text">
              <span>Directional Intensity</span>
              <span className="value-display">
                {directionalIntensity.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={directionalIntensity}
              onChange={(e) => setDirectionalIntensity(Number(e.target.value))}
            />
          </label>
        </div>

        <hr />

        <div className="control-group">
          <label>
            <div className="label-text">
              <span>Point Light Intensity</span>
              <span className="value-display">{pointIntensity.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={pointIntensity}
              onChange={(e) => setPointIntensity(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="control-group">
          <label>
            <div className="label-text">
              <span>Point Light X</span>
              <span className="value-display">{pointPosition[0]}</span>
            </div>
            <input
              type="range"
              min="-1000"
              max="1000"
              step="10"
              value={pointPosition[0]}
              onChange={(e) =>
                setPointPosition([
                  Number(e.target.value),
                  pointPosition[1],
                  pointPosition[2],
                ])
              }
            />
          </label>
        </div>

        <div className="control-group">
          <label>
            <div className="label-text">
              <span>Point Light Y</span>
              <span className="value-display">{pointPosition[1]}</span>
            </div>
            <input
              type="range"
              min="-1000"
              max="1000"
              step="10"
              value={pointPosition[1]}
              onChange={(e) =>
                setPointPosition([
                  pointPosition[0],
                  Number(e.target.value),
                  pointPosition[2],
                ])
              }
            />
          </label>
        </div>

        <div className="control-group">
          <label>
            <div className="label-text">
              <span>Point Light Z</span>
              <span className="value-display">{pointPosition[2]}</span>
            </div>
            <input
              type="range"
              min="-1000"
              max="1000"
              step="10"
              value={pointPosition[2]}
              onChange={(e) =>
                setPointPosition([
                  pointPosition[0],
                  pointPosition[1],
                  Number(e.target.value),
                ])
              }
            />
          </label>
        </div>
      </div>

      <Canvas
        style={{
          width: "1024px",
          height: "768px",
          background: bgColor,
          display: "block",
        }}
        camera={{ position: [0, 800, 90], fov: fov, near: 1, far: 50000 }}
      >
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[5, 5, 5]} intensity={directionalIntensity} />
        <pointLight position={pointPosition} intensity={pointIntensity} />

        <Environment preset="sunset" />

        <Model />
        <Bird />
        <Clouds />

        <OrbitControls />
        <ScrollMove />
      </Canvas>
    </div>
  );
}
