import { Accordion } from "@chakra-ui/react";
import AccorditionItem from "./AccorditionItem";

const Accordition = ({ color }) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {/* accordition item  */}
      <AccorditionItem color={color} />
      <AccorditionItem color={color} />
    </Accordion>
  );
};

export default Accordition;
