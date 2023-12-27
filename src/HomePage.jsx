import { Container, Box, Button } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDatas } from "./api/getDatas";
import { useLoading } from "./context/context";
import Carousal from "./carousal/Carousal";
import "./index.css";
import Loading from "./common/Loading";
import { getFiles } from "./api/getFiles";
import { getImages } from "./api/getImage";

const HomePageLayout = ({ user }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [homePage, setHomePage] = useState([]);
  const [sections, setSections] = useState([]);

  const [containerImages, setContainerImages] = useState({});

  const getHomePage = async () => {
    startLoading();
    try {
      const HomePageData = await fetchDatas("pages");
      const homePageDetail = HomePageData.find(
        (data) => data.linkName.toUpperCase() === "home".toUpperCase()
      );
      setHomePage(homePageDetail);
      stopLoading();
    } catch (error) {
      stopLoading();
      console.error("Error fetching home page data:", error);
    }
  };

  const getSection = async () => {
    startLoading();
    try {
      const sectionData = await fetchDatas("sections");
      setSections(sectionData);
      stopLoading();
    } catch (error) {
      console.error("Error fetching section data:", error);
    } finally {
      stopLoading();
    }
  };

  const getSliders = async () => {
    try {
      const containerData = await getFiles();
      const test = containerData.filteredContainer.filter(
        (data) => data[0] === homePage.id
      );

      for (const data of test) {
        await getSlidersImage(data[0], data[1]);
      }
    } catch (error) {
      console.error("Error fetching sliders:", error);
    } finally {
    }
  };

  // Function to fetch sliders' images and associate them with containers
  const getSlidersImage = async (id, containerName) => {
    try {
      const images = await getImages(id, containerName);

      // Update state: associate images with containers
      setContainerImages((prevState) => ({
        ...prevState,
        [containerName]: images,
      }));
    } catch (error) {
      console.error("Error fetching slider images:", error);
    } finally {
    }
  };

  useEffect(() => {
    getHomePage();
    getSection();
  }, []);

  useEffect(() => {
    if (homePage) {
      getSliders();
    }
  }, [homePage]);

  const isProtected = useMemo(
    () => sections.find((e) => e.id === homePage?.selected),
    [sections, homePage?.selected]
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
      padding={"1rem"}
    >
      {isLoading && <Loading />}
      {!isLoading && (
        <Box
          dangerouslySetInnerHTML={{ __html: homePage?.editor }}
          className="table-wrapper"
        ></Box>
      )}
      <Box
        display={"flex"}
        justifyContent={"center"}
        columnGap={"1rem"}
        mb={"1rem"}
      >
        {/* <Carousal key={index + 1} /> */}
        {Object.entries(containerImages).map(
          ([containerName, images], index) => (
            <Carousal images={images} key={index} />
          )
        )}
      </Box>
    </Container>
  );
};

export default HomePageLayout;
