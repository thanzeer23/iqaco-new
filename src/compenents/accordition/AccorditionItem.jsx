import React, { useEffect, useState } from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  UnorderedList,
  Center,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import AccoriditionLink from "./AccoriditionLink";
import { fetchDatas } from "../../api/getDatas";
import { NavLink } from "react-router-dom";

const AccorditionItem = ({ color, section, sectionPageData, user }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton backgroundColor={color} _hover={{ opacity: 1 }}>
          <Box
            as="span"
            flex="1"
            display={"flex"}
            textAlign="left"
            flexWrap={"wrap"}
            wordBreak={"break-all"}
          >
            <Text
              fontWeight="bolder"
              marginLeft={"1rem"}
              textAlign={"center"}
              mt={"1rem"}
            >
              {section?.section}
            </Text>
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
          {section?.isProtected && !user ? (
            <Box w={"100%"}>
              <Button w={"full"} colorScheme="blue">
                <Link to={"/admin/login"}> Login to view</Link>
              </Button>
            </Box>
          ) : (
            <UnorderedList maxW={"100%"} w={"full"}>
              {sectionPageData?.map((data) => (
                <AccoriditionLink data={data} key={data.id} />
              ))}
            </UnorderedList>
          )}
        </UnorderedList>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AccorditionItem;
