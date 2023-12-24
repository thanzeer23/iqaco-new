import React from "react";
import {
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CSpinner,
} from "@coreui/react";

const SectionInput = ({
  type,
  section,
  setSection,
  handleSection,
  loading,
}) => {
  const handleInputChange = (id, value) => {
    setSection((prevSection) =>
      prevSection.map((data) =>
        data.id === id
          ? {
              ...data,
              section: value,
            }
          : data
      )
    );
  };

  return (
    <>
      {type === "create" && (
        <CForm className="row g-3">
          <CCol md={6}>
            <CFormLabel htmlFor="inputEmail4">section</CFormLabel>
            <CFormInput
              type="text"
              value={section}
              id="inputEmail4"
              onChange={(e) => setSection(e.target.value)}
            />
          </CCol>

          <CCol xs={12}>
            <CButton color="primary" onClick={handleSection}>
              {loading && (
                <CSpinner component="span" size="sm" aria-hidden="true" />
              )}
              {!loading && type}
            </CButton>
          </CCol>
        </CForm>
      )}
      {type === "update" && section !== undefined && (
        <CForm className="row g-3">
          {section &&
            section.map((data) => (
              <div className="row g-3" key={data.id}>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">section</CFormLabel>

                  <CFormInput
                    type="text"
                    value={data?.section}
                    id="inputEmail4"
                    onChange={(e) => handleInputChange(data.id, e.target.value)}
                  />
                </CCol>
                <CCol xs={12}>
                  <CButton
                    color="primary"
                    onClick={() => handleSection(data.id, data?.section)}
                  >
                    {loading && (
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                    )}
                    {!loading && type}
                  </CButton>
                </CCol>
              </div>
            ))}
        </CForm>
      )}
    </>
  );
};

export default SectionInput;
