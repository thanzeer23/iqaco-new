import React from "react";
import { CCol, CRow, CContainer, CCard, CCardHeader } from "@coreui/react";

export const PageLayout = ({ children }) => {
  return (
    <CContainer className="px-4" lg>
      <CRow>
        <CCol xs={12}>{children}</CCol>
      </CRow>
    </CContainer>
  );
};
