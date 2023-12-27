import React from "react";
import Lottie from "lottie-react";
import loading from "./LoadingFile/loading.json";
import { Box, Center } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center>
      <Box width={"30%"}>
        <Lottie animationData={loading} loop={true} />
      </Box>
    </Center>
  );
};

export default Loading;
