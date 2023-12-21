import React from "react";
import { ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const AccoriditionLink = ({ link }) => {
  return (
    <>
      <NavLink to={"/details/sdfadsf"}>
        <ListItem>{link}</ListItem>
      </NavLink>
    </>
  );
};

export default AccoriditionLink;
