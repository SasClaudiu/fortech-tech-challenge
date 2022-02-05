import React from "react";

export const Logo = ({ src, alt = "" }) => {
  return (
    <div className="logo">
      <img src={src} alt={alt} />
    </div>
  );
};
