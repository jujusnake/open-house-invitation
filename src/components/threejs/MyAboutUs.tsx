import React, { useEffect, useRef, useState } from "react";
import { Float, Mask, useGLTF, useMask } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";

type Props = {};

const MyAboutUs = (props: Props) => {
  const { scene } = useGLTF("/models/frame_side1.glb");

  return (
    <>
      {/* <Float floatIntensity={2} rotationIntensity={0.1} speed={3}> */}
      <mesh
        scale={8}
        position={[-10, 5, -15]}
        rotation={new THREE.Euler(-0.3, 0.5, 0.1)}
      >
        <primitive object={scene} />
      </mesh>
      <PortalBox />
      {/* </Float> */}
    </>
  );
};

export default MyAboutUs;

const PortalBox = () => {
  const { scene } = useThree();
  const stencil = useMask(200, false);
  const image = useLoader(THREE.TextureLoader, ["/images/frame/main.jpg"]);
  const spotRef = useRef<THREE.SpotLight>(new THREE.SpotLight());

  useEffect(() => {
    if (spotRef.current) {
      const target = spotRef.current?.target;
      target.position.set(0, 2, -35);
      scene.add(target);
    }
  }, []);

  return (
    <>
      {/* <Mask
        id={200}
        position={[-10, 5, -15]}
        rotation={new THREE.Euler(-0.3, 0.5, 0.1)}
      > */}
      <mesh position={[-10, 5, -15]} rotation={new THREE.Euler(-0.3, 0.5, 0.1)}>
        <planeGeometry args={[4.8, 5.8, 1, 1]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
      {/* </Mask> */}

      <group
        position={[-12, -4.5, -18]}
        rotation={new THREE.Euler(-0.3, 0.5, 0.1)}
      >
        <mesh castShadow receiveShadow dispose={null} position={[0, 10, 0]}>
          <planeGeometry args={[10, 10, 1, 1]} />
          <meshPhongMaterial
            color="#3A2D26"
            // {...stencil}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          dispose={null}
          position={[0, 10 / 2, 10 / 2]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[10, 10, 1, 1]} />
          <meshPhongMaterial
            color="#3A2D26"
            // {...stencil}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          dispose={null}
          position={[0, 10 + 10 / 2, 10 / 2]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[10, 10, 1, 1]} />
          <meshPhongMaterial
            color="#3A2D26"
            // {...stencil}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          dispose={null}
          position={[-10 / 2, 10, 10 / 2]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
        >
          <planeGeometry args={[10, 10, 1, 1]} />
          <meshPhongMaterial
            color="#3A2D26"
            // {...stencil}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          dispose={null}
          position={[10 / 2, 10, 10 / 2]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        >
          <planeGeometry args={[10, 10, 1, 1]} />
          <meshPhongMaterial
            color="#3A2D26"
            // {...stencil}
          />
        </mesh>
      </group>
      <Float floatIntensity={2} rotationIntensity={0} speed={7}></Float>
      <Float
        floatIntensity={0.5}
        rotationIntensity={0.01}
        speed={7}
        {...stencil}
      >
        <mesh position={[0, 6, -30]}>
          <planeGeometry args={[7 * 1.5, 7]} />
          <meshBasicMaterial map={image[0]} transparent {...stencil} />
        </mesh>
      </Float>
      {/* <spotLight
        position={[0, 12, -26]}
        intensity={100}
        color={"#ffffff"}
        ref={spotRef}
        angle={Math.PI / 4}
        distance={30}
        penumbra={0.1}
        castShadow
      /> */}
    </>
  );
};
