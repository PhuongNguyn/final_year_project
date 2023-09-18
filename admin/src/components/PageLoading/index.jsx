import { Flex } from "@chakra-ui/react";
import Lottie from "lottie-react";
import React from "react";
import animation from "./animation_lmhiu3jb.json";
const PageLoading = () => {
  return (
    <Flex width={"100%"} height={"90vh"} justify={"center"} align={"center"}>
      <Lottie
        animationData={animation}
        loop={true}
        style={{
          width: 300,
          height: 300,
        }}
      />
    </Flex>
  );
};

export default PageLoading;
