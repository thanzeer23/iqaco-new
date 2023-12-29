import React from "react";
import { ListItem, Divider } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const AccoriditionLink = ({ data, onClick }) => {
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
    <NavLink
      to={
        data.linkName.toUpperCase() === "Home".toUpperCase()
          ? "/"
          : setDynamicRoute(data.id)
      }
      style={({ isActive, isPending, isTransitioning }) => {
        return {
          fontWeight: isActive ? "bold" : "",
          color: isActive ? "red" : "black",
          viewTransitionName: isTransitioning ? "slide" : "",
        };
      }}
    >
      <ListItem onClick={onClick} fontSize={"1.2rem"}>
        {data.linkName}
      </ListItem>
      <Divider />
    </NavLink>
  );
};

export default AccoriditionLink;
