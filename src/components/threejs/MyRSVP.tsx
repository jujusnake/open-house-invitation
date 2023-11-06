import React, { useEffect, useRef, useState } from "react";
import { Float, Mask, useGLTF, useMask } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";

type Props = { selected: boolean; onSelect: () => void };

const MyRSVP = ({ selected, onSelect }: Props) => {
  const { scene } = useGLTF("/models/frame_side2.glb");
  const frameRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (frameRef.current) {
      const group = frameRef.current?.children[0] as THREE.Group;
      group.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshStandardMaterial;
          material.transparent = true;
        }
      });

      const mesh2 = frameRef.current?.children[1] as THREE.Mesh;
      const material2 = mesh2.material as THREE.MeshStandardMaterial;
      material2.transparent = true;
    }
  }, []);

  useFrame((state, delta) => {
    if (frameRef.current) {
      const group = frameRef.current?.children[0] as THREE.Group;
      group.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshStandardMaterial;
          material.transparent = true;
        }
      });

      const mesh2 = frameRef.current?.children[1] as THREE.Mesh;
      const material2 = mesh2.material as THREE.MeshStandardMaterial;
      material2.transparent = true;
    }

    if (frameRef.current) {
      const mesh = frameRef.current.children[0].children[0] as THREE.Mesh;
      const material = mesh.material as THREE.MeshStandardMaterial;
      const dampedOpacity = THREE.MathUtils.damp(material.opacity, selected ? 0 : 1, 3.5, delta);
      material.opacity = dampedOpacity;
      const mesh2 = frameRef.current.children[0].children[1] as THREE.Mesh;
      const material2 = mesh2.material as THREE.MeshStandardMaterial;
      const dampedOpacity2 = THREE.MathUtils.damp(material2.opacity, selected ? 0 : 1, 3.5, delta);
      material2.opacity = dampedOpacity2;
    }
  });

  return (
    <>
      <mesh
        scale={12}
        position={[6, 4, -17]}
        rotation={new THREE.Euler(-0.3, -0.5, 0)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect && onSelect();
          document.documentElement.style.setProperty("cursor", "default");
        }}
        onPointerOver={() => selected === false && document.documentElement.style.setProperty("cursor", "pointer")}
        onPointerLeave={() => document.documentElement.style.setProperty("cursor", "default")}
      >
        <primitive object={scene} ref={frameRef} />
      </mesh>
    </>
  );
};

export default MyRSVP;
