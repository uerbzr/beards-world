import { useGLTF } from "@react-three/drei";

export function Model(props: any) {
  const gltf = useGLTF("/models/test_terrain_for_Nige_v002.gltf");
  return <primitive object={gltf.scene} {...props} />;
}

useGLTF.preload("/models/test_terrain_for_Nige_v002.gltf");
