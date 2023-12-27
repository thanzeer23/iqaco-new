import React, { useState } from "react";
import { CFormLabel } from "@coreui/react";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";

const Folder = ({ name, link, id }) => {
  const [isHovered, setIsHovered] = useState(false);

  const folderStyle = {
    width: "100%",
    textAlign: "center",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s",
    backgroundColor: isHovered ? "gray" : "transparent", // White color with opacity change on hover

    /* Add other styles as needed */
  };
  return (
    <div
      key={id}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "80px",
        minWidth: "80px",
        height: "100px",
        minHeight: "100px",
        padding: "10px",
        alignItems: "center",
        userSelect: "none",
        textAlign: "center",

        paddingTop: "1rem",
      }}
    >
      <div
        style={folderStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={link}>
          <FaFolder size={50} fill="#FFDB58" />
        </Link>
      </div>
      <div
        style={{
          whiteSpace: "nowrap",
          width: "100px",
        }}
      >
        <CFormLabel>{name}</CFormLabel>
      </div>
    </div>
  );
};

export default Folder;
