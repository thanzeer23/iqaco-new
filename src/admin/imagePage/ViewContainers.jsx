import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader, CCol } from "@coreui/react";
import { PageLayout } from "../pages/PageLayout";
import Folder from "./Folder";
import { getFiles } from "../../api/getFiles";
import Loading from "../common/Loading";
import { useParams } from "react-router-dom";
import NoData from "../common/NoData";

const ViewContainers = () => {
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const { id } = useParams();

  const getContainer = async () => {
    const containerData = await getFiles();
    const test = containerData.filteredContainer.filter(
      (data) => data[0] === id
    );

    setDatas(test);
    setLoading(false);
  };

  useEffect(() => {
    getContainer();
  }, []);

  return (
    <PageLayout>
      <CCard className="mb-4 " style={{ overflow: "hidden" }}>
        <CCardHeader>
          <strong>Images </strong>
          <small>Containers</small>
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
              datas.length >= 1 &&
              datas.map((data, index) => (
                <Folder
                  name={data[1]}
                  link={"/admin/edit/images/" + data[0] + "/" + data[1]}
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
            {!loading && datas.length < 1 && (
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

export default ViewContainers;
