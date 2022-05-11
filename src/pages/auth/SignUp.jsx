import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Link,
  Stack,
  Box,
  HStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export const SignUpForm = ({
  toggleForm,
  formFields,
  updateFormFields,
  onSubmit,
  loading,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Stack spacing={4} w={"full"} maxW={"md"}>
      <Heading fontSize={"4xl"}>Sign up</Heading>
      <Text fontSize={"lg"} color={"gray.600"}>
        to enjoy all of our cool features ✌️
      </Text>
      <Stack spacing={4}>
        <form onSubmit={onSubmit}>
          <HStack>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstname"
                  type="text"
                  value={formFields?.firstname ?? ""}
                  onChange={updateFormFields}
                  isRequired={true}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastname"
                  value={formFields?.lastname ?? ""}
                  onChange={updateFormFields}
                />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              value={formFields?.email ?? ""}
              onChange={updateFormFields}
              isRequired={true}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formFields?.password ?? ""}
                onChange={updateFormFields}
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
              isLoading={loading}
              loadingText="Submitting"
              size="lg"
              type="submit"
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
