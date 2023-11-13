import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RSVPForm from "./RSVPForm";

const HTMLElements = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentPage = useMemo(() => searchParams.get("page") ?? "main", [searchParams]);

  const [expand, setExpand] = useState<boolean>(false);

  const handleBtnClick = () => {
    if (currentPage === "main") {
      setExpand((prev) => !prev);
    } else {
      navigate("/main");
    }
  };

  const handleNavBtnClick = (target: "back" | "info" | "about" | "rsvp") => {
    setExpand(false);
    if (target === "back") {
      navigate("/");
    } else {
      navigate("?page=" + target);
    }
  };

  const buttonIcon = useMemo(() => {
    if (currentPage !== "main") {
      return (
        // Back Icon
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M36 26.7279C37.1046 26.7279 38 25.8325 38 24.7279C38 23.6234 37.1046 22.7279 36 22.7279V26.7279ZM10.5858 23.3137C9.80474 24.0948 9.80474 25.3611 10.5858 26.1421L19.3137 34.8701C20.0948 35.6511 21.3611 35.6511 22.1421 34.8701C22.9232 34.0889 22.9232 32.8227 22.1421 32.0417L14.8284 24.7279L22.1421 17.4142C22.9232 16.6332 22.9232 15.3668 22.1421 14.5858C21.3611 13.8047 20.0948 13.8047 19.3137 14.5858L10.5858 23.3137ZM36 22.7279H12V26.7279H36V22.7279Z"
            fill="#8C5B5B"
          />
        </svg>
      );
    } else if (expand === false) {
      return (
        // Bars Icon
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.2414 17C21.6444 17 26.3556 17 34.7586 17C35.5862 17 36 16.3284 36 15.5C36 14.6716 35.5862 14 34.7586 14C34.7586 14 19.5576 14.0003 13.2414 14C12.4138 14 12 14.6716 12 15.5C12 16.3284 12.4138 17 13.2414 17Z" fill="#AC9B92" />
          <path d="M13.2414 25C21.6444 25 26.3556 25 34.7586 25C35.5862 25 36 24.3284 36 23.5C36 22.6716 35.5862 22 34.7586 22C34.7586 22 19.5576 22.0003 13.2414 22C12.4138 22 12 22.6716 12 23.5C12 24.3284 12.4138 25 13.2414 25Z" fill="#AC9B92" />
          <path d="M13.2414 33C21.6444 33 26.3556 33 34.7586 33C35.5862 33 36 32.3284 36 31.5C36 30.6716 35.5862 30 34.7586 30C34.7586 30 19.5576 30.0003 13.2414 30C12.4138 30 12 30.6716 12 31.5C12 32.3284 12.4138 33 13.2414 33Z" fill="#AC9B92" />
        </svg>
      );
    } else {
      return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.2519 15.4894C20.3923 22.6298 24.3956 26.6332 31.536 33.7736C32.2392 34.4768 33.128 34.2913 33.7905 33.6288C34.453 32.9662 34.6385 32.0775 33.9353 31.3743C33.9353 31.3743 21.0181 18.4576 15.6511 13.0901C14.9479 12.3869 14.0592 12.5724 13.3966 13.2349C12.7341 13.8975 12.5486 14.7862 13.2519 15.4894Z"
            fill="#AC9B92"
          />
          <path
            d="M15.5056 33.7382C22.646 26.5978 26.6494 22.5945 33.7898 15.4541C34.493 14.7508 34.3075 13.8621 33.645 13.1996C32.9824 12.537 32.0937 12.3516 31.3905 13.0548C31.3905 13.0548 18.4738 25.972 13.1063 31.3389C12.4031 32.0422 12.5886 32.9309 13.2511 33.5934C13.9137 34.256 14.8024 34.4415 15.5056 33.7382Z"
            fill="#AC9B92"
          />
        </svg>
      );
    }
  }, [expand, currentPage]);

  return (
    <div className="fixed top-0 left-0 z-50 flex items-start w-full h-full gap-3 px-8 pointer-events-none py-9">
      {currentPage === "rsvp" && <RSVPForm />}

      <button className={`pointer-events-auto relative`} onClick={handleBtnClick}>
        {buttonIcon}

        {/* Dropdown */}
        <div onClick={(e) => e.stopPropagation()} className={`absolute left-0.5 right-0.5 top-full border-ohi-front rounded-[24px] ${expand ? "max-h-[200px] py-5 px-2 border" : "max-h-0 p-0 border-[0px]"} overflow-hidden transition-all duration-300`}>
          <button onClick={() => handleNavBtnClick("info")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.9273 4.924C12.5513 4.924 13.0313 5.056 13.3673 5.32C13.7153 5.572 13.8893 5.956 13.8893 6.472C13.8893 6.988 13.7153 7.378 13.3673 7.642C13.0313 7.894 12.5513 8.02 11.9273 8.02C11.3033 8.02 10.8173 7.894 10.4693 7.642C10.1333 7.378 9.9653 6.988 9.9653 6.472C9.9653 5.956 10.1333 5.572 10.4693 5.32C10.8173 5.056 11.3033 4.924 11.9273 4.924ZM13.6553 9.46V17.326C13.6553 17.83 13.7273 18.172 13.8713 18.352C14.0273 18.532 14.2913 18.622 14.6633 18.622V19C14.4233 18.988 14.0633 18.976 13.5833 18.964C13.1033 18.94 12.6113 18.928 12.1073 18.928C11.6033 18.928 11.0933 18.94 10.5773 18.964C10.0613 18.976 9.6713 18.988 9.4073 19V18.622C9.7793 18.622 10.0373 18.532 10.1813 18.352C10.3373 18.172 10.4153 17.83 10.4153 17.326V11.62C10.4153 11.08 10.3433 10.684 10.1993 10.432C10.0553 10.168 9.7913 10.036 9.4073 10.036V9.658C9.7913 9.694 10.1633 9.712 10.5233 9.712C11.1233 9.712 11.6813 9.694 12.1973 9.658C12.7253 9.61 13.2113 9.544 13.6553 9.46Z"
                fill="#AC9B92"
              />
            </svg>
          </button>
          <button onClick={() => handleNavBtnClick("about")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="12" cy="8.88888" rx="2.82353" ry="2.88888" fill="#AC9B92" />
              <ellipse cx="19.7647" cy="11.0556" rx="2.11765" ry="2.16666" fill="#AC9B92" />
              <ellipse cx="4.23529" cy="11.0556" rx="2.11765" ry="2.16666" fill="#AC9B92" />
              <path d="M7.41176 13.5832C6.70588 14.6665 6.35294 18.2776 6.35294 18.2776H12L12 12.4999L9.88228 12.4999C8.47057 12.4999 8.11763 12.4999 7.41176 13.5832Z" fill="#AC9B92" />
              <path d="M16.5882 13.5832C17.2941 14.6666 17.6471 18.2777 17.6471 18.2777L12 18.2776L12 12.4999L14.1177 12.4999C15.5294 12.4999 15.8824 12.4999 16.5882 13.5832Z" fill="#AC9B92" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.6471 18.2777C18.349 18.2059 18.3494 18.2054 18.3494 18.2054L17.6471 18.2777ZM18.3565 18.2777L18.3494 18.2054L18.3491 18.2023L18.3482 18.1935L18.3449 18.161C18.342 18.1329 18.3377 18.0921 18.332 18.0401C18.3207 17.9362 18.3037 17.7873 18.2811 17.6056C18.2361 17.2427 18.1684 16.746 18.0778 16.213C17.9875 15.6819 17.8727 15.1038 17.7319 14.5817C17.6755 14.3725 17.6117 14.1596 17.539 13.9555C17.7157 13.9444 17.9234 13.9444 18.1764 13.9444L21.353 13.9444C22.4118 13.9444 22.6765 13.9444 23.2059 14.7569C23.7353 15.5694 24 18.2777 24 18.2777L18.3565 18.2777ZM5.64354 18.2777L5.65056 18.2058L5.65179 18.1935L5.6551 18.161C5.658 18.1329 5.66229 18.0921 5.66798 18.0401C5.67935 17.9361 5.69631 17.7873 5.71886 17.6055C5.76389 17.2427 5.8316 16.746 5.9222 16.213C6.01247 15.6819 6.1273 15.1038 6.26806 14.5817C6.32447 14.3725 6.38825 14.1596 6.46101 13.9555C6.28424 13.9444 6.07658 13.9444 5.82358 13.9444L2.64701 13.9444C1.58822 13.9444 1.32352 13.9444 0.794117 14.7568C0.264706 15.5693 0 18.2777 0 18.2777L5.64354 18.2777Z"
                fill="#AC9B92"
              />
            </svg>
          </button>
          <button onClick={() => handleNavBtnClick("rsvp")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.68854 6.39114L10.4427 12.5657C11.3541 13.2915 12.6459 13.2915 13.5573 12.5657L21.3115 6.39114L20.772 5.71363C21.2082 5.97597 21.5 6.4539 21.5 7V17C21.5 17.8284 20.8284 18.5 20 18.5H4C3.17157 18.5 2.5 17.8284 2.5 17V7C2.5 6.4539 2.79183 5.97597 3.22804 5.71363L2.68854 6.39114ZM20.6436 5.64468L12.9344 11.7835C12.3876 12.2189 11.6124 12.2189 11.0656 11.7835L3.35645 5.64468C3.55146 5.55191 3.76967 5.5 4 5.5H20C20.2303 5.5 20.4485 5.55191 20.6436 5.64468Z"
                stroke="#AC9B92"
              />
              <circle cx="18" cy="15" r="1" fill="#AC9B92" />
            </svg>
          </button>
          <button onClick={() => handleNavBtnClick("back")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 13.364C18.5523 13.364 19 12.9162 19 12.364C19 11.8117 18.5523 11.364 18 11.364V13.364ZM5.29289 11.6569C4.90237 12.0474 4.90237 12.6805 5.29289 13.0711L9.65685 17.4351C10.0474 17.8256 10.6805 17.8256 11.0711 17.4351C11.4616 17.0445 11.4616 16.4114 11.0711 16.0209L7.41421 12.364L11.0711 8.70711C11.4616 8.31658 11.4616 7.68342 11.0711 7.29289C10.6805 6.90237 10.0474 6.90237 9.65685 7.29289L5.29289 11.6569ZM18 11.364H6V13.364H18V11.364Z"
                fill="#AC9B92"
              />
            </svg>
          </button>
        </div>
      </button>

      <div className="relative w-full">
        {/* Main */}
        <section className={`${currentPage === "main" ? "opacity-100 delay-300 pointer-events-auto" : "opacity-0  pointer-events-none"} transition-opacity duration-500 absolute top-0 left-0`}>
          <h1 className="mb-4 font-playfair text-white text-[28px] font-bold tracing-[0.33px] mt-1">Welcome, saltiers</h1>
          <p className="mb-3 text-base font-normal tracking-widest font-lato">
            We are sesame salt, group of creators conspiring unconventional things.
            <br />
            You are invited to our first ever “super-exclusive” open house party.
            <br />
            Please click on the pictures for more information and inquiry.
          </p>
        </section>

        {/* Info */}
        <section className={`${currentPage === "info" ? "opacity-100 delay-300 pointer-events-auto" : "opacity-0  pointer-events-none"} transition-opacity duration-500 absolute top-0 left-0`}>
          <h1 className="mb-4 font-playfair text-white text-[28px] font-bold tracing-[0.33px] mt-1">Sesame salt’s 1st open house party</h1>
          <p className="mb-3 text-base font-normal tracking-widest font-lato">
            We’re hosting a standing party with a showcase of our inspirational works, vast variety of beverages and light snacks. <br /> Dress Code : Gatsby Chic <br />
          </p>
          <p className="text-base font-normal tracking-widest font-lato">
            October 30th, 2023 from 20:00 <br />
            @Moonriver Classic Bar (10-4, Dosan-daero 45-gil, Gangnam-gu, Seoul)
          </p>
        </section>

        {/* About us */}
        <section className={`${currentPage === "about" ? "opacity-100 delay-300 pointer-events-auto" : "opacity-0  pointer-events-none"} transition-opacity duration-500 absolute top-0 left-0`}>
          <h1 className="mb-4 font-playfair text-white text-[28px] font-bold tracing-[0.33px] mt-1">We are definitely worth our salt</h1>
          <p className="mb-3 text-base font-normal tracking-widest font-lato">
            Creative and fun. That’s our motto.
            <br />
            We aim to go beyond the norm and pursue making creative & user-oriented products.
          </p>
        </section>

        {/* RSVP */}
        <section className={`${currentPage === "rsvp" ? "opacity-100 delay-300 pointer-events-none" : "opacity-0  pointer-events-none"} transition-opacity duration-500 absolute top-0 left-0`}>
          <h1 className="mb-4 font-playfair text-white text-[28px] font-bold tracing-[0.33px] mt-1">RSVP & Inquiries</h1>
          <p className="mb-3 text-base font-normal tracking-widest font-lato">
            Please let us know if you’re attending. You may also leave any further inquiries.
            <br />
            Hope to see you soon ♡
          </p>
        </section>
      </div>
    </div>
  );
};

export default HTMLElements;
