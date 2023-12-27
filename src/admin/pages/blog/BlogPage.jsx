import React, { useEffect, useRef, useState } from "react";
import { PageLayout } from "../PageLayout";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CToaster,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CSpinner,
} from "@coreui/react";
import { Editor } from "@tinymce/tinymce-react";
import { fetchDatas } from "../../../api/getDatas";
import showToast from "../../../helper/toastFunction";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";

const BlogPage = () => {
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [editor, setEditor] = useState("");
  const [linkName, setLinkName] = useState("");
  const [sections, setSections] = useState([]);
  const [selected, setSelected] = useState("");
  const [toast, addToast] = useState(0);
  const toaster = useRef();

  const handleSubmit = async () => {
    setLoading(true);
    if ((editor, linkName, selected)) {
      const timestamp = Timestamp.fromDate(new Date());
      try {
        const docRef = await addDoc(collection(db, "pages"), {
          selected,
          linkName,
          editor,
          createdAt: timestamp,
        });
        setLinkName("");
        setEditor("");
        setSelected("");
        addToast(showToast("successfully created page", "success"));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  function handleEditor() {
    if (editorRef.current) {
      setEditor(editorRef.current.getContent());
    }
  }
  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      const sectionData = await fetchDatas("sections");
      setSections(sectionData);
      setLoading(false);
    };
    fetchSections();
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
          <strong>Create </strong> <small>page</small>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel htmlFor="inputEmail4">link name</CFormLabel>
              <CFormInput
                type="text"
                id="link"
                value={linkName}
                onChange={(e) => setLinkName(e.target.value)}
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="inputState">sections</CFormLabel>
              <CFormSelect
                id="inputState"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option>choose section</option>
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
                value={editor}
                apiKey="99jhkf7v1r4ul2ij2kjw4atfcpbw737a89xuorezwuslgu1p"
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  plugins:
                    "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table advtable visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents  powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",

                  ai_request: (request, respondWith) =>
                    respondWith.string(() =>
                      Promise.reject("See docs to implement AI Assistant")
                    ),
                }}
                onEditorChange={handleEditor}
              />
              {/* <Editor
                initialValue={editor}
                apiKey="99jhkf7v1r4ul2ij2kjw4atfcpbw737a89xuorezwuslgu1p"
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  plugins:
                    "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table advtable visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents  powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",

                  ai_request: (request, respondWith) =>
                    respondWith.string(() =>
                      Promise.reject("See docs to implement AI Assistant")
                    ),
                }}
                onEditorChange={handleEditor}
              /> */}
            </CCol>

            <CCol xs={12}>
              <CButton color="primary" onClick={handleSubmit}>
                {loading && (
                  <CSpinner component="span" size="sm" aria-hidden="true" />
                )}
                {!loading && "create"}
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </PageLayout>
  );
};

export default BlogPage;
