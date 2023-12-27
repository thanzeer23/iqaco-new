import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Center>
      <Box
        w={"full"}
        height={"50vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontSize="5xl" fontWeight={"bolder"}>
          404
        </Text>
        <Text fontSize="medium" fontWeight={"medium"}>
          found
        </Text>
      </Box>
    </Center>
  );
};

export default NotFound;
