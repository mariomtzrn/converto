"use client";

import {
  Button,
  Center,
  Field,
  Fieldset,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { PasswordInput } from "@/components/ui/password-input";

interface FormValues {
  password: string;
  username: string;
}

export default function SignInForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Fieldset.Root size="lg">
        <Stack>
          <Fieldset.Legend>
            <Heading as="h2">Sign in</Heading>
          </Fieldset.Legend>
          <Fieldset.HelperText color="#fff">
            Please provide your account credentials.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Stack gap="4" maxW="sm">
            <Field.Root invalid={!!errors.username}>
              <Field.Label>Username</Field.Label>
              <Input
                {...register("username", {
                  maxLength: 20,
                  minLength: 4,
                  required: true,
                })}
                variant="subtle"
              />
              <Field.ErrorText>
                {errors.username?.type === "required" && (
                  <Text role="alert">Username is required.</Text>
                )}
                {errors.username?.type === "minLength" && (
                  <Text role="alert">
                    Username must be at least 4 characters.
                  </Text>
                )}
                {errors.username?.type === "maxLength" && (
                  <Text role="alert">
                    Username must be at most 20 characters.
                  </Text>
                )}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.password}>
              <Field.Label>Password</Field.Label>
              <PasswordInput
                {...register("password", {
                  maxLength: 20,
                  minLength: 4,
                  required: true,
                })}
                variant="subtle"
              />
              <Field.ErrorText>
                {errors.password?.type === "required" && (
                  <Text role="alert">Password is required.</Text>
                )}
                {errors.password?.type === "minLength" && (
                  <Text role="alert">
                    Password must be at least 4 characters.
                  </Text>
                )}
                {errors.password?.type === "maxLength" && (
                  <Text role="alert">
                    Password must be at most 20 characters.
                  </Text>
                )}
              </Field.ErrorText>
            </Field.Root>

            <Button
              _active={{
                background: "linear-gradient(45deg, #ffbc00, #ff0058, #8B3489)",
                boxShadow: "none !important",
                transform: "translateY(1px) !important",
              }}
              _hover={{
                background: "linear-gradient(45deg, #ffbc00, #ff0058, #8B3489)",
                border: "none",
                boxShadow: "rgba(0, 0, 0, 0.25) 0 8px 15px",
                color: "#fff",
                fontSize: "1.2rem",
                transform: "translateY(-1px)",
              }}
              appearance="none"
              backgroundColor="#fff"
              marginTop={4}
              touchAction="manipulation"
              transition="all 150ms cubic-bezier(.23, 1, 0.32, 1)"
              type="submit"
              userSelect="none"
              WebkitUserSelect="none"
              willChange="transform"
            >
              Submit
            </Button>
            <Center>
              <Text>
                Don't have an account? <Link to="/account/signup">Sign up</Link>
              </Text>
            </Center>
          </Stack>
        </Fieldset.Content>
      </Fieldset.Root>
    </form>
  );
}
