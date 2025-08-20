import { Center, Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import SignInForm, { FormValues } from "@/components/SignInForm";
import { useAppDispatch } from "@/hooks";
import ROUTES from "@/lib/routes";
import { setUser } from "@/slices/authSlice";
import { signinUser } from "@/store/actions/auth.action";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (credentials: FormValues) => {
    const resultAction = await dispatch(signinUser(credentials));

    if (signinUser.fulfilled.match(resultAction)) {
      const user = resultAction.payload.user;
      console.log({ resultAction, user });
      dispatch(setUser(user));
      navigate(ROUTES.HOME);
    } else {
      console.error({ resultAction });
    }
  };

  return (
    <Container display="flex" flexDir="column" p="0" zIndex={1}>
      <Center>
        <Container>
          <SignInForm handleFormSubmit={handleSubmit} />
        </Container>
      </Center>
    </Container>
  );
}
