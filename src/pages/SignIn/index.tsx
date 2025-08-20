import { Center, Container } from "@chakra-ui/react";

import SignInForm from "@/components/SignInForm";

export default function SignIn() {
  return (
    <Container display="flex" flexDir="column" p="0" zIndex={1}>
      <Center>
        <Container>
          <SignInForm />
        </Container>
      </Center>
    </Container>
  );
}
