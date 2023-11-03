import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  CameraControls,
  FlyControls,
  KeyboardControlsEntry,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
} from "@react-three/drei";
import MyCamera from "./threejs/MyCamera";
import MyDirecLight from "./threejs/MyDirecLight";
import MyWall from "./threejs/MyWall";
import MyPlane from "./threejs/MyPlane";
import MyPartyInfo from "./threejs/MyPartyInfo";
import MyAboutUs from "./threejs/MyAboutUs";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = { mode: "splash" | "content" };

const ThreeCanvas = ({ mode }: Props) => {
  return (
    <div className="w-full h-full shadow-[4px_4px_30px_5px_rgba(0,0,0,0.50)] bg-[#372e28]">
      <Canvas
        style={{ width: "100%", height: "100%" }}
        resize={{ offsetSize: true }}
      >
        <CanvasChildren />
      </Canvas>
      <HTMLElements />
    </div>
  );
};

export default ThreeCanvas;

const CanvasChildren = () => {
  const { progress } = useProgress();
  // console.log(progress); // 이걸로 로딩 처리해라

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [currentViewTarget, setCurrentViewTarget] = useState<
    "main" | "info" | "about" | "rsvp"
  >("main");

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
      <MyAboutUs />
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

const HTMLElements = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentPage = useMemo(
    () => searchParams.get("page") ?? "main",
    [searchParams]
  );

  return (
    <div className="fixed top-0 left-0 z-50 flex items-start w-full h-full gap-3 px-8 pointer-events-none py-9">
      <button
        className={`pointer-events-auto ${
          currentPage !== "main" ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        onClick={() => navigate("/main")}
        disabled={currentPage === "main"}
      >
        {/* Back Icon */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36 26.7279C37.1046 26.7279 38 25.8325 38 24.7279C38 23.6234 37.1046 22.7279 36 22.7279V26.7279ZM10.5858 23.3137C9.80474 24.0948 9.80474 25.3611 10.5858 26.1421L19.3137 34.8701C20.0948 35.6511 21.3611 35.6511 22.1421 34.8701C22.9232 34.0889 22.9232 32.8227 22.1421 32.0417L14.8284 24.7279L22.1421 17.4142C22.9232 16.6332 22.9232 15.3668 22.1421 14.5858C21.3611 13.8047 20.0948 13.8047 19.3137 14.5858L10.5858 23.3137ZM36 22.7279H12V26.7279H36V22.7279Z"
            fill="#AC9B92"
          />
        </svg>
      </button>

      {/* Info */}
      <section className="pointer-events-auto ">
        <h1 className="mb-3 font-playfair text-white text-[28px] font-bold tracing-[0.33px] mt-1">
          Sesame salt’s 1st open house party
        </h1>
        <p className="mb-3 text-base font-normal tracking-widest font-lato">
          We’re hosting a standing party with a showcase of our inspirational
          works, vast variety of beverages and light snacks. <br /> Dress Code :
          Gatsby Chic <br />
        </p>
        <p className="text-base font-normal tracking-widest font-lato">
          October 30th, 2023 from 20:00 <br />
          @Moonriver Classic Bar (10-4, Dosan-daero 45-gil, Gangnam-gu, Seoul)
        </p>
      </section>
    </div>
  );
};
