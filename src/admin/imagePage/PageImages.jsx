import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader, CCol } from "@coreui/react";
import { PageLayout } from "../pages/PageLayout";
import Folder from "./Folder";
import { getFiles } from "../../api/getFiles";
import Loading from "../common/Loading";
import NoData from "../common/NoData";

const PageImages = () => {
  const [pageData, setPagedata] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPageImage = async () => {
    setLoading(true);
    const PageDetails = await getFiles();

    setPagedata(PageDetails.filteredPageData);
    setLoading(false);
  };
  useEffect(() => {
    getPageImage();
  }, []);
  return (
    <PageLayout>
      <CCard className="mb-4 " style={{ overflow: "hidden" }}>
        <CCardHeader>
          <strong>Images </strong>
        </CCardHeader>
        <CCardBody>
          <CCol
            className="d-flex flex-wrap justify-content-xl-start justify-content-lg-center justify-content-center"
            md={12}
            style={{
              gap: "1rem",
            }}
          >
            {/* folder start  */}
            {!loading &&
              pageData.map((data, index) => (
                <Folder
                  name={data.linkName}
                  link={"/admin/view/images/" + data.id}
                  id={data.id}
                  key={index + 1}
                />
              ))}

            {loading && (
              <div
                className="d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <Loading />
              </div>
            )}
            {!loading && pageData.length < 1 && (
              <div
                className="d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <NoData />
              </div>
            )}
          </CCol>
        </CCardBody>
      </CCard>
    </PageLayout>
  );
};

export default PageImages;
