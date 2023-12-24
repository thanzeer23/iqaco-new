import { Accordion } from "@chakra-ui/react";
import AccorditionItem from "./AccorditionItem";
import { useEffect, useState } from "react";
import { fetchDatas } from "../../api/getDatas";

const Accordition = ({ color, user }) => {
  const [sections, setSections] = useState([]);
  const [pageData, setPageData] = useState([]);
  const getSections = async () => {
    try {
      const sectionData = await fetchDatas("sections");
      setSections(sectionData);
    } catch (error) {}
  };
  const getPageData = async () => {
    try {
      const pageDetails = await fetchDatas("pages");
      setPageData(pageDetails);
    } catch (error) {}
  };
  useEffect(() => {
    getSections();
    getPageData();
  }, []);
  const sectionIds = sections.map((section) => section.id);

  const sectionIdsInPageData = sectionIds.filter((id) =>
    pageData.some((data) => data.selected === id)
  );

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {/* accordition item  */}
      {sectionIdsInPageData.map((id) => {
        const section = sections.find((section) => section.id === id);
        const sectionPageData = pageData.filter((data) => data.selected === id);

        return (
          section && (
            <AccorditionItem
              key={id}
              color={color}
              section={section}
              sectionPageData={sectionPageData}
              user={user}
            />
          )
        );
      })}
    </Accordion>
  );
};

export default Accordition;
