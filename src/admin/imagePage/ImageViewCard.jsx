import React from "react";
import {
  CCard,
  CCardBody,
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
          <CButton
            size="sm"
            style={{ width: "100%" }}
            color="danger"
            onClick={() => handleDelete(path)}
          >
            <MdDelete />
          </CButton>
        </CCardText>
      </CCardBody>
    </CCard>
  );
};

export default ImageViewCard;
