import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { fetchDatas } from "../api/getDatas";
import { Container, Box, Button } from "@chakra-ui/react";
import { getDataWithId } from "../api/getDataWithId";
import HomePageLayout from "../HomePage";
import { useLoading } from "../context/context";
import "../index.css";
import Loading from "../common/Loading";
import NotFound from "../common/NotFound";
import { getImages } from "../api/getImage";
import { getFiles } from "../api/getFiles";
import Carousal from "../carousal/Carousal";

const Content = ({ user }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const { id } = useParams();
  const location = useLocation();
  const [found, setFound] = useState(true);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [homePage, setHomePage] = useState([]);
  const [containerImages, setContainerImages] = useState({});

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
      setFound(false);
      stopLoading();
    }
  };
  const getSection = async () => {
    startLoading();
    try {
      const sectionData = await fetchDatas("sections");
      setSections(sectionData);
      setFound(true);
      stopLoading();
    } catch (error) {
      setFound(false);
      stopLoading();
    }
  };
  const getSliders = async () => {
    try {
      setLoading(true);
      const containerData = await getFiles();
      const test = containerData.filteredContainer.filter(
        (data) => data[0] === id
      );
      setContainerImages({});

      const fetchSliderPromises = test.map(([some, containerName]) =>
        getSlidersImage(id, containerName)
      );

      await Promise.all(fetchSliderPromises);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sliders:", error);
      setLoading(false);
    } finally {
      setLoading(false);
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
    getSliders();
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
        {isLoading && <Loading />}
        {!isLoading && path === "/" && (
          <HomePageLayout isProtected={isProtected} editor={homePage.editor} />
        )}
        {!isLoading && path !== "/home" && path !== "/" && (
          <Box
            dangerouslySetInnerHTML={{ __html: homePage.editor }}
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
          {!loading &&
            Object.entries(containerImages)
              .sort(([containerNameA], [containerNameB]) => {
                const numberA = Number(containerNameA.split("-")[1]);
                const numberB = Number(containerNameB.split("-")[1]);
                return numberA - numberB;
              })
              .map(([containerName, images], index) => (
                <Carousal images={images} key={index} />
              ))}
          {loading && <Loading />}
        </Box>
      </Container>
    );
  } else {
    return (
      <Container
        width={"100%"}
        minW={"100%"}
        color="#333"
        marginTop="2rem"
        paddingBottom={"5rem"}
        padding={"2rem"}
      >
        {!isLoading && !found && <NotFound />}
      </Container>
    );
  }
};

export default Content;
