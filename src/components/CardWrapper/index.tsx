import { Card, Flex, Spinner } from "@chakra-ui/react";

interface Props {
  boxDescription?: string;
  boxTitle?: string;
  children: React.ReactNode;
  desktopWidth: string;
  gap?: string;
  isLoading: boolean;
  mobileWidth: string;
  padding?: string;
}

export default function CardWrapper(props: Props) {
  const {
    boxDescription,
    boxTitle,
    children,
    desktopWidth,
    gap,
    isLoading,
    mobileWidth,
    padding,
  } = props;

  const loadingContainer = (
    <Flex align="center" direction="row" justify="center" p={4}>
      <Spinner size="xl" />
    </Flex>
  );

  return (
    <Card.Root
      _hover={{
        boxShadow: "0 1px 12px rgba(255, 255, 255, 0.6)",
      }}
      backdropBlur="20px"
      border="1px solid rgba(255, 255, 255, 0.3)"
      borderRadius="8px"
      boxShadow="0 1px 12px rgba(255, 255, 255, 0.3)"
      maxWidth={{
        base: mobileWidth,
        md: desktopWidth,
      }}
      transition="ease-in-out"
      transitionDuration="0.1s"
      variant="outline"
      width="100%"
      zIndex={1}
    >
      <Card.Body gap={gap ?? "2"} padding={padding ?? "8"}>
        {boxTitle && <Card.Title maxW="80%">{boxTitle}</Card.Title>}
        {boxDescription && (
          <Card.Description maxW="80%">{boxDescription}</Card.Description>
        )}
        {isLoading ? loadingContainer : children}
      </Card.Body>
    </Card.Root>
  );
}
