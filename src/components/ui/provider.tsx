"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { type ColorModeProviderProps } from "./color-mode";

export function Provider(props: ColorModeProviderProps) {
  const { children } = props;
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
