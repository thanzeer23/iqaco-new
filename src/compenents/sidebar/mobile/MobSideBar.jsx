import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Image,
  Center,
} from "@chakra-ui/react";
import Accordition from "../../accordition/Accordition";
import mahaguruLogo from "../../../assets/logo.png";

const MobSideBar = ({ isOpen, onClose, user }) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"xs"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Center>
            <Image
              src={mahaguruLogo}
              alt="mahaguruLogo"
              className="logo_image"
            />
          </Center>
        </DrawerHeader>

        <DrawerBody mt={"2rem"}>
          <Stack spacing="24px">
            <Accordition color={"#8E8DBE"} user={user} onClose={onClose} />
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobSideBar;
