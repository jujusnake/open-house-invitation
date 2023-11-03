import React, { useState } from "react";
import { Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

type Props = {};

const MyAboutUs = (props: Props) => {
  const { scene } = useGLTF("/models/frame_side1.glb");
  const [yPosition, setYPosition] = useState<number>(5);

  return (
    <Float floatIntensity={2} rotationIntensity={0.1} speed={3}>
      <mesh
        scale={8}
        position={[-10, yPosition, -18]}
        rotation={new THREE.Euler(-0.3, 0.5, 0.1)}
      >
        <primitive object={scene} />
      </mesh>
    </Float>
  );
};

export default MyAboutUs;
