import React from "react";
import image from "./image/waldopic.jpeg";

const Image = ({ click }) => {
  return (
    <img
      src={image}
      alt="Where's waldo style pic"
      className="waldo--img"
      onClick={click}
    />
  );
};

export default Image;
