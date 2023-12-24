import React, { useEffect, useRef, useState } from "react";
import { PageLayout } from "../PageLayout";
import TableColumns from "./TableColumns";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CPagination,
  CPaginationItem,
  CToaster,
} from "@coreui/react";
import { fetchDatas } from "../../../api/getDatas";
import showToast from "../../../helper/toastFunction";
import { db } from "../../../firebase/config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import Loading from "../../common/Loading";
import NoData from "../../common/NoData";

const EditSections = () => {
  const ItemsPerPage = 1;
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
  const currentItems = sections.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchPageData = async () => {
    setLoading(true);
    const sectionData = await fetchDatas("sections");

    setSections(sectionData);
    setLoading(false);
  };

  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(sections.length / ItemsPerPage); i++) {
    paginationNumbers.push(i);
  }
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const sectionProtect = async (id) => {
    setLoading(true);
    const updatedSections = sections.map((section) =>
      section.id === id
        ? { ...section, isProtected: !section.isProtected }
        : section
    );
    setSections(updatedSections);
    const sectionToUpdate = updatedSections.find(
      (section) => section.id === id
    );
    if (sectionToUpdate) {
      const sectionRef = doc(db, "sections", id.toString());
      await updateDoc(sectionRef, {
        isProtected: sectionToUpdate.isProtected,
        // Add other fields if needed
      });
      setLoading(false);
      addToast(showToast("successfully created section", "success"));
    }
    setLoading(false);
  };
  const deleteSectionWithId = async (id) => {
    setLoading(true);
    try {
      if (id) {
        const documentRef = doc(db, "sections", id);
        await deleteDoc(documentRef);
        fetchPageData();
        addToast(showToast("successfully deleted section", "success"));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error deleting document:", error);
    }
  };

  const calculateIndex = (index) => {
    return index + 1 + (currentPage - 1) * ItemsPerPage;
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  return (
    <PageLayout>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Edit </strong> <small>page</small>
        </CCardHeader>
        <CCardBody>
          <div className="table-responsive">
            <table className="table  table-bordered border-white align-middle">
              <thead>
                <tr>
                  <th scope="col">no</th>
                  <th scope="col">section</th>
                  <th scope="col">protection</th>
                  <th scope="col">action</th>
                </tr>
              </thead>
              <tbody>
                {/* table columns  */}
                {!loading && sections && (
                  <TableColumns
                    sections={currentItems}
                    deleteSectionWithId={deleteSectionWithId}
                    sectionProtect={sectionProtect}
                    calculateIndex={calculateIndex}
                  />
                )}
                {!loading && sections.length < 1 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      <div className="d-flex justify-content-center">
                        <NoData />
                      </div>
                    </td>
                  </tr>
                )}

                {loading && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      <div className="d-flex justify-content-center">
                        <Loading />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {sections.length > ItemsPerPage && (
            <CPagination aria-label="Page navigation example" align="end">
              <CPaginationItem onClick={goToPreviousPage}>
                Previous
              </CPaginationItem>
              {paginationNumbers.map((number) => (
                <CPaginationItem
                  key={number}
                  active={currentPage === number}
                  onClick={() => paginate(number)}
                >
                  {number}
                </CPaginationItem>
              ))}
            </CPagination>
          )}
        </CCardBody>
      </CCard>
    </PageLayout>
  );
};

export default EditSections;
