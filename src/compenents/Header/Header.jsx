import React from "react";
import mahaguruLogo from "../../assets/logo.png";
import { Box, Image, Text, useMediaQuery } from "@chakra-ui/react";

const Header = () => {
  const [isLargerThan650px] = useMediaQuery("(min-width: 650px)");

  return (
    <Box
      width={"full"}
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      display={"flex"}
      flexDirection={"column"}
      rowGap={"1rem"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"20px"}
      userSelect={"none"}
    >
      <Box
        display={"flex"}
        className="header_width"
        flexDirection={"row"}
        alignItems={"center"}
        height={"125px"}
        justifyContent={"space-between"}
      >
        <Box>
          <Image src={mahaguruLogo} alt="mahaguruLogo" className="logo_image" />
        </Box>
        <Box
          width={"60%"}
          height={"100%"}
          alignItems={"center"}
          textAlign={"left"}
          display={"flex"}
          columnGap={"2rem"}
          justifyContent={"center"}
        >
          <Box>
            <Text fontSize={"3xl"} fontWeight={"bolder"} color={"yellow"}>
              MAHAGURU
            </Text>
          </Box>
          <div
            style={{
              height: "80%",
              width: "2px",
              backgroundColor: "#fff",
              display: !isLargerThan650px && "none",
            }}
          />
          <Box color={"white"} className="fontSize_header">
            <Text>An ISO 9001:2015 Certified Insitution</Text>
            <Text>Federal Institute of Science And Technology </Text>
            <Text>Accredited by NBA and NAAC with 'A' Grade</Text>
          </Box>
        </Box>
        <Box>
          <Image src={mahaguruLogo} alt="mahaguruLogo" className="logo_image" />
        </Box>
      </Box>
      <Text
        fontSize={"x-large"}
        color={"#fff"}
        fontWeight={"medium"}
        textAlign={"center"}
      >
        asdfsadfd dffd sdffsd sfdfsd
      </Text>
    </Box>
  );
};

export default Header;
