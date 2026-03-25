// src/App.tsx
import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Model } from "./Model";
import { Bird } from "./Bird";
import { Clouds } from "./Cloud";
import { PooManager } from "./Poo";
import type { PooItem } from "./Poo";

export default function App() {
  const [ambientIntensity, setAmbientIntensity] = useState(0.5);
  const [directionalIntensity, setDirectionalIntensity] = useState(1);
  const [pointIntensity, setPointIntensity] = useState(1);
  const [pointPosition, setPointPosition] = useState<[number, number, number]>([
    10, 10, 10,
  ]);
  const [bgColor, setBgColor] = useState("#000000");
  const [fov, setFov] = useState(50);
  const [birdHeight, setBirdHeight] = useState(150);
  const [birdRotation, setBirdRotation] = useState(0);
  const [poos, setPoos] = useState<PooItem[]>([]);
  const [score, setScore] = useState(0);

  const handlePoo = useCallback((poo: PooItem) => {
    setPoos((prev) => [...prev, poo]);
  }, []);

  const handleCollision = useCallback((id1: number, id2: number) => {
    setPoos((prev) => prev.filter((p) => p.id !== id1 && p.id !== id2));
    setScore((prev) => prev + 1);
  }, []);

  // Convert rotation angle to compass direction
  const getCompassDirection = (rotationRad: number): string => {
    // Normalize rotation to 0-2π
    let normalizedRotation = rotationRad % (Math.PI * 2);
    if (normalizedRotation < 0) normalizedRotation += Math.PI * 2;
    
    // Convert radians to degrees (0-360)
    const degrees = (normalizedRotation * 180) / Math.PI;
    
    // Map degrees to compass directions
    // 0° = N (pointing in +Z direction in Three.js), increases clockwise when viewed from above
    const directions = [
      { min: 0, max: 22.5, label: "N" },
      { min: 22.5, max: 67.5, label: "NE" },
      { min: 67.5, max: 112.5, label: "E" },
      { min: 112.5, max: 157.5, label: "SE" },
      { min: 157.5, max: 202.5, label: "S" },
      { min: 202.5, max: 247.5, label: "SW" },
      { min: 247.5, max: 292.5, label: "W" },
      { min: 292.5, max: 337.5, label: "NW" },
      { min: 337.5, max: 360, label: "N" },
    ];
    
    for (const dir of directions) {
      if (degrees >= dir.min && degrees < dir.max) {
        return dir.label;
      }
    }
    return "N";
  };

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
          <div className="label-text">
            <span>Altitude (↑/↓)</span>
            <span className="value-display">{birdHeight}</span>
          </div>
        </div>

        <div className="control-group">
          <div className="label-text">
            <span>Direction (←/→)</span>
            <span className="value-display">{getCompassDirection(birdRotation)}</span>
          </div>
        </div>

        <hr />

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
        <Bird onPoo={handlePoo} height={birdHeight} onHeightChange={setBirdHeight} onRotationChange={setBirdRotation} />
        <PooManager poos={poos} onCollision={handleCollision} />
        <Clouds />

      </Canvas>

      {/* Score Panel */}
      <div className="score-panel">
        <div className="score-label">SCORE</div>
        <div className="score-value">{score}</div>
        <div className="score-hint">Drop 💩 on 💩!</div>
      </div>
    </div>
  );
}
