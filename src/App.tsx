import React, { useEffect, useState } from "react";
import Splash from "./components/Splash";
import FlipCard from "./components/common/FlipCard";

const App = ({ mode }: { mode: "splash" | "content" }) => {
  return (
    <div className="text-ohi-text-contrast text-3xl h-[100dvh] w-full min-w-[556px] min-h-[520px] overflow-hidden">
      <div
        className={`w-full h-full ${
          mode === "splash" ? "scale-[.6]" : "scale-100"
        }  transition-transform duration-1000`}
      >
        <FlipCard
          frontElem={<Splash />}
          backElem={<div className="w-full h-full bg-black" />}
          isBack={mode === "content"}
        />
      </div>
    </div>
  );
};

export default App;
