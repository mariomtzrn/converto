import { useEffect } from "react";

import CurrencyCalculator from "@/components/CurrencyCalculator";
import UnitCalculator from "@/components/UnitCalculator";

interface Props {
  unit: string;
}

export default function HomeCalculator({ unit }: Props) {
  const unitName = unit.toLowerCase();

  useEffect(() => {
    console.log("unitName", unitName);
  }, [unitName]);

  if (unitName === "currency") {
    return <CurrencyCalculator />;
  } else if (unitName !== "currency") {
    return <UnitCalculator unitName={unitName} />;
  } else {
    return <></>;
  }
}
