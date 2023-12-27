import React, { useEffect, useRef, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CCol,
  CForm,
  CToaster,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CSpinner,
} from "@coreui/react";
import { PageLayout } from "../PageLayout";
import { fetchDatas } from "../../../api/getDatas";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router-dom";
import { getDataWithId } from "../../../api/getDataWithId";
import { db } from "../../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import showToast from "../../../helper/toastFunction";
const EditPageId = () => {
  const editorRef = useRef(null);
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [selected, setSelected] = useState("");

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const pageDetails = await getDataWithId("pages", id);
        const pageDataWithId = pageDetails.datas.find((data) => data.id === id);
        setPageData(pageDataWithId);

        const sectionId = pageDataWithId?.selected.toString();

        const sectionData = await fetchDatas("sections");
        setSections(sectionData);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        // Handle errors here
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    if (sections.length > 0 && pageData.selected) {
      const sectionDataId = sections.find(
        (data) => data.id === pageData.selected
      );
      if (sectionDataId) {
        setSelected(sectionDataId.section);
        // Process section data as needed
      }
    }
  }, [sections, pageData.selected]);
  function handleEditor() {
    if (editorRef.current) {
      setPageData((prev) => ({
        ...prev,
        editor: editorRef.current.getContent(), // Update the linkName field with the new value (val)
      }));
    }
  }
  const handleLinkChange = (id, val) => {
    setPageData((prev) => ({
      ...prev,
      linkName: val, // Update the linkName field with the new value (val)
    }));
  };
  const handleSection = (val) => {
    setPageData((prev) => ({
      ...prev,
      selected: val, // Update the linkName field with the new value (val)
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (id && pageData) {
        let editor = pageData.editor;
        let linkName = pageData.linkName;
        let selected = pageData.selected;

        const sectionRef = doc(db, "pages", id.toString());
        await updateDoc(sectionRef, {
          editor,
          linkName,
          selected,
          // Add other fields if needed
        });
      }

      addToast(showToast("successfully updated pages", "success"));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const initialContent = "<p>Initial content...</p>";

    if (editorRef.current && initialContent) {
      editorRef.current.setContent(initialContent);
    }
  }, []);

  return (
    <PageLayout>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Edit </strong> <small>page</small>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel htmlFor="inputEmail4">link name</CFormLabel>
              <CFormInput
                type="text"
                id="link"
                value={pageData?.linkName || ""}
                onChange={(e) => handleLinkChange(pageData.id, e.target.value)}
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="inputState">sections</CFormLabel>
              <CFormSelect
                id="inputState"
                onChange={(e) => handleSection(e.target.value)}
                defaultValue={selected}
              >
                <option>{selected} </option>
                {!loading &&
                  sections &&
                  sections.map((data) => (
                    <option key={data?.id} value={data.id}>
                      {data?.section}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
            <CCol xs={12}>
              <Editor
                value={pageData.editor}
                apiKey="99jhkf7v1r4ul2ij2kjw4atfcpbw737a89xuorezwuslgu1p"
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  plugins:
                    "ai  mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table advtable visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents  powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",

                  ai_request: (request, respondWith) =>
                    respondWith.string(() =>
                      Promise.reject("See docs to implement AI Assistant")
                    ),
                }}
                onEditorChange={handleEditor}
              />
            </CCol>

            <CCol xs={12}>
              <CButton color="primary" onClick={handleSubmit}>
                {loading && (
                  <CSpinner component="span" size="sm" aria-hidden="true" />
                )}
                {!loading && "update"}
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </PageLayout>
  );
};

export default EditPageId;
