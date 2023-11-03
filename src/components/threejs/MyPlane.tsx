import React from "react";
import * as THREE from "three";

type Props = {};

const MyPlane = (props: Props) => {
  return (
    <mesh
      position={[0, -0, 0]}
      receiveShadow={true}
      castShadow
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[25, 50, 25, 50]} />
      <meshStandardMaterial color={new THREE.Color("#A39289")} />
    </mesh>
  );
};

export default MyPlane;
