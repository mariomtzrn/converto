import { Container, Flex, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";

import Form, { FormInputs } from "@/components/Form";
import { useAppDispatch, useAppSelector } from "@/hooks";
import useSelectedCurrencies from "@/hooks/useSelectedCurrencies";
import { convertCurrency } from "@/lib/currency";
import { addToHistory } from "@/slices/currencySlice";

interface ConversionResultParams {
  convertResult: { id: string; result: string };
  fromUnit: string;
  fromValue: number;
  input: string;
  toUnit: string;
}

export default function CurrencyCalculator() {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { options, selectedCurrencies } = useSelectedCurrencies();
  const [result, setResult] = useState<string>("");

  const conversionResult = (params: ConversionResultParams) => {
    const { convertResult, fromUnit, fromValue, toUnit } = params;
    if (userInfo) {
      dispatch(
        addToHistory({
          conversion_type: "currency",
          created_at: new Date().toISOString(),
          from_unit: fromUnit,
          from_value: fromValue,
          id: convertResult.id,
          to_unit: toUnit,
          to_value: parseFloat(convertResult.result),
          user_id: userInfo.id,
        }),
      );
    }
    setResult(convertResult.result);
  };

  const handleSubmit = async (
    fields: FormInputs,
    setError: UseFormSetError<FormInputs>,
    setValue: UseFormSetValue<FormInputs>,
  ) => {
    const { inputA, inputB, lastInput, selectA, selectB } = fields;

    if (selectA === selectB) {
      if (lastInput === "inputA") {
        setError("inputB", {
          message: "Unable to convert to same type",
          type: "manual",
        });
      }
      if (lastInput === "inputB") {
        setError("inputA", {
          message: "Unable to convert to same type",
          type: "manual",
        });
      }
      return;
    }

    if (lastInput === "inputA" && !inputA) {
      setError("inputA", {
        message: "Please enter a value",
        type: "manual",
      });
      return;
    } else if (lastInput === "inputB" && !inputB) {
      setError("inputB", {
        message: "Please enter a value",
        type: "manual",
      });
      return;
    }

    if (lastInput === "inputA") {
      const currencyA = selectedCurrencies?.find((currency) =>
        selectA.includes(currency.code),
      );
      const currencyB = selectedCurrencies?.find((currency) =>
        selectB.includes(currency.code),
      );
      if (currencyA && currencyB) {
        const convertResult = await convertCurrency(
          inputA,
          currencyA.code,
          currencyB.code,
        );
        if (!convertResult) {
          setError("inputA", {
            message: "Error converting currency",
            type: "manual",
          });
          return;
        }
        conversionResult({
          convertResult,
          fromUnit: currencyA.code,
          fromValue: inputA,
          input: "inputB",
          toUnit: currencyB.code,
        });
        setValue("inputB", parseFloat(convertResult.result));
      }
    } else if (lastInput === "inputB") {
      const currencyA = selectedCurrencies?.find((currency) =>
        selectA.includes(currency.code),
      );
      const currencyB = selectedCurrencies?.find((currency) =>
        selectB.includes(currency.code),
      );
      if (currencyA && currencyB) {
        const convertResult = await convertCurrency(
          inputB,
          currencyB.code,
          currencyA.code,
        );
        if (!convertResult) {
          setError("inputB", {
            message: "Error converting currency",
            type: "manual",
          });
          return;
        }
        conversionResult({
          convertResult,
          fromUnit: currencyB.code,
          fromValue: inputB,
          input: "inputA",
          toUnit: currencyA.code,
        });
        setValue("inputA", parseFloat(convertResult.result));
      }
    }
  };

  if (!options) {
    return (
      <Flex align="center" direction="row" justify="center" p={4}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Container px={0} py={4}>
      <Form
        conversionResult={result}
        layout="homepage"
        onFormSubmit={handleSubmit}
        options={options}
      />
    </Container>
  );
}
