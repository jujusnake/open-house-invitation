import { useProgress } from "@react-three/drei";
import React, { useMemo } from "react";

type Props = { progress?: number; onEnter?: () => void; size?: number };

const Loader = ({ onEnter, size = 200 }: Props) => {
  const { progress } = useProgress();

  const handleEnter = () => {
    onEnter && onEnter();
  };

  return (
    <button
      className="relative"
      disabled={progress < 100}
      onClick={handleEnter}
    >
      <svg
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size, height: size }}
        fill="none"
        className="-rotate-90"
      >
        <circle cx="40" cy="40" r="34.5" stroke="#C0AFAF" strokeWidth={5} />
        <circle
          cx="40"
          cy="40"
          r="34.5"
          stroke="#8C5B5B"
          strokeWidth={5}
          strokeDasharray={2 * Math.PI * 34.5}
          strokeDashoffset={2 * Math.PI * 34.5 * ((100 - progress) / 100)}
          className="transition-all ease-linear"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size, height: size }}
        viewBox="0 0 80 80"
        fill="none"
        className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
          progress < 100
            ? "opacity-0"
            : "opacity-100 duration-500 delay-[600ms]"
        } transition-opacity`}
      >
        <g filter="url(#filter0_i_31_3859)">
          <circle cx="40" cy="40" r="34.5" stroke="#8C5B5B" strokeWidth="5" />
        </g>
        <defs>
          <filter
            id="filter0_i_31_3859"
            x="0.5"
            y="0.5"
            width="80"
            height="80"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="1" dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_31_3859"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 font-playfair text-2xl lg:text-[28px] tracking-[-0.12px] ${
          progress < 100 ? "opacity-100" : "opacity-0 duration-300 delay-300"
        } transition-opacity`}
      >
        <div className={`${progress < 100 && "animate-pulse"}`}>Loading</div>
      </div>
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 font-playfair text-2xl lg:text-[28px] tracking-[-0.12px] ${
          progress < 100
            ? "opacity-0"
            : "opacity-100 duration-300 delay-[600ms]"
        } transition-opacity`}
      >
        Enter
      </div>
    </button>
  );
};

export default Loader;
