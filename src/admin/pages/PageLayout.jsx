import React from "react";
import { CCol, CRow, CContainer } from "@coreui/react";

export const PageLayout = ({ children }) => {
  return (
    <CContainer lg>
      <CRow>
        <CCol xs={12}>{children}</CCol>
      </CRow>
    </CContainer>
  );
};
