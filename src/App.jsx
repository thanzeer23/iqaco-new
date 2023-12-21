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

function App() {
  const [isLargerThan850px] = useMediaQuery("(min-width: 850px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <ChakraProvider>
        <Header />
        <Box display="flex">
          <Box width={"40%"} display={!isLargerThan850px && "none"}>
            <SideBar />
          </Box>
          <Box display={isLargerThan850px && "none"}>
            <MobSideBar isOpen={isOpen} onClose={onClose} />
          </Box>
          <Box width={"full"}>
            <Box
              width={"full"}
              bgColor={"blue.400"}
              height={"2.6rem"}
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              marginLeft={"0.1rem"}
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
            <Outlet />
          </Box>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default App;
