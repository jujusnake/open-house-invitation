import { Html } from "@react-three/drei";
import React, { useState } from "react";

type Props = { visible: boolean };

const MyLabels = ({ visible }: Props) => {
  return (
    <>
      {/* Info */}
      <Html distanceFactor={10} zIndexRange={[100, 0]} position={[3, 11, -24]}>
        <div
          className={`select-none flex gap-4 ${
            visible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        >
          <svg
            width="312"
            height="240"
            viewBox="0 0 312 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-7"
          >
            <path
              d="M6.16747 238.283C11.4192 240.952 17.8402 238.858 20.5092 233.607C23.1781 228.355 21.0843 221.934 15.8325 219.265C10.5808 216.596 4.15976 218.69 1.49082 223.942C-1.17811 229.193 0.915696 235.614 6.16747 238.283ZM139.688 2.42892L139.688 0.428916L138.525 0.428916L137.95 1.44042L139.688 2.42892ZM12.7386 229.763L141.427 3.41742L137.95 1.44042L9.26136 227.786L12.7386 229.763ZM139.688 4.42892L311.392 4.42894L311.392 0.428944L139.688 0.428916L139.688 4.42892Z"
              fill="white"
            />
          </svg>
          <div className="text-6xl font-semibold font-playfairsc whitespace-nowrap">
            Party Info.
          </div>
        </div>
      </Html>

      {/* RSVP */}
      <Html
        distanceFactor={10}
        zIndexRange={[100, 0]}
        position={[7.3, 2.2, -16.5]}
      >
        <div
          className={`select-none flex flex-col items-center gap-4 ${
            visible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        >
          <svg
            width="22"
            height="312"
            viewBox="0 0 22 312"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 0.333333C5.10898 0.333333 0.333347 5.10896 0.333346 11C0.333346 16.891 5.10898 21.6667 11 21.6667C16.8911 21.6667 21.6667 16.891 21.6667 11C21.6667 5.10896 16.8911 0.333334 11 0.333333ZM9.00001 11L8.99997 312L13 312L13 11L9.00001 11Z"
              fill="white"
            />
          </svg>
          <div className="text-5xl font-semibold font-playfairsc whitespace-nowrap">
            RSVP
          </div>
        </div>
      </Html>

      {/* About us */}
      <Html
        distanceFactor={10}
        zIndexRange={[100, 0]}
        position={[-8.5, 4, -14]}
      >
        <div
          className={`select-none flex flex-col items-end ${
            visible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        >
          <svg
            width="513"
            height="150"
            viewBox="0 0 513 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pr-32"
          >
            <path
              d="M0.333333 11C0.333333 16.891 5.10896 21.6667 11 21.6667C16.891 21.6667 21.6667 16.891 21.6667 11C21.6667 5.10897 16.891 0.333337 11 0.333337C5.10896 0.333337 0.333333 5.10897 0.333333 11ZM411.376 11L412.993 9.82375L412.394 9L411.376 9L411.376 11ZM11 13L411.376 13L411.376 9L11 9L11 13ZM409.758 12.1763L509.382 149.176L512.618 146.824L412.993 9.82375L409.758 12.1763Z"
              fill="white"
            />
          </svg>
          <div className="text-5xl font-semibold font-playfairsc whitespace-nowrap">
            About us
          </div>
        </div>
      </Html>
    </>
  );
};

export default MyLabels;
