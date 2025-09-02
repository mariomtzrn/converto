// useLengthUnits.ts
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { getSelectedUnitTypes } from "@/lib/units";
import { setSelectedUnits } from "@/slices/unitSlice";

export default function useUnits(unitName: string) {
  const dispatch = useAppDispatch();
  const { selectedUnits } = useAppSelector((state) => state.unit[unitName]);

  useEffect(() => {
    async function getUnits() {
      try {
        const unitsResult = await getSelectedUnitTypes(unitName);
        if (!unitsResult) throw new Error("Error fetching units");
        dispatch(
          setSelectedUnits({
            selectedUnits: unitsResult.sort(),
            unitType: unitName,
          }),
        );
      } catch (err) {
        console.error(err);
      }
    }

    if (!selectedUnits || selectedUnits.length === 0) getUnits();
  }, [dispatch, selectedUnits, unitName]);

  return { selectedUnits };
}
