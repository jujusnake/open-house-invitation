import { useMask } from "@react-three/drei";
import React, { useMemo } from "react";
import * as THREE from "three";

type Props = {};

const MyWall = (props: Props) => {
  const stencil = useMask(100, true);

  const constants = useMemo(() => {
    return { x: 0, y: 0, width: 25, height: 20 };
  }, []);

  const Wall = useMemo(() => {
    const radius = constants.width / 2;

    const shape = new THREE.Shape()
      .moveTo(constants.x, constants.y)
      .lineTo(constants.x, constants.y + constants.height - radius)
      .quadraticCurveTo(
        constants.x,
        constants.y + constants.height,
        constants.x + radius,
        constants.y + constants.height
      )
      .lineTo(
        constants.x + constants.width - radius,
        constants.y + constants.height
      )
      .quadraticCurveTo(
        constants.x + constants.width,
        constants.y + constants.height,
        constants.x + constants.width,
        constants.y + constants.height - radius
      )
      .lineTo(constants.x + constants.width, constants.y);

    return shape;
  }, [constants]);

  return (
    <mesh
      position={[-constants.width / 2, 0, -25]}
      receiveShadow={true}
      castShadow
    >
      <shapeGeometry args={[Wall]} />
      <meshStandardMaterial color={new THREE.Color("#B5A297")} {...stencil} />
    </mesh>
  );
};

export default MyWall;
