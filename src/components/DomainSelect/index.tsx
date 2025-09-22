import { NativeSelect } from "@chakra-ui/react";

export interface DomainSelectProps {
  onChange: (value: string) => void;
  options: string[];
  size?: "lg" | "md" | "sm" | "xl" | "xs";
  value: string;
}

export default function DomainSelect({
  onChange,
  options,
  size,
  value,
}: DomainSelectProps) {
  return (
    <NativeSelect.Root
      me="-1"
      minW={{ base: "100%", md: "250px" }}
      size={size}
      variant="plain"
      width="100%"
    >
      <NativeSelect.Field
        bg="white"
        color="gray.700"
        cursor="pointer"
        fontSize={{ base: "12px", md: "sm" }}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        {options.map((val, index) => (
          <option key={`${val}-${index}`} value={val}>
            {val}
          </option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
}
