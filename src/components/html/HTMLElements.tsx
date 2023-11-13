import React, { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RSVPForm from "./RSVPForm";

const HTMLElements = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentPage = useMemo(() => searchParams.get("page") ?? "main", [searchParams]);

  const handleBtnClick = () => {
    if (currentPage === "main") {
    } else {
      navigate("/main");
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex items-start w-full h-full gap-3 px-8 pointer-events-none py-9">
      {currentPage === "rsvp" && <RSVPForm />}

      <button className={`pointer-events-auto relative`} onClick={handleBtnClick}>
        {currentPage === "main" ? (
          // Bars Icon
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.2414 17C21.6444 17 26.3556 17 34.7586 17C35.5862 17 36 16.3284 36 15.5C36 14.6716 35.5862 14 34.7586 14C34.7586 14 19.5576 14.0003 13.2414 14C12.4138 14 12 14.6716 12 15.5C12 16.3284 12.4138 17 13.2414 17Z" fill="#AC9B92" />
            <path d="M13.2414 25C21.6444 25 26.3556 25 34.7586 25C35.5862 25 36 24.3284 36 23.5C36 22.6716 35.5862 22 34.7586 22C34.7586 22 19.5576 22.0003 13.2414 22C12.4138 22 12 22.6716 12 23.5C12 24.3284 12.4138 25 13.2414 25Z" fill="#AC9B92" />
            <path d="M13.2414 33C21.6444 33 26.3556 33 34.7586 33C35.5862 33 36 32.3284 36 31.5C36 30.6716 35.5862 30 34.7586 30C34.7586 30 19.5576 30.0003 13.2414 30C12.4138 30 12 30.6716 12 31.5C12 32.3284 12.4138 33 13.2414 33Z" fill="#AC9B92" />
          </svg>
        ) : (
          // Back Icon
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M36 26.7279C37.1046 26.7279 38 25.8325 38 24.7279C38 23.6234 37.1046 22.7279 36 22.7279V26.7279ZM10.5858 23.3137C9.80474 24.0948 9.80474 25.3611 10.5858 26.1421L19.3137 34.8701C20.0948 35.6511 21.3611 35.6511 22.1421 34.8701C22.9232 34.0889 22.9232 32.8227 22.1421 32.0417L14.8284 24.7279L22.1421 17.4142C22.9232 16.6332 22.9232 15.3668 22.1421 14.5858C21.3611 13.8047 20.0948 13.8047 19.3137 14.5858L10.5858 23.3137ZM36 22.7279H12V26.7279H36V22.7279Z"
              fill="#8C5B5B"
            />
          </svg>
        )}
        {/* <div className="absolute left-0 top-full"></div> */}
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
