import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
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
import MyRSVP from "./threejs/MyRSVP";
import HTMLElements from "./html/HTMLElements";
import MyTable from "./threejs/MyTable";
import MyLabels from "./threejs/MyLabels";

type Props = {
  mode: "splash" | "content";
};

const ThreeCanvas = ({ mode }: Props) => {
  return (
    <div className="w-full h-full bg-[#372e28]">
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
    <Suspense fallback={null}>
      <MyPlane />
      <MyWall />
      <MyDirecLight />
      <MyCamera target={currentViewTarget} />

      {/* Objects & Labels */}
      <MyTable />
      <MyLabels visible={currentViewTarget === "main"} />

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
    </Suspense>
  );
};
