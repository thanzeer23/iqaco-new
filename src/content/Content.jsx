import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { fetchDatas } from "../api/getDatas";
import { Container, Box, Button } from "@chakra-ui/react";
import { getDataWithId } from "../api/getDataWithId";
import HomePageLayout from "../HomePage";
import { useLoading } from "../context/context";
import "../index.css";

const Content = ({ user }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const { id } = useParams();
  const location = useLocation();
  const [found, setFound] = useState(false);
  const [sections, setSections] = useState([]);
  const [homePage, setHomePage] = useState([]);

  const [path, setPath] = useState(location.pathname);
  const getHomePage = async () => {
    startLoading();
    try {
      const HomePageData = await getDataWithId("pages", id);

      if (HomePageData.success) {
        const homePageDetail = HomePageData.datas.find(
          (data) => data.id === id
        );
        setHomePage(homePageDetail);
        setFound(true);
        stopLoading();
      } else {
        setFound(false);
        stopLoading();
      }
    } catch (error) {
      stopLoading();
    }
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
  }, [path, id]);
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);
  const isProtected = useMemo(
    () => sections.find((e) => e.id === homePage.selected),
    [sections, homePage.selected]
  );

  if (found) {
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
        width={"100%"}
        minW={"100%"}
        color="#333"
        marginTop="2rem"
        paddingBottom={"5rem"}
        padding={"2rem"}
      >
        {isLoading && <h1>loading anu sir</h1>}
        {!isLoading && path === "/" && (
          <HomePageLayout isProtected={isProtected} editor={homePage.editor} />
        )}
        {!isLoading && path !== "/home" && path !== "/" && (
          <Box
            dangerouslySetInnerHTML={{ __html: homePage.editor }}
            className="table-wrapper"
          ></Box>
        )}
      </Container>
    );
  } else {
    return (
      <>
        {isLoading && <h1>loading anu sir</h1>}
        {!isLoading && <h1>kandilla</h1>}
      </>
    );
  }
};

export default Content;
