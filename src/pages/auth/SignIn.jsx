import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Link,
  Stack,
} from "@chakra-ui/react";

export const SignInForm = ({
  toggleForm,
  formFields,
  updateFormFields,
  onSubmit,
  loading,
}) => {
  return (
    <Stack spacing={4} w={"full"} maxW={"md"}>
      <Heading fontSize={"4xl"}>Sign in</Heading>
      <form onSubmit={onSubmit}>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            type="email"
            value={formFields?.email ?? ""}
            onChange={updateFormFields}
            isRequired={true}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            value={formFields?.password ?? ""}
            onChange={updateFormFields}
            type="password"
            isRequired={true}
          />
        </FormControl>
        <Stack spacing={6}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            align={"start"}
            justify={"space-between"}
          >
            <Checkbox
              isChecked={formFields?.remember ?? false}
              name="remember"
              onChange={updateFormFields}
            >
              Remember me
            </Checkbox>
            <Link color={"blue.500"}>Forgot password?</Link>
          </Stack>
          <Button
            isLoading={loading}
            type="submit"
            colorScheme={"blue"}
            variant={"solid"}
          >
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
