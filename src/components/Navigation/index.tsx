import { Center, Container, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import NavBar from "@/components/NavBar";
import { useAppDispatch } from "@/hooks";
import ROUTES from "@/lib/routes";
import { setUser, signOut } from "@/slices/authSlice";
import { signoutUser, verifySession } from "@/store/actions/auth.action";

export default function Navigation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await verifySession();
        console.log("checkSession", { res });
        if (res?.user && res.user.id.length > 0) {
          setCheckingAuth(false);
          dispatch(setUser(res.user));
        } else {
          throw new Error("Session not verified");
        }
      } catch (err: unknown) {
        console.error(err);
        dispatch(setUser(null));
        navigate(ROUTES.SIGN_IN);
      }
    };

    checkSession();
  }, [dispatch, navigate]);

  const handleHome = () => {
    navigate(ROUTES.HOME);
  };

  const handleSignOut = async () => {
    const signout = await signoutUser();
    console.log({ signout });
    if (signout?.user) {
      dispatch(signOut());
      navigate(ROUTES.SIGN_IN);
    }
  };

  const handleSettings = () => {
    navigate(ROUTES.SETTINGS);
  };

  if (checkingAuth) {
    return (
      <Center h="100vh">
        <Spinner color="teal.400" size="xl" />
      </Center>
    );
  }

  return (
    <Container
      as="main"
      display="flex"
      flexDir="column"
      maxW={"100%"}
      minH="100vh"
      p="0"
    >
      <NavBar
        handleHome={handleHome}
        handleSettings={handleSettings}
        handleSignOut={handleSignOut}
      />
      <Container as="div" flex="1" marginTop={{ base: "70px", md: "70px" }}>
        <Outlet />
      </Container>
    </Container>
  );
}
