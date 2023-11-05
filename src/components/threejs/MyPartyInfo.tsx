import React, { useEffect, useMemo, useRef, useState } from "react";
import { Float, Mask, useGLTF, useMask } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

type Props = { selected: boolean; onSelect: () => void };

const MyPartyInfo = ({ selected, onSelect }: Props) => {
  const modelRef = useRef<THREE.Mesh | null>(null);
  const photoRef = useRef<THREE.Mesh | null>(null);
  const { scene } = useGLTF("/models/frame_main.glb");
  const image = useLoader(TextureLoader, "/images/frame/main.jpg");

  const imageSize = useMemo(() => 6, []);

  useEffect(() => {
    if (modelRef.current) {
      const mesh = modelRef.current?.children[0].children[0] as THREE.Mesh;
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.transparent = true;
    }
  }, []);

  useFrame((state, delta) => {
    if (modelRef.current) {
      const mesh = modelRef.current.children[0].children[0] as THREE.Mesh;
      const material = mesh.material as THREE.MeshStandardMaterial;
      const dampedOpacity = THREE.MathUtils.damp(material.opacity, selected ? 0 : 1, 3.5, delta);
      material.opacity = dampedOpacity;
    }

    if (photoRef.current) {
      const material = photoRef.current.material as THREE.MeshStandardMaterial;
      const dampedOpacity = THREE.MathUtils.damp(material.opacity, selected ? 0 : 1, 3.5, delta);
      material.opacity = dampedOpacity;
    }
  });

  return (
    <>
      <mesh scale={15} position={[0, 6.5, -25]} ref={modelRef} onClick={() => selected === false && onSelect()}>
        <primitive object={scene} />
      </mesh>
      <mesh
        position={[0, 6.5, -24.9]}
        ref={photoRef}
        onClick={(e) => {
          e.stopPropagation();
          selected === false && onSelect();
        }}
      >
        <planeGeometry args={[imageSize * 1.5, imageSize]} />
        <meshBasicMaterial map={image} transparent />
      </mesh>

      <PortalBox selected={selected} />
    </>
  );
};

export default MyPartyInfo;

const PortalBox = ({ selected }: { selected: boolean }) => {
  const { scene } = useThree();
  const stencil = useMask(100, false);
  const { scene: champagne } = useGLTF("/models/champagne.glb");
  const image = useLoader(TextureLoader, ["/images/frame/main.jpg", "/images/frame/main2.jpg", "/images/frame/main3.jpg"]);
  const [imageIdx, setImageIdx] = useState<number>(0);

  const champagneRef = useRef<any | null>(null);
  const spotRef = useRef<THREE.SpotLight>(new THREE.SpotLight());

  useEffect(() => {
    if (spotRef.current) {
      const target = spotRef.current?.target;
      target.position.set(0, 2, -35);
      scene.add(target);
    }
  }, []);

  useEffect(() => {
    if (champagneRef.current && stencil) {
      champagneRef.current.children[0].children.forEach((child: any) => {
        if (child instanceof THREE.Mesh) {
          if (child.material instanceof THREE.Material) {
            child.material.stencilWrite = stencil.stencilWrite;
            child.material.stencilRef = stencil.stencilRef;
            child.material.stencilFunc = stencil.stencilFunc;
            child.material.stencilFail = stencil.stencilFail;
            child.material.stencilZFail = stencil.stencilZFail;
            child.material.stencilZPass = stencil.stencilZPass;
          }
        }
      });
    }
  }, [stencil]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIdx((prev) => {
        if (prev > 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 3000);
    return () => {
      clearInterval(interval);
      setImageIdx(0);
    };
  }, [selected]);

  return (
    <>
      <Mask id={100} position={[0, 6.5, -24]}>
        <planeGeometry args={[8, 6, 1, 1]} />
        {/* <meshBasicMaterial color="#fff" /> */}
      </Mask>

      <mesh castShadow receiveShadow dispose={null} position={[0, 0, -30.1]}>
        <planeGeometry args={[40, 40, 1, 1]} />
        <meshPhongMaterial color="#3A2D26" {...stencil} />
      </mesh>
      <Float floatIntensity={2} rotationIntensity={0} speed={7}>
        <mesh position={[-2, 5, -27]} rotation={[-0.3, 0, -0.3]} scale={10}>
          <primitive object={champagne} {...stencil} ref={champagneRef} />
        </mesh>
      </Float>
      <Float floatIntensity={0.5} rotationIntensity={0.01} speed={7}>
        <mesh position={[0, 6, -30]}>
          <planeGeometry args={[7 * 1.5, 7]} />
          <meshBasicMaterial map={image[imageIdx]} transparent {...stencil} />
        </mesh>
      </Float>
      <spotLight position={[0, 12, -26]} intensity={100} color={"#ffffff"} ref={spotRef} angle={Math.PI / 4} distance={30} penumbra={0.1} castShadow />
    </>
  );
};
