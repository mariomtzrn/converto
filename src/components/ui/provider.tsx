"use client";

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineRecipe,
} from "@chakra-ui/react";

import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

const headingRecipe = defineRecipe({
  base: {
    color: "#fff",
    fontWeight: "bold",
    textStyle: "2xl",
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const system = createSystem(defaultConfig, {
  theme: {
    breakpoints: {
      desktop: "1200px",
      mobile: "480px",
      tablet: "900px",
      wide: "1400px",
    },
    recipes: {
      heading: headingRecipe,
    },
  },
});

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
