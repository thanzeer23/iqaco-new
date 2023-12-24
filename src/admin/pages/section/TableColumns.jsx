import React, { useRef, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { CFormSelect, CToaster } from "@coreui/react";
import { NavLink } from "react-router-dom";

const TableColumns = ({
  sections,
  sectionProtect,
  deleteSectionWithId,
  calculateIndex,
}) => {
  const handleProtection = (id) => {
    sectionProtect(id);
  };

  return (
    <>
      {sections.map((data, index) => (
        <tr key={data.id}>
          <th scope="row">{calculateIndex(index)}</th>
          <td>{data?.section}</td>
          <td className="">
            <CFormSelect
              valid={data?.isProtected}
              invalid={!data?.isProtected}
              id="inputState"
              value={data?.isProtected ? true : false}
              onChange={() => handleProtection(data.id)}
            >
              <option value={true}>protect</option>
              <option value={false}>not protect</option>
            </CFormSelect>
          </td>

          <td>
            <div
              style={{
                display: "flex",
                columnGap: "1rem",
                width: "40%",
              }}
            >
              <button
                type="button"
                className="btn btn-danger"
                style={{
                  height: "30px",
                  alignItems: "center",
                  display: "flex",

                  padding: "10px",
                }}
                onClick={() => deleteSectionWithId(data.id)}
              >
                <MdDelete />
              </button>
              <NavLink to={`/admin/edit-section/${data.id}`}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    height: "30px",
                    alignItems: "center",
                    display: "flex",
                    padding: "10px",
                  }}
                >
                  <MdModeEdit />
                </button>
              </NavLink>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableColumns;
