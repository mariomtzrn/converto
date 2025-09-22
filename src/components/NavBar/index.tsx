import {
  Avatar,
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Flex,
  HStack,
  IconButton,
  Menu,
  Portal,
  Separator,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import userImage from "@/assets/chad.png";
import ROUTES from "@/lib/routes";

import "./index.css";

interface MobileProps extends NavLinkProps {
  onClose: () => void;
}

interface NavBarProps {
  handleHome: () => void;
  handleSettings: () => void;
  handleSignOut: () => void;
}

interface NavLinkProps {
  children: React.ReactNode;
  url: string;
}

const NavBarIcon = ({
  onClick,
  openStatus,
}: {
  onClick: () => void;
  openStatus: boolean;
}) => {
  return (
    <label className={openStatus ? "bar open" : "bar"} htmlFor="check">
      <input id="check" onChange={onClick} type="checkbox" />

      <span className="top"></span>
      <span className="middle"></span>
      <span className="bottom"></span>
    </label>
  );
};

const NavLink = (props: NavLinkProps) => {
  const { children, url } = props;

  return (
    <Box px={1} py={1} rounded={"md"}>
      <ChakraLink
        _active={{ border: "none", color: "#DFD0B8" }}
        _hover={{
          color: "#fff",
          textShadow:
            "0 0 5px #fff, 0 0 5px #fff, 0 0 5px #e60073, 0 0 5px #e60073, 0 0 5px #e60073, 0 0 5px #e60073, 0 0 5px #e60073",
        }}
        asChild
        color="#fff"
        transition="all 150ms ease-in-out"
      >
        <Link to={url}>{children}</Link>
      </ChakraLink>
    </Box>
  );
};

const MobileNavLink = (props: MobileProps) => {
  const { children, onClose, url } = props;

  return (
    <Box
      _active={{ bgColor: "#D4C9BE" }}
      _hover={{ bgColor: "#D4C9BE" }}
      transition="background-color 150ms ease-in-out"
    >
      <ChakraLink
        _active={{ color: "#DFD0B8" }}
        _hover={{ color: "#948979" }}
        alignItems="center"
        asChild
        color="#fff"
        display="flex"
        h="100%"
        justifyContent="center"
        onClick={onClose}
        p="20px"
        transition="color 150ms ease-in-out"
        w="100%"
      >
        <Link to={url}>{children}</Link>
      </ChakraLink>
    </Box>
  );
};

export default function NavBar(props: NavBarProps) {
  const { handleHome, handleSettings, handleSignOut } = props;
  const { onClose, onOpen, open } = useDisclosure();

  const onHeaderClick = () => {
    handleHome();
    onClose();
  };

  return (
    <Box
      _before={{
        background: "linear-gradient(45deg, #ffbc00, #ff0058, #8B3489)",
        content: '""',
        filter: "blur(30px)",
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%",
      }}
      background="linear-gradient(45deg, #ffbc00, #ff0058, #8B3489)"
      h="50px"
      paddingX={2}
      position="absolute"
      top={0}
      w="100vw"
      zIndex={{ base: 4, md: 1 }}
    >
      <Flex align="center" direction="row" h="inherit" justify="space-between">
        <Flex
          align="center"
          direction="row"
          h="inherit"
          justify="space-between"
        >
          <IconButton
            aria-label={"Open Menu"}
            bg={"transparent"}
            display={{ md: "none" }}
            size={"md"}
          >
            <NavBarIcon onClick={open ? onClose : onOpen} openStatus={open} />
          </IconButton>
          <Container padding={0}>
            <Text
              _active={{ border: "none", color: "#DFD0B8" }}
              _hover={{
                color: "#fff",
                textShadow:
                  "0 0 5px #fff, 0 0 5px #fff, 0 0 5px #e60073, 0 0 5px #e60073, 0 0 5px #e60073, 0 0 5px #e60073, 0 0 5px #e60073",
              }}
              color="#fff"
              cursor="pointer"
              fontFamily="Oswald"
              fontSize={30}
              marginBottom={1}
              onClick={onHeaderClick}
              transition="all 150ms ease-in-out"
            >
              CONVERTO
            </Text>
          </Container>
          <Container padding={0}>
            <HStack as={"nav"} display={{ base: "none", md: "flex" }}>
              {ROUTES.UNITS.map((link) => (
                <NavLink key={link.url} url={link.url}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </Container>
        </Flex>
        <Flex
          align="center"
          direction="row"
          h="inherit"
          justify="space-between"
        >
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button cursor={"pointer"} maxW={0} rounded={"full"}>
                <Avatar.Root>
                  <Avatar.Fallback name="Segun Adebayo" />
                  <Avatar.Image src={userImage} />
                </Avatar.Root>
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    cursor={"pointer"}
                    onClick={handleSettings}
                    value="user-settings"
                  >
                    Settings
                  </Menu.Item>
                  <Menu.Item
                    cursor={"pointer"}
                    onClick={handleSignOut}
                    value="user-logout"
                  >
                    Sign out
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex>
      </Flex>
      <Box
        bg="#000"
        bottom="0"
        display={{ md: "none" }}
        height="calc(100vh - 60px)"
        left="0"
        overflowY="auto"
        pb={4}
        position="fixed"
        right="0"
        top="50px"
        transform={open ? "translate(0%, 0);" : "translate(-100%, 0);"}
        transition="transform 200ms ease-in-out"
        zIndex="10"
      >
        <Stack as={"nav"}>
          {ROUTES.UNITS.map((link) => (
            <>
              <MobileNavLink key={link.url} onClose={onClose} url={link.url}>
                {link.name}
              </MobileNavLink>
              <Separator marginLeft="5%" marginRight="5%" maxWidth="90%" />
            </>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
