import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Hero from "../assets/hero-img.svg";

export const Home = () => {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Twitter Lists{" "}
          <Text as={"span"} color={"blue.400"}>
            made easy
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Make multiple lists of your Twitter idols and read there recent tweets
          without getting lost in recommendations by Twitter.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Link to={"authenticate"}>
            <Button
              rounded={"full"}
              px={6}
              colorScheme={"blue"}
              bg={"blue.400"}
              _hover={{ bg: "blue.500" }}
            >
              Get started
            </Button>
          </Link>
        </Stack>
        <Flex w={"full"}>
          <Image src={Hero} alt="hero" />
        </Flex>
      </Stack>
    </Container>
  );
};
