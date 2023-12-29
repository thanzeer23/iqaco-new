import React, { useEffect, useRef, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CPaginationItem,
  CPagination,
  CToaster,
} from "@coreui/react";
import { PageLayout } from "../PageLayout";
import BlogTableColumn from "./BlogTableColumn";
import { fetchDatas } from "../../../api/getDatas";
import NoData from "../../common/NoData";
import Loading from "../../common/Loading";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import showToast from "../../../helper/toastFunction";

const EditBlogPages = () => {
  const [loading, setLoading] = useState(false);
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const [sections, setSections] = useState([]);
  const [pageData, setPageData] = useState([]);
  const ItemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [currentItems, setCurrentItems] = useState([]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchPageData = async () => {
    setLoading(true);
    const pageDetails = await fetchDatas("pages");

    setPageData(pageDetails);
    setLoading(false);
  };
  const fetchSectionData = async () => {
    setLoading(true);
    const sectionData = await fetchDatas("sections");

    setSections(sectionData);
    setLoading(false);
  };

  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(pageData.length / ItemsPerPage); i++) {
    paginationNumbers.push(i);
  }
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const calculateIndex = (index) => {
    return index + 1 + (currentPage - 1) * ItemsPerPage;
  };
  useEffect(() => {
    const indexOfLastItem = currentPage * ItemsPerPage;
    const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
    const slicedItems = pageData.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(slicedItems);
  }, [currentPage, pageData]);

  useEffect(() => {
    fetchPageData();
    fetchSectionData();
  }, []);
  const deltePageWithId = async (id) => {
    setLoading(true);
    try {
      if (id) {
        const documentRef = doc(db, "pages", id);
        await deleteDoc(documentRef);
        await fetchPageData();
        await fetchSectionData();
        addToast(showToast("successfully deleted page", "success"));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error deleting document:", error);
    }
  };
  return (
    <PageLayout>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Edit </strong> <small>page</small>
        </CCardHeader>
        <CCardBody>
          <div className="table-responsive">
            <table className="table  table-bordered border-white">
              <thead>
                <tr>
                  <th scope="col" onClick={() => setLoading(true)}>
                    no
                  </th>
                  <th scope="col">page name</th>
                  <th scope="col">section</th>
                  <th scope="col">data</th>
                  <th scope="col">action</th>
                </tr>
              </thead>
              <tbody>
                {/* table columns  */}
                {!loading && pageData && (
                  <BlogTableColumn
                    pageData={currentItems}
                    sections={sections}
                    calculateIndex={calculateIndex}
                    deltePageWithId={deltePageWithId}
                  />
                )}
                {!loading && pageData.length < 1 && (
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
          {pageData.length > ItemsPerPage && (
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

export default EditBlogPages;
