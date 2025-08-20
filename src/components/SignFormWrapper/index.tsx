import { Card, Container, Heading } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function SignFormWrapper() {
  return (
    <Container alignItems="center" as="main" display="flex" flexDir="column">
      <Heading as="h1" fontFamily="Oswald" mb="4" textAlign="center" zIndex={2}>
        Converto
      </Heading>
      <Card.Root
        backdropBlur="30px"
        background="linear-gradient(#212121, #212121) padding-box,
              linear-gradient(45deg, #ffbc00, #ff0058, #8B3489) border-box"
        border="2px solid transparent"
        borderRadius="8px"
        boxShadow="1px 1px 16px rgba(255, 255, 255, 0.3)"
        boxSizing="border-box"
        height="100%"
        maxHeight={{
          base: "400px",
          md: "400px",
        }}
        maxWidth={{
          base: "320px",
          md: "400px",
        }}
        transition="ease-in-out"
        transitionDuration="0.1s"
        variant="outline"
        width="100%"
        zIndex={1}
      >
        <Card.Body gap="2">
          <Outlet />
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
