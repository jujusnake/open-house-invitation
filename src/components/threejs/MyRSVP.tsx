import React, { useEffect, useMemo, useRef, useState } from "react";
import { Float, Html, Mask, useGLTF, useMask } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";

type Props = { selected: boolean; onSelect: () => void };

const MyRSVP = ({ selected, onSelect }: Props) => {
  const { scene } = useGLTF("/models/frame_side2.glb");
  const frameRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (frameRef.current) {
      const group = frameRef.current.children[0];
      group.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshStandardMaterial;
          material.transparent = true;
        }
      });
    }
  }, []);

  useFrame((state, delta) => {
    if (frameRef.current) {
      const group = frameRef.current.children[0];
      group.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshStandardMaterial;
          const dampedOpacity = THREE.MathUtils.damp(material.opacity, selected ? 0 : 1, 3.5, delta);
          material.opacity = dampedOpacity;
        }
      });
    }
  });

  return (
    <>
      <Float floatIntensity={selected ? 0 : 2} rotationIntensity={selected ? 0 : 0.1} speed={3} position={[2, 0, 0]}>
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
        <PortalBox selected={selected} />
      </Float>
    </>
  );
};

export default MyRSVP;

const PortalBox = ({ selected }: { selected: boolean }) => {
  const { scene, camera } = useThree();
  const stencil = useMask(300, false);
  const image = useLoader(THREE.TextureLoader, ["/images/frame/sk.jpg", "/images/frame/se.jpg", "/images/frame/hg.jpg", "/images/frame/nj.jpg"]);
  const boxSize = useMemo(() => 7, []);
  const spotRef = useRef<THREE.SpotLight>(new THREE.SpotLight());
  const circleMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (spotRef.current) {
      const target = spotRef.current.target;
      target.position.set(-12.8, 4.6, -19);
      scene.add(target);
    }
  }, [scene]);

  useEffect(() => {
    if (circleMeshRef.current) {
      circleMeshRef.current.scale.set(1, 1.35, 1);
    }
  }, []);

  return (
    <>
      <Mask id={300} position={[6, 4, -17]} rotation={new THREE.Euler(-0.3, -0.5, 0)} ref={circleMeshRef}>
        {/* <mesh position={[6, 4, -17]} rotation={new THREE.Euler(-0.3, -0.5, 0)} ref={circleMeshRef}> */}
        <circleGeometry args={[1.9, 28, 0, Math.PI * 2]} />
        <meshStandardMaterial color={"#ffffff"} />
        {/* </mesh> */}
      </Mask>

      <group position={[8.5, -2.25, -19.5]} rotation={new THREE.Euler(-0.3, -0.5, 0)} scale={new THREE.Vector3(0.8, 0.8, 0.8)} renderOrder={3}>
        <mesh castShadow receiveShadow dispose={null} position={[0, boxSize, 0]}>
          <planeGeometry args={[boxSize, boxSize, 1, 1]} />
          <meshPhongMaterial color="#3A2D26" {...stencil} />
        </mesh>
        <mesh castShadow receiveShadow dispose={null} position={[0, boxSize / 2, boxSize / 2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[boxSize, boxSize, 1, 1]} />
          <meshPhongMaterial color="#3A2D26" {...stencil} />
        </mesh>
        <mesh castShadow receiveShadow dispose={null} position={[0, boxSize + boxSize / 2, boxSize / 2]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[boxSize, boxSize, 1, 1]} />
          <meshPhongMaterial color="#3A2D26" {...stencil} />
        </mesh>
        <mesh castShadow receiveShadow dispose={null} position={[-boxSize / 2, boxSize, boxSize / 2]} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
          <planeGeometry args={[boxSize, boxSize, 1, 1]} />
          <meshPhongMaterial color="#3A2D26" {...stencil} />
        </mesh>
        <mesh castShadow receiveShadow dispose={null} position={[boxSize / 2, boxSize, boxSize / 2]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
          <planeGeometry args={[boxSize, boxSize, 1, 1]} />
          <meshPhongMaterial color="#3A2D26" {...stencil} />
        </mesh>
      </group>

      {/* <Html
        as="div"
        wrapperClass="w-[80%] max-w-[780px] h-[80vh] max-h-[506px] rounded-[4px] bg-ohi-front shadow-[4px_4px_12px_4px_rgba(0,_0,_0,_0.35)]"
        // distanceFactor={10}
        zIndexRange={[100, 0]}
        // portal={domnodeRef}
        transform
        // sprite
        // calculatePosition={(el: Object3D, camera: Camera, size: { width: number; height: number }) => number[]}
        occlude="blending"
        onOcclude={(visible) => null}
        position={[6.9, 2.25, -21.5]}
        rotation={new THREE.Euler(-0.3, -0.5, 0)}
      >
        <div className={``}></div>
      </Html> */}

      {/* <spotLight position={[-11, 7, -16]} ref={spotRef} intensity={selected ? 300 : 0} color={"#ffffff"} angle={Math.PI / 4} distance={30} penumbra={0.1} castShadow /> */}
    </>
  );
};
