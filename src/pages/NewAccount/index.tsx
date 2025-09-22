import { Button, Container, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { baseButton } from "@/assets/styles";
import ROUTES from "@/lib/routes";

export default function NewAccount() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <Container display="flex" flexDir="column" p="0" zIndex={1}>
      <Heading as="h2">Account created</Heading>
      <Text>
        Your account has been created successfully, click Continue to proceed to
        Converto.
      </Text>
      <Button
        {...baseButton.base}
        _active={baseButton.active}
        _hover={baseButton.hover}
        onClick={handleSubmit}
      >
        Continue
      </Button>
    </Container>
  );
}
