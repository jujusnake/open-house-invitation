import React from "react";

type FlipCardProps = {
  frontElem?: React.ReactNode;
  backElem?: React.ReactNode;
  isBack?: boolean;
};

const FlipCard = ({ frontElem, backElem, isBack = false }: FlipCardProps) => {
  return (
    <div
      className="w-full h-full bg-transparent flip-card"
      style={{ perspective: 2000 }}
    >
      <div
        className="relative w-full h-full transition-transform duration-[1.5s] flip-card-inner ease-out"
        style={{
          transformStyle: "preserve-3d",
          MozTransformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          transform: isBack ? "rotateY(540deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute w-full h-full bg-transparent flip-card-front"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {frontElem}
        </div>
        <div
          className="absolute w-full h-full bg-transparent flip-card-back"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {backElem}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
