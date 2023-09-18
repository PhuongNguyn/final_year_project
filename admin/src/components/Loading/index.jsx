import React from "react";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import animation from "./animation_lm5qao75.json";
import Lottie from "lottie-react";
import { Flex } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Card>
      <CardBody>
        <Flex justify={"center"} align={"center"} w={"full"} h={"70vh"}>
          <Lottie
            animationData={animation}
            loop={true}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Loading;
