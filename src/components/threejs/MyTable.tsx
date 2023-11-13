import { Float, useGLTF } from "@react-three/drei";
import React from "react";

type Props = {};

const MyTable = (props: Props) => {
  const gltf = useGLTF(["/models/table.glb", "/models/teapot.glb", "/models/teapot_lid.glb"]);

  return (
    <group position={[0, 0, -8]} scale={[1.1, 1.1, 1.1]}>
      <Float floatIntensity={0.2} rotationIntensity={0.1} speed={5}>
        <mesh position={[2, 0.5, 2]} scale={[2.5, 2.5, 2.5]}>
          <primitive object={gltf[0].scene} />
        </mesh>
      </Float>
      <Float floatIntensity={0.2} rotationIntensity={0.1} speed={5}>
        <mesh position={[3.5, 3.5, 3]} scale={[4, 4, 4]} rotation={[0, 0, -0.2]}>
          <primitive object={gltf[1].scene} />
        </mesh>
      </Float>
      <Float floatIntensity={0.2} rotationIntensity={0.1} speed={5}>
        <mesh position={[3, 4.8, 6]} scale={[4, 4, 4]} rotation={[0, 0, 0.2]}>
          <primitive object={gltf[2].scene} />
        </mesh>
      </Float>
    </group>
  );
};

export default MyTable;
