import React from "react";
import headerImage from "../../assets/header.jpg";
import { Box, Image } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      width={"full"}
      display={"flex"}
      flexDirection={"column"}
      rowGap={"1rem"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"20px"}
      userSelect={"none"}
    >
      <Box>
        <Image
          src={headerImage}
          height={100}
          alt="header_Image"
          style={{ height: "auto", maxHeight: "150px" }}
        />
      </Box>
    </Box>
  );
};

export default Header;
