import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Link,
  Stack,
  Image,
  Box,
  HStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const SignInForm = ({ toggleForm }) => {
  return (
    <Stack spacing={4} w={"full"} maxW={"md"}>
      <Heading fontSize={"4xl"}>Sign in</Heading>
      <form>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" isRequired={true} />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" isRequired={true} />
        </FormControl>
        <Stack spacing={6}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            align={"start"}
            justify={"space-between"}
          >
            <Checkbox>Remember me</Checkbox>
            <Link color={"blue.500"}>Forgot password?</Link>
          </Stack>
          <Button type="submit" colorScheme={"blue"} variant={"solid"}>
            Sign in
          </Button>
        </Stack>
      </form>
      <Stack pt={6}>
        <Text align={"center"}>
          Not a user?{" "}
          <Link onClick={toggleForm} color={"blue.400"}>
            Sign Up
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
};

const SignUpForm = ({ toggleForm }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Stack spacing={4} w={"full"} maxW={"md"}>
      <Heading fontSize={"4xl"}>Sign up</Heading>
      <Text fontSize={"lg"} color={"gray.600"}>
        to enjoy all of our cool features ✌️
      </Text>
      <Stack spacing={4}>
        <form>
          <HStack>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input type="text" isRequired={true} />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input type="text" />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" isRequired={true} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                isRequired={true}
              />
              <InputRightElement h={"full"}>
                <Button
                  padding={0}
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              type='submit'
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Sign up
            </Button>
          </Stack>
        </form>
        <Stack pt={6}>
          <Text align={"center"}>
            Already a user?{" "}
            <Link onClick={toggleForm} color={"blue.400"}>
              Login
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const Authenticate = () => {
  const [login, setLogin] = useState(true);
  const toggleForm = () => setLogin((prev) => !prev);

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        {login ? (
          <SignInForm toggleForm={toggleForm} />
        ) : (
          <SignUpForm toggleForm={toggleForm} />
        )}
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
};
