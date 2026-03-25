# beards-world

**beards-world** is an interactive 3D web application built with **React 19**, **Vite 8**, and **TypeScript**. It utilizes **Three.js** via **React Three Fiber** and **@react-three/drei** to render a 3D terrain environment featuring a controllable bird and procedural clouds.

## Core Components

### `Bird.tsx`
The `Bird` component is the main interactive element of the scene. It's a low-poly bird model (built using Three.js primitives) that the user can control.
- **Movement**: The bird moves forward automatically in the direction it's facing.
- **Controls**:
  - `ArrowLeft` / `ArrowRight`: Rotates the bird left or right.
  - `ArrowUp` / `ArrowDown`: Adjusts the bird's height (20–500 units).
  - `P`: Releases a text object ("poo") at the bird's current position.
- **Features**:
  - **Camera Follow**: The camera smoothly follows behind the bird using a lerp function, maintaining a consistent view of the action.
  - **Animations**: The bird features procedural wing flapping and a gentle vertical bobbing motion.
  - **Customizable Text**: Accepts a `pooText` prop that determines the text released when the 'P' key is pressed.

### `Cloud.tsx`
Provides procedural cloud generation and animation.
- **`Cloud`**: A single cloud instance composed of multiple spheres with randomized positions and scales to create a unique shape.
- **`Clouds`**: A container component that spawns multiple `Cloud` instances at various predefined positions.
- **Animations**: Clouds drift slowly across the scene along the X-axis (wrapping around the bounds) and have a gentle vertical bobbing motion.

### `Model.tsx`
A simple wrapper component that loads and renders the main 3D terrain.
- **Assets**: Loads the GLTF model located at `/public/models/test_terrain_for_Nige_v002.gltf`.
- **Optimization**: Utilizes `useGLTF.preload` to ensure the model is loaded before the component mounts.

### `ScrollMove.tsx`
A utility component that adds an alternative navigation method.
- **Functionality**: Listens for mouse wheel events and maps the `deltaY` to the `camera.position.z`, allowing for simple zoom/forward-backward movement independent of the bird controls.
- *Note*: This component is available for use but may not be active in the default `App.tsx` scene.

### `App.tsx`
The main orchestrator of the application. It sets up the R3F `Canvas`, lighting, and the user interface.
- **Scene Setup**: Configures `ambientLight`, `directionalLight`, and a `pointLight`.
- **UI Controls**: Includes a side panel for real-time adjustment of:
  - **Bird Name**: Sets the text for the bird's "poo" action.
  - **Background Color**: Changes the scene's clear color.
  - **Camera FOV**: Adjusts the field of view.
  - **Lighting Intensities**: Fine-tune ambient, directional, and point light levels.

## Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
- **Development**: `npm run dev` (Starts the Vite dev server)
- **Build**: `npm run build` (Builds for production)
- **Lint**: `npm run lint` (Checks for code style issues)

## Project Structure
- `public/models/`: Contains the 3D assets (GLTF/BIN).
- `src/`: Contains the React components and main application logic.
- `GEMINI.md`: Project-specific architectural guidelines.
