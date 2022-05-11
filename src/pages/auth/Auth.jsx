import { Flex, Stack, Image } from "@chakra-ui/react";
import { useState } from "react";
import { registerUser, signinUser } from "../../utils/auth-services";
import { SignInForm } from "./SignIn";
import { SignUpForm } from "./SignUp";

export const Authenticate = () => {
  const [login, setLogin] = useState(true);
  const [formFields, setFormFields] = useState();
  const [loading, setLoading] = useState(false);

  const toggleForm = () => setLogin((prev) => !prev);

  const updateFormFields = (e) => {
    setFormFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value || e.target?.checked,
    }));
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    await registerUser(formFields);
    setLoading(false);
  };

  const onSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signinUser(formFields);
    setLoading(false);
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        {login ? (
          <SignInForm
            toggleForm={toggleForm}
            formFields={formFields}
            updateFormFields={updateFormFields}
            onSubmit={onSignIn}
            loading={loading}
          />
        ) : (
          <SignUpForm
            toggleForm={toggleForm}
            formFields={formFields}
            updateFormFields={updateFormFields}
            onSubmit={onSignUp}
            loading={loading}
          />
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
