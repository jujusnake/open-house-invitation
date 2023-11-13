import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CameraControls, FlyControls, KeyboardControlsEntry, OrbitControls, PerspectiveCamera, useProgress } from "@react-three/drei";
import MyCamera from "./threejs/MyCamera";
import MyDirecLight from "./threejs/MyDirecLight";
import MyWall from "./threejs/MyWall";
import MyPlane from "./threejs/MyPlane";
import MyPartyInfo from "./threejs/MyPartyInfo";
import MyAboutUs from "./threejs/MyAboutUs";
import { useNavigate, useSearchParams } from "react-router-dom";
import MyRSVP from "./threejs/MyRSVP";
import HTMLElements from "./html/HTMLElements";

type Props = {
  mode: "splash" | "content";
  onProgress?: (progress: number) => void;
};

const ThreeCanvas = ({ mode, onProgress }: Props) => {
  return (
    <div className="w-full h-full bg-[#372e28]">
      <Canvas style={{ width: "100%", height: "100%" }} resize={{ offsetSize: true }}>
        <CanvasChildren onProgress={onProgress} />
      </Canvas>
      <HTMLElements />
    </div>
  );
};

export default ThreeCanvas;

const CanvasChildren = ({ onProgress }: { onProgress?: (progress: number) => void }) => {
  const { progress } = useProgress();

  useEffect(() => {
    onProgress && onProgress(progress);
  }, [progress, onProgress]);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [currentViewTarget, setCurrentViewTarget] = useState<"main" | "info" | "about" | "rsvp">("main");

  useEffect(() => {
    const page = searchParams.get("page");
    if (page === null) {
      setCurrentViewTarget("main");
    } else {
      setCurrentViewTarget(page as "main" | "info" | "about" | "rsvp");
    }
  }, [searchParams]);

  return (
    <>
      <MyPlane />
      <MyWall />
      <MyDirecLight />
      <MyCamera target={currentViewTarget} />

      {/* Frames */}
      <MyPartyInfo
        selected={currentViewTarget === "info"}
        onSelect={() => {
          setCurrentViewTarget("info");
          navigate("?page=info");
        }}
      />
      <MyAboutUs
        selected={currentViewTarget === "about"}
        onSelect={() => {
          setCurrentViewTarget("about");
          navigate("?page=about");
        }}
      />
      <MyRSVP
        selected={currentViewTarget === "rsvp"}
        onSelect={() => {
          setCurrentViewTarget("rsvp");
          navigate("?page=rsvp");
        }}
      />
      <Helpers />
    </>
  );
};

const Helpers = () => {
  return (
    <>
      {/* <mesh
        position={[0, 0.5, 0]}
        // rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow={true}
        castShadow
      >
        <boxGeometry args={[1, 1, 1, 1]} />
        <meshStandardMaterial color={new THREE.Color("#f6b1b1")} />
      </mesh>
      <mesh
        position={[-3, 0.5, 0]}
        // rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow={true}
        castShadow
      >
        <boxGeometry args={[1, 1, 1, 1]} />
        <meshStandardMaterial color={new THREE.Color("#f6b1b1")} />
      </mesh>
      <mesh
        position={[3, 0.5, 0]}
        // rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow={true}
        castShadow
      >
        <boxGeometry args={[1, 1, 1, 1]} />
        <meshStandardMaterial color={new THREE.Color("#f6b1b1")} />
      </mesh>
      <spotLight
        color={new THREE.Color("#198449")}
        position={[0, 2, 0]}
        intensity={100}
        lookAt={() => new THREE.Vector3(0, 0, 0)}
        castShadow
      /> */}
      {/* <OrbitControls zoomSpeed={10} position={[0, 0, 0]} /> */}
    </>
  );
};
