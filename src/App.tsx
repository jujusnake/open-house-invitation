import React, { useEffect, useState } from "react";
import Splash from "./components/Splash";
import FlipCard from "./components/common/FlipCard";
import ThreeCanvas from "./components/ThreeCanvas";

const App = ({ mode }: { mode: "splash" | "content" }) => {
  const [loading, setLoading] = useState<number>(0);

  return (
    <div className="text-ohi-text-contrast text-3xl h-[100dvh] w-full min-w-[556px] min-h-[520px] overflow-hidden">
      <div
        className={`w-full h-full ${
          mode === "splash" ? "scale-[.6]" : "scale-100"
        }  transition-transform duration-[1.9s] ease-out`}
      >
        <FlipCard
          frontElem={<Splash progress={loading} />}
          backElem={
            <ThreeCanvas
              mode={mode}
              onProgress={(progress: number) => setLoading(progress)}
            />
          }
          isBack={mode === "content"}
        />
      </div>
    </div>
  );
};

export default App;
