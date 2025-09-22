import {
  ButtonGroup,
  Container,
  IconButton,
  Pagination,
} from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface PageEvent {
  page: number;
}

interface PaginationProps {
  currentPage: number;
  handlePageChange: (event: PageEvent) => void;
  itemsPerPage: number;
  totalConversions: number;
}

export default function PaginationBox(props: PaginationProps) {
  const { currentPage, handlePageChange, itemsPerPage, totalConversions } =
    props;

  return (
    <Container p={{ base: 8, md: 10 }}>
      <Pagination.Root
        count={totalConversions}
        defaultPage={1}
        onPageChange={handlePageChange}
        page={currentPage}
        pageSize={itemsPerPage}
      >
        <ButtonGroup size="sm" variant="ghost">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <ArrowLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ _selected: "outline", base: "ghost" }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <ArrowRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Container>
  );
}
