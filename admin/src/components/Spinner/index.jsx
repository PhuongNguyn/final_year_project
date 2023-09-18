import React from "react";

import Lottie from "lottie-react";
import animation from "./animation.json";
const Spinner = () => {
  return (
    <Lottie
      animationData={animation}
      loop={true}
      style={{
        width: 100,
        height: 100,
      }}
    />
  );
};

export default Spinner;
