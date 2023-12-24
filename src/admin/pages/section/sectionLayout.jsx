import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { PageLayout } from "../PageLayout";

const SectionLayout = ({ first, children }) => {
  return (
    <PageLayout>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>{first} </strong> <small>sections</small>
        </CCardHeader>
        <CCardBody>{children} </CCardBody>
      </CCard>
    </PageLayout>
  );
};

export default SectionLayout;
