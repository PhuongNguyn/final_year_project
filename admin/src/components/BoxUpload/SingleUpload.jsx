import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import React, { memo, useState } from "react";
import PreviewImage from "./PreviewImage";
import Spinner from "../Spinner";
import { uploadToCDN } from "@/utils";
const third = {
  rest: {
    scale: 1.1,
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    scale: 1.3,
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};
const SingleUpload = ({ setFieldValue, backgroundImage, ...props }) => {
  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();
  const [image, setImage] = useState(props.value || backgroundImage);
  const [loading, setLoading] = useState(false);

  const handleChangeImage = async (e) => {
    try {
      setLoading(true);
      const { files } = e.target;
      if (files.length === 0) {
        return;
      }

      const file = files[0];
      const filePath = (await uploadToCDN(file)).data;
      setFieldValue(props.name, filePath);
      setImage(filePath);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Flex w={"full"} justify={"center"} align={"center"}>
      <AspectRatio width="64" ratio={1}>
        <Box
          borderColor="gray.300"
          borderStyle="dashed"
          borderWidth="2px"
          rounded="md"
          shadow="sm"
          role="group"
          transition="all 150ms ease-in-out"
          _hover={{
            shadow: "md",
          }}
          as={motion.div}
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <Box position="relative" height="100%" width="100%">
            <Box
              position="absolute"
              top="0"
              left="0"
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column"
            >
              <Stack
                height="100%"
                width="100%"
                display="flex"
                alignItems="center"
                justify="center"
                spacing="4"
              >
                <Box height="28" width="28" position="relative">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <PreviewImage
                      variants={third}
                      backgroundImage={`url("${image}")`}
                    />
                  )}
                </Box>
                <Stack p="4" textAlign="center" spacing="1">
                  <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                    Kéo thả file
                  </Heading>
                  <Text fontWeight="light">hoặc ấn vào đây để tải lên</Text>
                </Stack>
              </Stack>
            </Box>
            <Input
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="image/*"
              onDragEnter={startAnimation}
              onDragLeave={stopAnimation}
              onChange={handleChangeImage}
            />
          </Box>
        </Box>
      </AspectRatio>
    </Flex>
  );
};

export default memo(SingleUpload);
