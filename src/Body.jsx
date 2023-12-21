import { Container, Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <Container width={"100%"} minW={"full"} centerContent>
      <Box
        mt={"1rem"}
        padding="10"
        bg="gray.200"
        borderRadius={"10px"}
        color="black"
        maxW="6xl"
      >
        There are many benefits to a joint design and development system. Not
        only does it bring benefits to the design team, but it also brings
        benefits to engineering teams. It makes sure that our experiences have a
        consistent look and feel, not just in our design specs, but in
        production.
      </Box>
    </Container>
  );
};

export default Home;
