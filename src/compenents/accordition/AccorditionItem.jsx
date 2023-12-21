import React from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import AccoriditionLink from "./AccoriditionLink";

const AccorditionItem = ({ color }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton backgroundColor={color} _hover={{ opacity: 1 }}>
          <Box as="span" flex="1" textAlign="left">
            Section 1 title
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <UnorderedList
          display={"flex"}
          flexDirection={"column"}
          marginLeft={"2.5rem"}
        >
          <AccoriditionLink link={"Lorem ipsum dolor sit amet"} />
          <AccoriditionLink link={"Lorem ipsum dolor sit amet"} />
          <AccoriditionLink link={"Lorem ipsum dolor sit amet"} />
          <AccoriditionLink link={"Lorem ipsum dolor sit amet"} />
          <AccoriditionLink link={"Lorem ipsum dolor sit amet"} />
          <AccoriditionLink link={"Lorem ipsum dolor sit amet"} />
        </UnorderedList>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AccorditionItem;
