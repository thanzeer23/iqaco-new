import React, { useState, useEffect } from "react";
import { Box, Button, useMediaQuery, Image } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Loading from "../common/Loading";

const Carousal = ({ images, loading }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;
  const slideInterval = 3000;
  const [isLargerThan650px] = useMediaQuery("(min-width: 650px)");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
      );
    }, slideInterval);

    return () => clearInterval(interval);
  }, [totalSlides, slideInterval]);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <Box
      className="gallery"
      width={"300px"}
      bg="#EEE"
      position="relative"
      overflow="hidden"
    >
      <Box
        className="slider"
        display="flex"
        transition="transform 0.3s ease-in-out"
        transform={`translateX(-${currentSlide * 100}%)`}
      >
        {/* Your individual slides */}
        {images?.map((imageUrl, index) => (
          <Box
            key={index}
            className="gallery-cell carousal_custom"
            flex="0 0 100%"
            minWidth="100%"
            position="relative"
            overflow="hidden"
          >
            {!loading && (
              <Image
                src={imageUrl?.imageURL}
                alt={`Slide ${index + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            {loading && <Loading />}
          </Box>
        ))}
      </Box>
      {isLargerThan650px && (
        <>
          <Button
            onClick={prevSlide}
            className="hidden-btn"
            position="absolute"
            top="50%"
            left="10px"
            bgColor={"transparent"}
            transform="translateY(-50%)"
            zIndex="1"
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            onClick={nextSlide}
            className="hidden-btn"
            position="absolute"
            bgColor={"transparent"}
            top="50%"
            right="10px"
            transform="translateY(-50%)"
            zIndex="1"
          >
            <ChevronRightIcon />
          </Button>
        </>
      )}
    </Box>
  );
};
export default Carousal;
