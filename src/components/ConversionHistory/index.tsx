import { GridItem, SimpleGrid } from "@chakra-ui/react";

import ConversionHistoryItems from "@/components/ConversionHistoryItems";
import ConversionHistoryTitle from "@/components/ConversionHistoryTitle";
import PaginationBox, { PageEvent } from "@/components/PaginationBox";
import { useAppDispatch, useAppSelector } from "@/hooks";
import useHistory from "@/hooks/useHistory";
import { setCurrentPage, setItemsPerPage } from "@/slices/unitSlice";

interface Props {
  unitName: string;
}

export default function ConversionHistory(props: Props) {
  const { unitName } = props;
  const dispatch = useAppDispatch();
  const { currentPage, itemsPerPage } = useAppSelector(
    (state) => state.unit[unitName],
  );
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const { currentPageItems, totalConversions } = useHistory(
    unitName,
    new Date().toISOString(),
    itemsPerPage,
    currentPage,
  );

  if (!userInfo) {
    return null;
  }

  const handlePagesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(
      setItemsPerPage({
        itemsPerPage: parseInt(event.target.value),
        unitType: unitName,
      }),
    );
  };

  const handlePageChange = (event: PageEvent) => {
    const { page } = event;
    dispatch(
      setCurrentPage({
        currentPage: page,
        unitType: unitName,
      }),
    );
  };

  return (
    <SimpleGrid
      columns={{ base: 1, md: 1 }}
      gap={{ base: 4, md: 4 }}
      width={"100%"}
    >
      <GridItem colSpan={{ base: 1, md: 1 }}>
        <ConversionHistoryTitle
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handlePagesPerPageChange}
        />
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 1 }}>
        {currentPageItems && currentPageItems.length > 0 ? (
          <ConversionHistoryItems items={currentPageItems} />
        ) : (
          <p>No conversion history available.</p>
        )}
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 1 }}>
        {currentPageItems && currentPageItems.length > 0 ? (
          <PaginationBox
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalConversions={totalConversions}
          />
        ) : null}
      </GridItem>
    </SimpleGrid>
  );
}
