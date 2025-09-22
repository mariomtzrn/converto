import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { getSelectedCurrencies } from "@/lib/currency";
import { setSelectedCurrencies } from "@/slices/currencySlice";

export default function useSelectedCurrencies() {
  const dispatch = useAppDispatch();
  const { selectedCurrencies } = useAppSelector((state) => state.currency);
  const [options, setOptions] = useState<string[]>();

  useEffect(() => {
    async function getCurrencies() {
      try {
        const currenciesResult = await getSelectedCurrencies();
        if (!currenciesResult) {
          throw new Error("Error fetching rates");
        }
        dispatch(setSelectedCurrencies(currenciesResult.sort()));
      } catch (err) {
        console.error(err);
      }
    }

    if (selectedCurrencies.length === 0) getCurrencies();
  }, [dispatch, selectedCurrencies.length]);

  useEffect(() => {
    if (selectedCurrencies) {
      const options = selectedCurrencies.map(
        (currency) => `${currency.name} (${currency.code})`,
      );
      setOptions(options);
    }
  }, [selectedCurrencies]);

  return { options, selectedCurrencies };
}
