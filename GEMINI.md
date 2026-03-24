# beards-world

## Project Overview

**beards-world** is a 3D web application built with **React 19**, **Vite 8**, and **TypeScript**. It utilizes **Three.js** via **React Three Fiber (@react-three/fiber)** and **Drei (@react-three/drei)** to render an interactive 3D environment.

The core of the application features a 3D terrain model loaded from a GLTF file, with custom camera controls combining `OrbitControls` and a specialized scroll-based movement system.

### Main Technologies
- **React 19**: Frontend framework.
- **Vite 8**: Build tool and development server.
- **TypeScript**: Static typing.
- **Three.js**: 3D engine.
- **React Three Fiber**: React renderer for Three.js.
- **@react-three/drei**: Useful helpers and abstractions for Three.js in React.

### Architecture
- **Entry Point**: `src/main.tsx` initializes the React application.
- **Main Component**: `src/App.tsx` sets up the `Canvas` with fixed dimensions (1024x768), centered on the screen. It configures lighting, environment, and coordinates the 3D scene.
- **3D Model**: `src/Model.tsx` uses `useGLTF` to load and display the terrain model located at `/public/models/test_terrain_for_Nige_v002.gltf`.
- **Navigation**:
    - `OrbitControls`: Standard mouse/touch camera interaction.
    - `ScrollMove.tsx`: A custom component that maps mouse wheel scroll events to `camera.position.z` movement.

---

## Building and Running

The project uses standard npm scripts defined in `package.json`:

- **Development**:
  ```bash
  npm run dev
  ```
  Starts the Vite development server.

- **Build**:
  ```bash
  npm run build
  ```
  Runs TypeScript type checking (`tsc -b`) and builds the production-ready assets using Vite.

- **Linting**:
  ```bash
  npm run lint
  ```
  Executes ESLint to check for code quality and style issues.

- **Preview**:
  ```bash
  npm run preview
  ```
  Serves the locally built production files for previewing.

---

## Development Conventions

- **Component Structure**: 3D components should be separated from UI logic. Use `@react-three/drei` helpers whenever possible to simplify Three.js boilerplate.
- **Assets**: 3D models and textures are stored in the `public/models/` directory.
- **Styling**: The application uses `App.css` and `index.css` for global styles. The main `Canvas` is styled within `App.tsx` to maintain a fixed aspect ratio and centered layout.
- **TypeScript**: Strict type checking is enabled. Ensure new components have proper type definitions for props and state.
- **3D Workflow**:
    - Preload GLTF models using `useGLTF.preload` in the model component files.
    - Use `Environment` from `drei` for consistent lighting (currently using "sunset" preset).
