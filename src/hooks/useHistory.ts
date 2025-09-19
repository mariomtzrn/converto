import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { getConversionHistory } from "@/lib/history";
import { setHistory, setTotalConversions } from "@/slices/unitSlice";

export default function useHistory(
  unitName: string,
  createdAt: string,
  limit: number,
  page: number,
) {
  const dispatch = useAppDispatch();
  const { currentPageItems, invalidatedHistory, totalConversions } =
    useAppSelector((state) => state.unit[unitName]);
  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    async function getHistory() {
      try {
        if (!userInfo) throw new Error("User not logged in");
        const result = await getConversionHistory(
          userInfo.id,
          unitName,
          createdAt,
          limit,
          page,
        );
        console.log({ result });
        if (!result) throw new Error("Error fetching history");
        dispatch(
          setHistory({
            history: result.history,
            unitType: unitName,
          }),
        );
        dispatch(
          setTotalConversions({
            totalConversions: result.rows,
            unitType: unitName,
          }),
        );
      } catch (err) {
        console.error(err);
      }
    }

    getHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, invalidatedHistory, limit]);

  return { currentPageItems, totalConversions };
}
