import React from "react";
import Picture from "./common/Picture";
import Loader from "./common/Loader";
import { useNavigate } from "react-router-dom";

type Props = {};

const Splash = (props: Props) => {
  const navigate = useNavigate();

  const proceedToMain = () => {
    navigate("/main");
  };

  return (
    <div className="relative flex flex-col w-full h-full overflow-hidden rounded">
      <Picture
        src="/images/splash/bg"
        aria-disabled
        className="absolute object-cover w-full h-full -z-10"
      />
      <section className="flex flex-col items-center justify-center h-full p-4">
        <h1 className="text-ohi-text-normal font-playfairsc text-[48px] tracking-[0.5px] mb-12">
          You’re Invited
        </h1>
        <Loader progress={100} onEnter={proceedToMain} />
      </section>
      <aside className="uppercase text-ohi-text-normal text-center text-base tracking-[0.2px] mb-10">
        Sesame Salt
        <br />
        October 30th, 2023
      </aside>
    </div>
  );
};

export default Splash;
