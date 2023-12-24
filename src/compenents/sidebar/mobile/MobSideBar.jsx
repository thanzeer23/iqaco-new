import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Box,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  Button,
  InputLeftAddon,
  InputRightAddon,
  Select,
} from "@chakra-ui/react";
import Accordition from "../../accordition/Accordition";

const MobSideBar = ({ isOpen, onClose, user }) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"xs"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          Create a new account
        </DrawerHeader>

        <DrawerBody mt={"2rem"}>
          <Stack spacing="24px">
            <Accordition color={"blue.100"} user={user} />
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobSideBar;
