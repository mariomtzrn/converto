import { Center, Container } from "@chakra-ui/react";

import SignUpForm from "@/components/SignUpForm";

export default function SignIn() {
  return (
    <Container display="flex" flexDir="column" p="0" zIndex={1}>
      <Center>
        <Container>
          <SignUpForm />
        </Container>
      </Center>
    </Container>
  );
}
