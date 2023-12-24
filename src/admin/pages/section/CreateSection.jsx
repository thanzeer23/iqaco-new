import React, { useRef, useState } from "react";
import { CCard, CCardBody, CCardHeader, CToaster } from "@coreui/react";
import { createData } from "../../../api/CreateData";
import showToast from "../../../helper/toastFunction";
import { PageLayout } from "../PageLayout";
import SectionInput from "./SectionInput";
import SectionLayout from "./sectionLayout";
import { addOrUpdateDocument } from "../../../api/EditWithId";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";

const CreateSection = () => {
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const [loading, setLoading] = useState(false);

  const [section, setSection] = useState("");

  const handleSection = async () => {
    setLoading(true);
    const isProtected = false;

    if (section) {
      const timestamp = Timestamp.fromDate(new Date());

      try {
        const docRef = await addDoc(collection(db, "sections"), {
          section,
          isProtected,
          createdAt: timestamp,
        });
        addToast(showToast("successfully created section", "success"));
        setSection("");
        setLoading(false);
      } catch (error) {
        addToast(showToast("something went wroong", "danger"));
        setLoading(false);
      }
    }
  };
  return (
    <>
      <SectionLayout first={"Create"}>
        <div>
          <CToaster ref={toaster} push={toast} placement="top-end" />
          {/* inputs start  */}
          <SectionInput
            type="create"
            section={section}
            setSection={setSection}
            handleSection={handleSection}
            loading={loading}
          />
        </div>
      </SectionLayout>
    </>
  );
};

export default CreateSection;
