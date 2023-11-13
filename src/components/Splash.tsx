import React, { useEffect, useMemo, useState } from "react";
import Picture from "./common/Picture";
import Loader from "./common/Loader";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  const proceedToMain = () => {
    navigate("/main");
  };

  const LoaderSize = useMemo(() => 220, []);

  return (
    <div className="relative flex flex-col w-full h-full overflow-hidden rounded shadow-[4px_4px_30px_5px_rgba(0,0,0,0.50)] pt-12 px-12 pb-6">
      <Picture
        src="/images/splash/bg"
        aria-disabled
        className="absolute top-0 left-0 object-cover w-full h-full -z-10"
      />
      <section className="flex flex-col items-center h-full gap-8">
        <h1
          className="flex items-center font-playfairsc text-ohi-text-normal text-[60px] leading-tight lg:text-[80px] tracking-[0.5px]"
          style={{ height: `calc(55% - ${LoaderSize / 2}px)` }}
        >
          You’re Invited
        </h1>
        <div className="h-[200px]" style={{ height: LoaderSize }}>
          <Loader onEnter={proceedToMain} size={LoaderSize} />
        </div>
        <aside
          className="flex items-end uppercase text-ohi-text-normal text-center text-xl lg:text-2xl tracking-[0.2px]"
          style={{ height: `calc(45% - ${LoaderSize / 2}px)` }}
        >
          Sesame Salt
          <br />
          October 30th, 2023
        </aside>
      </section>
    </div>
  );
};

export default Splash;
