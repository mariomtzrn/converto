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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { baseButton } from "@/assets/styles";
import { PasswordInput } from "@/components/ui/password-input";
import ROUTES from "@/lib/routes";

export interface FormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
}

interface FormProps {
  handleFormSubmit: (credentials: FormValues) => void;
}

export default function SignUpForm({ handleFormSubmit }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormValues>();

  const password = watch("password");

  const onSubmit = handleSubmit((data) => {
    setIsSubmitting(true);
    try {
      handleFormSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <form aria-label="Sign up form" onSubmit={onSubmit}>
      <Fieldset.Root size="lg">
        <Stack>
          <Heading as="h2">Sign up</Heading>
          <Text>Create an account to continue.</Text>
        </Stack>

        <Fieldset.Content>
          <Stack gap="4" maxW="sm">
            <Field.Root invalid={!!errors.email}>
              <Field.Label>Email</Field.Label>
              <Input
                {...register("email", {
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  required: true,
                })}
                variant="subtle"
              />
              <Field.ErrorText>
                {errors.email?.type === "required" && (
                  <Text role="alert">Email is required.</Text>
                )}
                {errors.email?.type === "pattern" && (
                  <Text role="alert">Email is invalid.</Text>
                )}
              </Field.ErrorText>
            </Field.Root>

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
                  maxLength: 30,
                  minLength: 6,
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
                    Password must be at least 6 characters.
                  </Text>
                )}
                {errors.password?.type === "maxLength" && (
                  <Text role="alert">
                    Password must be at most 30 characters.
                  </Text>
                )}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.passwordConfirm}>
              <Field.Label>Confirm Password</Field.Label>
              <PasswordInput
                {...register("passwordConfirm", {
                  maxLength: 30,
                  minLength: 6,
                  required: true,
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                aria-describedby="passwordConfirm-error"
                variant="subtle"
              />
              <Field.ErrorText id="passwordConfirm-error">
                {errors.passwordConfirm?.type === "required" && (
                  <Text role="alert">Password confirmation is required.</Text>
                )}
                {errors.passwordConfirm?.type === "minLength" && (
                  <Text role="alert">
                    Password must be at least 6 characters.
                  </Text>
                )}
                {errors.passwordConfirm?.type === "maxLength" && (
                  <Text role="alert">
                    Password must be at most 30 characters.
                  </Text>
                )}
                {errors.passwordConfirm?.type === "validate" && (
                  <Text role="alert">{errors.passwordConfirm.message}</Text>
                )}
              </Field.ErrorText>
            </Field.Root>

            <Button
              {...baseButton.base}
              _active={baseButton.active}
              _hover={baseButton.hover}
              aria-label={
                isSubmitting ? "Creating account..." : "Create account"
              }
              disabled={isSubmitting}
              loading={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
            <Center>
              <Text>
                Already have an account?{" "}
                <Link to={ROUTES.SIGN_IN}>Sign in</Link>
              </Text>
            </Center>
          </Stack>
        </Fieldset.Content>
      </Fieldset.Root>
    </form>
  );
}
