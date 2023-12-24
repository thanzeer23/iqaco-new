import { Container, Box, Button } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchDatas } from "./api/getDatas";
import { useLoading } from "./context/context";
import "./index.css";
const HomePageLayout = ({ user }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [homePage, setHomePage] = useState([]);
  const [sections, setSections] = useState([]);
  const getHomePage = async () => {
    const HomePageData = await fetchDatas("pages");
    const homePageDetail = HomePageData.find(
      (data) => data.linkName.toUpperCase() === "home".toUpperCase()
    );
    setHomePage(homePageDetail);
  };
  const getSection = async () => {
    startLoading();
    try {
      const sectionData = await fetchDatas("sections");
      setSections(sectionData);

      stopLoading();
    } catch (error) {
      stopLoading();
    }
  };
  useEffect(() => {
    getHomePage();
    getSection();
  }, []);
  const isProtected = useMemo(
    () => sections.find((e) => e.id === homePage.selected),
    [sections, homePage.selected]
  );

  return isProtected?.isProtected && !user ? (
    <Container
      maxW="container.xl"
      color="#262626"
      marginTop="5rem"
      w={"full"}
      height={"50vh"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Button width={"30%"} colorScheme="teal">
        <Link to={"/admin/login"}>Login to view</Link>
      </Button>
    </Container>
  ) : (
    <Container
      width={"90%"}
      minW={"95%"}
      color="#333"
      marginTop="2rem"
      paddingBottom={"5rem"}
      padding={"2rem"}
    >
      {isLoading && <h1>loading anu sir</h1>}
      {!isLoading && (
        <Box
          dangerouslySetInnerHTML={{ __html: homePage.editor }}
          className="table-wrapper"
        ></Box>
      )}
    </Container>
  );
};

export default HomePageLayout;
