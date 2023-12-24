import React from "react";
import { ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const AccoriditionLink = ({ data }) => {
  function setDynamicRoute(name) {
    const url_name = name.replaceAll(" ", "-");
    const url = "/page/" + url_name;
    if (name !== "Home") {
      return url;
    } else {
      return "/";
    }
  }
  return (
    <>
      <NavLink
        to={
          data.linkName.toUpperCase() === "Home".toUpperCase()
            ? "/"
            : setDynamicRoute(data.id)
        }
      >
        <ListItem>{data.linkName}</ListItem>
      </NavLink>
    </>
  );
};

export default AccoriditionLink;
