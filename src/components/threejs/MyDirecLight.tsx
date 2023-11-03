import React from "react";
import * as THREE from "three";

type Props = {};

const MyDirecLight = (props: Props) => {
  return (
    <directionalLight
      color={new THREE.Color("#ffffff")}
      position={[0, 8, 10]}
      intensity={3}
      lookAt={() => new THREE.Vector3(0, 3, -15)}
      castShadow={true}
    />
  );
};

export default MyDirecLight;
