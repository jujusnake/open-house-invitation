import React, { useEffect, useState } from "react";
import Splash from "./components/Splash";
import useQueryParams from "./hooks/useQueryParams";

const App = ({ mode }: { mode: "splash" | "content" }) => {
  return (
    <div className="text-ohi-text-contrast text-3xl h-[100dvh] w-full">
      <div className="fixed w-3/4 -translate-x-1/2 -translate-y-1/2 h-2/3 top-1/2 left-1/2">
        <Splash />
      </div>
      {mode === "content" && <div>content here!!</div>}
    </div>
  );
};

export default App;
