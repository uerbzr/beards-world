import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(
  props: Partial<Omit<React.JSX.IntrinsicElements["primitive"], "object">>
) {
  const gltf = useGLTF("/models/test_terrain_for_Nige_v002.gltf");
  return <primitive object={gltf.scene} {...props} />;
}

useGLTF.preload("/models/test_terrain_for_Nige_v002.gltf");
