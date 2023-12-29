import React from "react";
import { CContainer } from "@coreui/react";

const NotFoundAdmin = () => {
  return (
    <CContainer className="px-5" lg>
      <div
        style={{
          height: "50vh",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <h1>404</h1> <p>Found</p>
      </div>
    </CContainer>
  );
};

export default NotFoundAdmin;
