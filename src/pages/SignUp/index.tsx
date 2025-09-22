import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DialogMessage from "@/components/DialogMessage";
import SignUpForm, { FormValues } from "@/components/SignUpForm";
import { useAppDispatch } from "@/hooks";
import ROUTES from "@/lib/routes";
import { setUser } from "@/slices/authSlice";
import { signupUser } from "@/store/actions/auth.action";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [errorTitle, setErrorTitle] = useState<null | string>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async (credentials: FormValues) => {
    const resultAction = await dispatch(signupUser(credentials));

    if (signupUser.fulfilled.match(resultAction)) {
      const user = resultAction.payload.user;
      console.log({ resultAction, user });
      dispatch(setUser(user));
      navigate(ROUTES.NEW_ACCOUNT);
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
      <SignUpForm handleFormSubmit={handleSubmit} />
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
