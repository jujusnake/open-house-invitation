import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

type Props = { target?: "main" | "info" | "about" | "rsvp" };

const MyCamera = ({ target = "main" }: Props) => {
  const ref = useRef<THREE.PerspectiveCamera | null>(null);

  const [currentLookat, setCurrentLookat] = useState<number[]>([0, 4.5, 0]);
  const [mousePos, setMousePos] = useState<[number, number]>([0, 0]);
  const prevLookatRef = useRef<number[]>([0, 4.5, -10]);

  const LOOKAT = useMemo(() => {
    switch (target) {
      case "main":
        return [0, 4.5, -10];
      case "info":
        return [0, 6.5, -30];
      default:
        return [0, 4.5, 0];
    }
  }, [target]);

  const CAMERA_POSITION = useMemo(() => {
    switch (target) {
      case "main":
        return [0, 7, 17];
      case "info":
        return [0, 6.5, -19];
      default:
        return [0, 7, 17];
    }
  }, [target]);

  useEffect(() => {
    window.addEventListener("mousemove", cameraFollowMouse);
    return () => window.removeEventListener("mousemove", cameraFollowMouse);
  }, []);

  useFrame(({ camera }, delta) => {
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      CAMERA_POSITION[0] + mousePos[0],
      4,
      delta
    );

    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      CAMERA_POSITION[1] - mousePos[1],
      4,
      delta
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      CAMERA_POSITION[2],
      4,
      delta
    );

    const newLookatX = THREE.MathUtils.damp(
      prevLookatRef.current[0],
      LOOKAT[0],
      4,
      delta
    );
    const newLookatY = THREE.MathUtils.damp(
      prevLookatRef.current[1],
      LOOKAT[1],
      4,
      delta
    );
    const newLookatZ = THREE.MathUtils.damp(
      prevLookatRef.current[2],
      LOOKAT[2],
      4,
      delta
    );

    // console.log(newLookatY);
    prevLookatRef.current = [newLookatX, newLookatY, newLookatZ];
    camera.lookAt(newLookatX, newLookatY, newLookatZ);
  });

  const cameraFollowMouse = (e: MouseEvent) => {
    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    setMousePos([x, y]);
  };

  return (
    // <PerspectiveCamera makeDefault position={[0, 7, 17]} far={100} ref={ref} />
    <PerspectiveCamera makeDefault far={100} ref={ref} />
  );
};

export default MyCamera;
