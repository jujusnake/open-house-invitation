import React, { useEffect, useMemo, useRef } from "react";
import { Float, Mask, useGLTF, useHelper, useMask } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";

type Props = { selected: boolean; onSelect: () => void };

const MyAboutUs = ({ selected, onSelect }: Props) => {
  const { scene } = useGLTF("/models/frame_side1.glb");
  const frameRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (frameRef.current) {
      const mesh = frameRef.current?.children[0].children[0] as THREE.Mesh;
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.transparent = true;
      const mesh2 = frameRef.current?.children[0].children[1] as THREE.Mesh;
      const material2 = mesh2.material as THREE.MeshStandardMaterial;
      material2.transparent = true;
    }
  }, []);

  useFrame((state, delta) => {
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
      <Float floatIntensity={selected ? 0 : 2} rotationIntensity={selected ? 0 : 0.1} speed={3}>
        <mesh
          scale={8}
          position={[-10, 5, -15]}
          rotation={new THREE.Euler(-0.3, 0.5, 0.1)}
          onClick={(e) => {
            e.stopPropagation();
            onSelect && onSelect();
            document.documentElement.style.setProperty("cursor", "default");
          }}
          onPointerOver={() => selected === false && document.documentElement.style.setProperty("cursor", "pointer")}
          onPointerLeave={() => document.documentElement.style.setProperty("cursor", "default")}
          ref={frameRef}
        >
          <primitive object={scene} />
        </mesh>
        <PortalBox selected={selected} />
      </Float>
    </>
  );
};

export default MyAboutUs;

const PortalBox = ({ selected }: { selected: boolean }) => {
  const { scene } = useThree();
  const stencil = useMask(200, false);
  const image = useLoader(THREE.TextureLoader, ["/images/frame/sk.jpg", "/images/frame/se.jpg", "/images/frame/hg.jpg", "/images/frame/nj.jpg"]);
  const boxSize = useMemo(() => 7, []);
  const spotRef = useRef<THREE.SpotLight>(new THREE.SpotLight());

  useEffect(() => {
    const target = spotRef.current.target;
    target.position.set(-12.8, 4.6, -19);
    scene.add(target);
  }, [scene]);

  return (
    <>
      <Mask id={200} position={[-10, 5, -15]} rotation={new THREE.Euler(-0.3, 0.5, 0.1)}>
        <planeGeometry args={[4.8, 5.8, 1, 1]} />
        <meshBasicMaterial color="#fff" />
      </Mask>

      <group position={[-12.2, -2.6, -18]} rotation={new THREE.Euler(-0.3, 0.5, 0.1)}>
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

      <spotLight position={[-11, 7, -16]} ref={spotRef} intensity={selected ? 300 : 0} color={"#ffffff"} angle={Math.PI / 4} distance={30} penumbra={0.1} castShadow />

      <Float floatIntensity={0.5} rotationIntensity={0.01} speed={7}>
        <group position={[-12.5, 4, -19]} rotation={new THREE.Euler(-0.3, 0.5, 0.1)}>
          <mesh position={[-1.65, 1.2, 0]}>
            <planeGeometry args={[2 * 1.5, 2]} />
            <meshBasicMaterial map={image[0]} transparent {...stencil} />
          </mesh>
          <mesh position={[-1.65, -1.2, 0]}>
            <planeGeometry args={[2 * 1.5, 2]} />
            <meshBasicMaterial map={image[1]} transparent {...stencil} />
          </mesh>
          <mesh position={[1.65, 1.2, 0]}>
            <planeGeometry args={[2 * 1.5, 2]} />
            <meshBasicMaterial map={image[2]} transparent {...stencil} />
          </mesh>
          <mesh position={[1.65, -1.2, 0]}>
            <planeGeometry args={[2 * 1.5, 2]} />
            <meshBasicMaterial map={image[3]} transparent {...stencil} />
          </mesh>
        </group>
      </Float>
    </>
  );
};
