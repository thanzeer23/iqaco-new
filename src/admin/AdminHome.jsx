import React, { useEffect, useState } from "react";
import { CCol, CContainer, CRow, CWidgetStatsF } from "@coreui/react";
import {
  cilDescription,
  cilNotes,
  cilLockLocked,
  cilCamera,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { fetchDatas } from "../api/getDatas";
import { getFiles } from "../api/getFiles";

const AdminHome = () => {
  const [sectionLength, setSectionLength] = useState("");
  const [pageLength, setPageLength] = useState("");
  const [imageCount, setImageCount] = useState("");
  const [protectedRoute, setProtectedRoute] = useState("");
  const [loading, setLoading] = useState(false);
  const getPages = async () => {
    setLoading(true);
    const HomePageData = await fetchDatas("pages");
    setPageLength(HomePageData.length);

    setLoading(false);
  };
  const getSections = async () => {
    setLoading(true);
    try {
      const sectionData = await fetchDatas("sections");
      setSectionLength(sectionData.length);
      let protectedSection = sectionData.filter(
        (data) => data.isProtected === true
      );
      setProtectedRoute(protectedSection.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const getLengthImages = async () => {
    setLoading(true);
    const length = await getFiles();
    setImageCount(length.totalImageCount);
    setLoading(false);
  };
  useEffect(() => {
    getPages();
    getSections();
    getLengthImages();
  }, []);

  return (
    <CContainer className="px-5" lg>
      <CRow xs={{ gutter: 4 }}>
        <CCol xs={12} sm={6} xl={4} xxl={4}>
          <CWidgetStatsF
            icon={<CIcon width={24} icon={cilDescription} size="xl" />}
            padding={false}
            title="Total Sections"
            value={sectionLength}
            color="primary"
          />
        </CCol>
        <CCol xs={12} sm={6} xl={4} xxl={4}>
          <CWidgetStatsF
            icon={<CIcon width={24} icon={cilNotes} size="xl" />}
            padding={false}
            title="Total Pages"
            value={pageLength}
            color="info"
          />
        </CCol>

        <CCol xs={12} sm={6} xl={4} xxl={4}>
          <CWidgetStatsF
            icon={<CIcon width={24} icon={cilLockLocked} size="xl" />}
            padding={false}
            title="Protected Sections"
            value={protectedRoute}
            color="success"
          />
        </CCol>
        <CCol xs={12} sm={6} xl={4} xxl={4}>
          <CWidgetStatsF
            icon={<CIcon width={24} icon={cilCamera} size="xl" />}
            padding={false}
            title="Total Images"
            value={imageCount}
            color="warning"
          />
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AdminHome;
