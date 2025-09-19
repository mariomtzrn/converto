import { Container, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";

import Form, { FormInputs } from "@/components/Form";
import { useAppDispatch } from "@/hooks";
import useUnits from "@/hooks/useUnits";
import { convertUnit } from "@/lib/units";
import {
  addToTotalConversions,
  setInvalidatedHistory,
} from "@/slices/unitSlice";

// TODO: Clear input fields when switching between unit types

interface ConversionResultParams {
  convertResult: { id: string; result: string };
  fromUnit: string;
  fromValue: number;
  input: string;
  toUnit: string;
}

interface Props {
  unitName: string;
}

export default function UnitCalculator({ unitName }: Props) {
  const dispatch = useAppDispatch();
  const { selectedUnits } = useUnits(unitName);
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    setResult("");
  }, [unitName]);

  const conversionResult = (params: ConversionResultParams) => {
    const { convertResult } = params;
    dispatch(addToTotalConversions({ unitType: unitName }));
    dispatch(
      setInvalidatedHistory({
        unitType: unitName,
      }),
    );
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
      const unitA = selectedUnits?.find((unit) => selectA.includes(unit));
      const unitB = selectedUnits?.find((unit) => selectB.includes(unit));
      if (unitA && unitB) {
        const convertResult = await convertUnit(unitName, unitA, unitB, inputA);
        if (!convertResult) {
          setError("inputA", {
            message: "Error converting unit",
            type: "manual",
          });
          return;
        }
        conversionResult({
          convertResult,
          fromUnit: unitA,
          fromValue: inputA,
          input: "inputB",
          toUnit: unitB,
        });
        setValue("inputB", parseFloat(convertResult.result));
      }
    } else if (lastInput === "inputB") {
      const unitA = selectedUnits?.find((unit) => selectA.includes(unit));
      const unitB = selectedUnits?.find((unit) => selectB.includes(unit));
      if (unitA && unitB) {
        const convertResult = await convertUnit(unitName, unitB, unitA, inputB);
        if (!convertResult) {
          setError("inputB", {
            message: "Error converting unit",
            type: "manual",
          });
          return;
        }
        conversionResult({
          convertResult,
          fromUnit: unitB,
          fromValue: inputB,
          input: "inputA",
          toUnit: unitA,
        });
        setValue("inputA", parseFloat(convertResult.result));
      }
    }
  };

  if (!selectedUnits) {
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
        options={selectedUnits}
        unitName={unitName}
      />
    </Container>
  );
}
