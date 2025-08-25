import CurrencyCalculator from "@/components/CurrencyCalculator";

interface Props {
  unit: string;
}

export default function HomeUnitCalculator({ unit }: Props) {
  if (unit === "Currency") {
    return <CurrencyCalculator />;
  } else {
    return <></>;
  }
}
