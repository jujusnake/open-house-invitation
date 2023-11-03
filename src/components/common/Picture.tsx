import React from "react";

type Props = { src: string; alt?: string } & Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "src" | "alt"
>;

const Picture = ({ src, alt = "", ...imgProps }: Props) => {
  return (
    <picture>
      <source srcSet={src + ".webp"} type="image/webp" />
      <img {...imgProps} alt={alt} src={src + "png"} />
    </picture>
  );
};

export default Picture;
