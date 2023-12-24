import React, { useMemo } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const BlogTableColumn = ({
  pageData,
  sections,
  calculateIndex,
  deltePageWithId,
}) => {
  return (
    <>
      {pageData.map((data, index) => {
        const section = useMemo(() => {
          if (data.selected && sections) {
            return sections.find((e) => e.id === data.selected);
          }
          return null; // Return null if data.selected is not available
        }, [sections, data.selected]);

        return (
          <tr key={data.id}>
            <th scope="row">{calculateIndex(index)}</th>
            <td>{data?.linkName}</td>
            <td>{section?.section}</td>
            <td>{data?.editor.substring(0, 60)} ...</td>
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
                  onClick={() => deltePageWithId(data.id)}
                  className="btn btn-danger"
                  style={{
                    height: "30px",
                    alignItems: "center",
                    display: "flex",

                    padding: "10px",
                  }}
                >
                  <MdDelete />
                </button>
                <Link to={"/admin/edit-page/" + data.id}>
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
                </Link>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default BlogTableColumn;
