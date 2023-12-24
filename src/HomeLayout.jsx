import {
  ChakraProvider,
  Box,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./compenents/Header/Header";
import SideBar from "./compenents/sidebar/desktop/SideBar";
import MobSideBar from "./compenents/sidebar/mobile/MobSideBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRef } from "react";
import { useLoading } from "./context/context";

const HomeLayout = ({ user }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [isLargerThan850px] = useMediaQuery("(min-width: 850px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <ChakraProvider>
      <Header />
      <Box display="flex">
        <Box minW={"30%"} display={!isLargerThan850px && "none"}>
          <SideBar user={user} />
        </Box>
        <Box display={isLargerThan850px && "none"}>
          <MobSideBar isOpen={isOpen} onClose={onClose} user={user} />
        </Box>
        <Box width={"full"} minW={"70%"}>
          {!isLoading && (
            <Box
              width={"full"}
              bgColor={"blue.400"}
              height={"2.6rem"}
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Box
                marginLeft={"20px"}
                rounded={"full"}
                padding={"5px"}
                cursor={"pointer"}
                display={isLargerThan850px && "none"}
                ref={btnRef}
                onClick={onOpen}
              >
                <GiHamburgerMenu size={30} />
              </Box>
            </Box>
          )}
          <Outlet />
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default HomeLayout;
