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
}

interface FormProps {
  handleFormSubmit: (credentials: FormValues) => void;
}

export default function SignInForm({ handleFormSubmit }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    setIsSubmitting(true);
    try {
      handleFormSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <form aria-label="Sign in form" onSubmit={onSubmit}>
      <Fieldset.Root size="lg">
        <Stack>
          <Heading as="h2">Sign in</Heading>
          <Text>Please provide your account credentials.</Text>
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

            <Field.Root invalid={!!errors.password}>
              <Field.Label>Password</Field.Label>
              <PasswordInput
                {...register("password", {
                  maxLength: 30,
                  minLength: 6,
                  required: true,
                })}
                aria-describedby="password-error"
                variant="subtle"
              />
              <Field.ErrorText id="password-error">
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

            <Button
              {...baseButton.base}
              _active={baseButton.active}
              _hover={baseButton.hover}
              aria-label={isSubmitting ? "Signing in..." : "Sign in"}
              disabled={isSubmitting}
              loading={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
            <Center>
              <Text>
                Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
              </Text>
            </Center>
          </Stack>
        </Fieldset.Content>
      </Fieldset.Root>
    </form>
  );
}
