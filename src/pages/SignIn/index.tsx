import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DialogMessage from "@/components/DialogMessage";
import SignInForm, { FormValues } from "@/components/SignInForm";
import { useAppDispatch } from "@/hooks";
import ROUTES from "@/lib/routes";
import { setUser } from "@/slices/authSlice";
import { signinUser } from "@/store/actions/auth.action";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [errorTitle, setErrorTitle] = useState<null | string>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async (credentials: FormValues) => {
    const resultAction = await dispatch(signinUser(credentials));

    if (signinUser.fulfilled.match(resultAction)) {
      const user = resultAction.payload.user;
      if (user) {
        console.log({ user });
        dispatch(setUser(user));
        navigate(ROUTES.HOME);
      }
    } else {
      // Show error message
      console.error({ resultAction });
      if (resultAction.payload) {
        setErrorMessage("Failed to sign in. Please try again.");
        setErrorTitle("Alert");
        setOpenDialog(true);
      }
    }
  };

  const handleAccept = () => {
    setOpenDialog(false);
    setErrorTitle(null);
    setErrorMessage(null);
  };

  return (
    <Container padding={2}>
      <SignInForm handleFormSubmit={handleSubmit} />
      {errorTitle && errorMessage && (
        <DialogMessage
          actionAccept={handleAccept}
          message={errorMessage}
          status={openDialog}
          title={errorTitle}
        />
      )}
    </Container>
  );
}
