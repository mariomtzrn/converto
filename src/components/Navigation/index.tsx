import { Center, Container, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import NavBar from "@/components/NavBar";
import { useAppDispatch } from "@/hooks";
import { logOut, setUser } from "@/slices/authSlice";
import { logoutUser, verifySession } from "@/store/actions/auth.action";

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
        navigate("/account/signin");
      }
    };

    checkSession();
  }, [dispatch, navigate]);

  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    const logout = await logoutUser();
    if (logout?.user) {
      dispatch(logOut());
      navigate("/login");
    }
  };

  const handleSettings = () => {
    navigate("/settings");
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
        handleLogout={handleLogout}
        handleSettings={handleSettings}
      />
      <Container as="div" flex="1" marginTop={{ base: "70px", md: "70px" }}>
        <Outlet />
      </Container>
    </Container>
  );
}
