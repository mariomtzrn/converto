import {
  Button,
  Field,
  Input,
  InputGroup,
  NumberInput,
  Separator,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Controller,
  useForm,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

import { baseButton } from "@/assets/styles";
import DomainSelect from "@/components/DomainSelect";

export interface FormInputs {
  inputA: number;
  inputB: number;
  lastInput: string;
  selectA: string;
  selectB: string;
}

interface FormProps {
  conversionResult: string;
  layout?: "history" | "homepage";
  onFormSubmit: (
    fields: FormInputs,
    setError: UseFormSetError<FormInputs>,
    setValue: UseFormSetValue<FormInputs>,
  ) => void;
  options: string[];
}

export default function Form(props: FormProps) {
  const { layout, onFormSubmit, options } = props;
  const [lastInput, setLastInput] = useState<string>();
  const isMobile = useBreakpointValue({
    base: true,
    desktop: false,
    mobile: true,
    tablet: true,
    wide: false,
  });
  const isDesktop = useBreakpointValue({
    base: false,
    desktop: true,
    mobile: false,
    tablet: false,
    wide: true,
  });
  const defaultA = options[0];
  const defaultB = options[1];

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<FormInputs>({
    defaultValues: {
      selectA: defaultA,
      selectB: defaultB,
    },
  });

  useEffect(() => {
    setValue("selectA", options[0]);
    setValue("selectB", options[1]);
  }, [options, setValue]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setLastInput(name);
    setValue("lastInput", name);
  };

  const handleFormSubmit = handleSubmit(
    (data) => {
      onFormSubmit(data, setError, setValue);
    },
    (errors) => {
      console.log("Form validation errors:", errors);
    },
  );

  return (
    <form onSubmit={handleFormSubmit}>
      <Field.Root>
        <Input type="hidden" {...register("lastInput")} />
      </Field.Root>

      <Stack
        align="center"
        direction={
          layout === "homepage"
            ? { base: "column", md: "column" }
            : { base: "column", md: "row" }
        }
        gap="4"
      >
        {isDesktop && (
          <Stack
            direction={
              layout === "homepage"
                ? { base: "row", md: "row" }
                : { base: "column", md: "row" }
            }
            gapX="4"
            gapY="4"
            w={{ base: "100%", lg: "100%", md: "100%" }}
          >
            <Field.Root height="fit-content" invalid={!!errors.inputA}>
              <InputGroup
                endElement={
                  <Controller
                    control={control}
                    name="selectA"
                    render={({ field }) => (
                      <DomainSelect
                        onChange={field.onChange}
                        options={options}
                        size="sm"
                        value={field.value}
                      />
                    )}
                  />
                }
                flex="1"
              >
                <NumberInput.Root w="100%">
                  <NumberInput.Input
                    bg="white"
                    color="black"
                    min="0"
                    onInput={handleInput}
                    step="0.01"
                    type="number"
                    {...register("inputA", {
                      maxLength: 20,
                      required: lastInput === "inputA" ? true : false,
                      validate:
                        lastInput === "inputA"
                          ? (value) => !isNaN(value) || "Must be a number"
                          : undefined,
                      valueAsNumber: true,
                    })}
                  />
                </NumberInput.Root>
              </InputGroup>
              <Field.ErrorText>{errors.inputA?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root height="fit-content" invalid={!!errors.inputB}>
              <InputGroup
                endElement={
                  <Controller
                    control={control}
                    name="selectB"
                    render={({ field }) => (
                      <DomainSelect
                        onChange={field.onChange}
                        options={options}
                        size="sm"
                        value={field.value}
                      />
                    )}
                  />
                }
                flex="1"
              >
                <NumberInput.Root w="100%">
                  <NumberInput.Input
                    bg="white"
                    color="black"
                    min="0"
                    onInput={handleInput}
                    step="0.01"
                    type="number"
                    {...register("inputB", {
                      maxLength: 20,
                      required: lastInput === "inputB" ? true : false,
                      validate:
                        lastInput === "inputB"
                          ? (value) => !isNaN(value) || "Must be a number"
                          : undefined,
                      valueAsNumber: true,
                    })}
                  />
                </NumberInput.Root>
              </InputGroup>
              <Field.ErrorText>{errors.inputB?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>
        )}

        {isMobile && (
          <Stack
            direction={
              layout === "homepage"
                ? { base: "column", md: "column" }
                : { base: "column", md: "row" }
            }
            gapX="4"
            gapY="4"
            w={{ base: "100%", lg: "80%", md: "80%" }}
          >
            <Field.Root>
              <Controller
                control={control}
                name="selectA"
                render={({ field }) => (
                  <DomainSelect
                    onChange={field.onChange}
                    options={options}
                    size="sm"
                    value={field.value}
                  />
                )}
              />
            </Field.Root>

            <Field.Root invalid={!!errors.inputA}>
              <InputGroup flex="1">
                <NumberInput.Root w="100%">
                  <NumberInput.Input
                    bg="white"
                    color="black"
                    min="0"
                    onInput={handleInput}
                    step="0.01"
                    type="number"
                    {...register("inputA", {
                      maxLength: 20,
                      required: lastInput === "inputA" ? true : false,
                      validate:
                        lastInput === "inputA"
                          ? (value) => !isNaN(value) || "Must be a number"
                          : undefined,
                      valueAsNumber: true,
                    })}
                  />
                </NumberInput.Root>
              </InputGroup>
              <Field.ErrorText>{errors.inputA?.message}</Field.ErrorText>
            </Field.Root>

            <Separator colorPalette="white" />

            <Field.Root>
              <Controller
                control={control}
                name="selectB"
                render={({ field }) => (
                  <DomainSelect
                    onChange={field.onChange}
                    options={options}
                    size="sm"
                    value={field.value}
                  />
                )}
              />
            </Field.Root>

            <Field.Root invalid={!!errors.inputB}>
              <InputGroup flex="1">
                <NumberInput.Root w="100%">
                  <NumberInput.Input
                    bg="white"
                    color="black"
                    min="0"
                    onInput={handleInput}
                    step="0.01"
                    type="number"
                    {...register("inputB", {
                      maxLength: 20,
                      required: lastInput === "inputB" ? true : false,
                      validate:
                        lastInput === "inputB"
                          ? (value) => !isNaN(value) || "Must be a number"
                          : undefined,
                      valueAsNumber: true,
                    })}
                  />
                </NumberInput.Root>
              </InputGroup>
              <Field.ErrorText>{errors.inputB?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>
        )}

        <Button
          {...baseButton.base}
          _active={baseButton.active}
          _hover={baseButton.hover}
          maxW="200px"
          mx="auto"
          type="submit"
          w="50%"
        >
          Convert
        </Button>
      </Stack>
    </form>
  );
}
