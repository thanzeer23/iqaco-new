import React, { useEffect, useRef, useState } from "react";
import SectionLayout from "./sectionLayout";
import SectionInput from "./SectionInput";
import { CToaster } from "@coreui/react";
import { useParams } from "react-router-dom";
import { getDataWithId } from "../../../api/getDataWithId";
import { db } from "../../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import showToast from "../../../helper/toastFunction";

const EditSectionWithId = () => {
  const [section, setSection] = useState([]);
  const [toast, addToast] = useState(0);
  const [loading, setLoading] = useState(false);
  const toaster = useRef();
  const { id } = useParams();
  const fetchDataWithId = async () => {
    const getSection = await getDataWithId("sections", id);
    if (getSection.success) {
      setSection(getSection.datas);
    } else {
      setSection(undefined);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchDataWithId();
    setLoading(false);
  }, []);

  const handleSection = async (id, value) => {
    setLoading(true);
    try {
      if (id && value) {
        const sectionRef = doc(db, "sections", id.toString());
        await updateDoc(sectionRef, {
          section: value,
          // Add other fields if needed
        });
      }
      addToast(showToast("successfully updated section", "success"));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <SectionLayout first={"Edit"}>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      {section !== undefined && section.length > 0 && (
        <div>
          {/* inputs start  */}
          <SectionInput
            type="update"
            section={section}
            setSection={setSection}
            handleSection={handleSection}
            loading={loading}
          />
        </div>
      )}
      {section === undefined && <h1>Not found</h1>}
    </SectionLayout>
  );
};

export default EditSectionWithId;
