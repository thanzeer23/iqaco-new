import React, { useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCardImage,
  CCardText,
  CButton,
} from "@coreui/react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const ImageViewCard = ({ link, id, path, handleDelete }) => {
  return (
    <CCard style={{ width: "9rem" }} key={id}>
      <CCardImage orientation="top" src={link} />
      <CCardBody>
        <CCardText style={{ textAlign: "center" }}>
          <CButton size="sm" color="primary" style={{ marginRight: "1rem" }}>
            <MdEdit />
          </CButton>
          <CButton size="sm" color="danger" onClick={() => handleDelete(path)}>
            <MdDelete />
          </CButton>
        </CCardText>
      </CCardBody>
    </CCard>
  );
};

export default ImageViewCard;
