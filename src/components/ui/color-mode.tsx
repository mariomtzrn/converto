"use client";

import type { IconButtonProps, SpanProps } from "@chakra-ui/react";
import type { ThemeProviderProps } from "next-themes";

import { ClientOnly, IconButton, Skeleton, Span } from "@chakra-ui/react";
import { ThemeProvider, useTheme } from "next-themes";
import * as React from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export type ColorMode = "dark" | "light";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ColorModeProviderProps extends ThemeProviderProps {}

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColorMode(): UseColorModeReturn {
  const { forcedTheme, resolvedTheme, setTheme } = useTheme();
  const colorMode = forcedTheme ?? resolvedTheme;
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return {
    colorMode: colorMode as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        aria-label="Toggle color mode"
        onClick={toggleColorMode}
        ref={ref}
        size="sm"
        variant="ghost"
        {...props}
        css={{
          _icon: {
            height: "5",
            width: "5",
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
});

export const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function LightMode(props, ref) {
    return (
      <Span
        className="chakra-theme light"
        color="fg"
        colorPalette="gray"
        colorScheme="light"
        display="contents"
        ref={ref}
        {...props}
      />
    );
  },
);

export const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function DarkMode(props, ref) {
    return (
      <Span
        className="chakra-theme dark"
        color="fg"
        colorPalette="gray"
        colorScheme="dark"
        display="contents"
        ref={ref}
        {...props}
      />
    );
  },
);
