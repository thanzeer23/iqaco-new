import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CImage,
  CFormLabel,
  CFormSelect,
  CToaster,
} from "@coreui/react";
import { PageLayout } from "../pages/PageLayout";
import { useDropzone } from "react-dropzone";
import { IoCloseCircleOutline } from "react-icons/io5";
import { fetchDatas } from "../../api/getDatas";
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable } from "firebase/storage";
import showToast from "../../helper/toastFunction";

const CreateImage = () => {
  const [files, setFiles] = useState([]);
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const [container, setContainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState([]);
  const [pageId, setPageId] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const fetchPageData = async () => {
    setLoading(true);
    const pageDetails = await fetchDatas("pages");

    setPageData(pageDetails);
    setLoading(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);
  const removeFile = (fileToRemove) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  useEffect(() => {
    fetchPageData();
  }, []);

  const handleSubmit = async () => {
    try {
      if (pageId !== null && files.length >= 1 && container !== null) {
        setLoading(true);
        Promise.all(
          files.map(async (file) => {
            const imageRef = ref(
              storage,
              `${pageId}/${container}/${file.name}`
            );

            const uploadTask = uploadBytesResumable(imageRef, file);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setFiles([]);

                setProgresspercent(progress);
              },
              (error) => {
                addToast(showToast("error while uploading images", "error"));
              },
              () => {}
            );
          })
        ).then(() => {
          addToast(showToast("successfully uploaded images", "success"));
          setLoading(false);
        });
      } else {
        addToast(showToast("Fill all fields", "danger"));
        console.log({ container, pageId });
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setLoading(false);
    }
  };
  return (
    <PageLayout>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCard className="mb-4" style={{ overflow: "hidden" }}>
        <CCardHeader>
          <strong>Create </strong> <small>Images</small>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-3 align-items-center">
            <CCol md={6}>
              <CFormLabel htmlFor="inputState">sections</CFormLabel>
              <CFormSelect
                id="inputState"
                onChange={(e) => setPageId(e.target.value)}
              >
                <option value={null}>choose page</option>
                {pageData.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.linkName}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputState">Group </CFormLabel>
              <CFormSelect
                id="groupstate"
                onChange={(e) => setContainer(e.target.value)}
              >
                <option value={null}>choose container</option>
                <option value={"container-1"}>contaier 1</option>
                <option value={"container-2"}>container 2</option>
                <option value={"container-3"}>container 3</option>
                <option value={"container-4"}>container 4</option>
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <div
                className="clearfix"
                style={{
                  gap: "1rem",
                  marginTop: "3rem",
                  position: "relative",
                  display: "inline-flex",
                  flexWrap: "wrap",
                  overflowX: "auto",
                  minWidth: "100%",
                  border: files.length >= 1 && "2px dotted blue",
                  padding: "10px",
                }}
              >
                {files.map((data) => (
                  <div
                    style={{ position: "relative", minWidth: "10%" }}
                    key={data.name}
                  >
                    <CImage
                      align="start"
                      fluid
                      thumbnail
                      src={data.preview}
                      width={100}
                      height={100}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: -8,
                        right: -5,
                        cursor: "pointer",
                        borderRadius: "50%",
                        zIndex: 1,
                      }}
                      onClick={() => removeFile(data)}
                    >
                      <IoCloseCircleOutline
                        color="#f0f0f0"
                        fill="black"
                        size={25}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CCol>
            <CCol
              md={12}
              className="d-flex justify-content-center"
              style={{
                marginTop: "5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                {...getRootProps()}
                style={{
                  backgroundColor: isDragActive ? "#f0f0f0" : "#ffffff",
                  border: `2px dashed ${isDragActive ? "gray" : "black"}`,
                  borderRadius: "10px",
                  width: "100%",
                  height: "40vh",
                  padding: "30px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition:
                    "background-color 0.3s ease, border-color 0.3s ease",
                }}
              >
                <h1 style={{ color: "#333333" }}>Drag & drop any file here</h1>
                <p style={{ color: "#777777" }}>Or click to select files</p>
                <input {...getInputProps()} />
                <button className="btn btn-primary" type="button">
                  Select Files
                </button>
                <div>
                  {files.map((file, index) => (
                    <div key={index}>{file.name}</div>
                  ))}
                </div>
              </div>
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" onClick={handleSubmit}>
                {/* <CSpinner component="span" size="sm" aria-hidden="true" /> */}

                {!loading && "Create"}
                {loading && progresspercent + "%"}
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </PageLayout>
  );
};

export default CreateImage;
