import React, { useEffect, useRef, useState } from "react";
import { CCard, CCardHeader, CCol, CToaster } from "@coreui/react";
import { PageLayout } from "../pages/PageLayout";
import Loading from "../common/Loading";
import { useParams } from "react-router-dom";
import ImageViewCard from "./ImageViewCard";
import { getImages } from "../../api/getImage";
import { deleteImage } from "../../api/delteImage";
import showToast from "../../helper/toastFunction";
import NoData from "../common/NoData";

const ViewEditImage = () => {
  const { pageId, containerName } = useParams();
  const [imgUrl, setImgurl] = useState([]);
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const [loading, setLoading] = useState(true);
  const fetchImages = async () => {
    setLoading(true);
    const images = await getImages(pageId, containerName);
    setImgurl(images);
    setLoading(false);
  };
  const handleDelete = async (path) => {
    setLoading(true);
    const result = await deleteImage(path);
    if (result.success) {
      fetchImages();
      setLoading(false);
      addToast(showToast("successfully deleted image", "success"));
    } else {
      addToast(showToast("Error deleting image", "danger"));
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <PageLayout>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Edit </strong>
          <small>images</small>
        </CCardHeader>
        <CCol
          className="d-flex flex-wrap justify-content-xl-start justify-content-lg-center justify-content-center"
          md={12}
          style={{
            gap: "1rem",
            padding: "1rem",
          }}
        >
          {imgUrl.map((link, index) => (
            <ImageViewCard
              link={link.imageURL}
              id={index + 1}
              path={link.path}
              handleDelete={handleDelete}
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
          {!loading && imgUrl.length < 1 && (
            <div
              className="d-flex justify-content-center"
              style={{ width: "100%" }}
            >
              <NoData />
            </div>
          )}
        </CCol>
      </CCard>
    </PageLayout>
  );
};

export default ViewEditImage;
