import { SegmentGroup, SegmentGroupValueChangeDetails } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CardWrapper from "@/components/CardWrapper";
import HomeUnitCalculator from "@/components/HomeUnitCalculator";
import {
  getCategoryLabels,
  getUnitsByCategory,
  UnitCategoryKey,
} from "@/lib/units";

import "./index.css";

export default function HomeUnitSwitch() {
  const categoryLabels = getCategoryLabels();
  const [category, setCategory] = useState<null | string>(categoryLabels[0]);
  const [categoryUnits, setCategoryUnits] = useState<string[]>([]);
  const [unit, setUnit] = useState<string>("");

  useEffect(() => {
    if (category) {
      const selectedCategory: UnitCategoryKey =
        category.toLowerCase() as UnitCategoryKey;
      const selectedCategoryUnits = getUnitsByCategory(selectedCategory);
      if (selectedCategoryUnits) {
        setCategoryUnits(selectedCategoryUnits);
        setUnit(selectedCategoryUnits[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (event: SegmentGroupValueChangeDetails) => {
    if (event.value) {
      setCategory(event.value);
      const selectedCategory: UnitCategoryKey =
        event.value.toLowerCase() as UnitCategoryKey;
      const selectedCategoryUnits = getUnitsByCategory(selectedCategory);
      console.log({ selectedCategory, selectedCategoryUnits });
      if (selectedCategoryUnits) {
        setCategoryUnits(selectedCategoryUnits);
        setUnit(selectedCategoryUnits[0]);
      }
    }
  };

  const handleUnitChange = (event: SegmentGroupValueChangeDetails) => {
    if (event.value) {
      setUnit(event.value);
    }
  };

  return (
    <CardWrapper
      boxDescription={"Select the category and units to convert."}
      boxTitle={"Unit Converter"}
      desktopWidth="100%"
      isLoading={false}
      mobileWidth="100%"
    >
      <SegmentGroup.Root
        flexWrap="wrap"
        minWidth="fit-content"
        onValueChange={handleCategoryChange}
        size="md"
        value={category}
      >
        <SegmentGroup.Indicator background="linear-gradient(45deg, #ffbc00, #ff0058, #8B3489)" />
        <SegmentGroup.Items items={categoryLabels} />
      </SegmentGroup.Root>
      {categoryUnits.length > 0 && (
        <SegmentGroup.Root
          flexWrap="wrap"
          minWidth="fit-content"
          onValueChange={handleUnitChange}
          size="md"
          value={unit}
        >
          <SegmentGroup.Indicator background="linear-gradient(45deg, #ffbc00, #ff0058, #8B3489)" />
          <SegmentGroup.Items items={categoryUnits} />
        </SegmentGroup.Root>
      )}
      <HomeUnitCalculator unit={unit} />
    </CardWrapper>
  );
}
