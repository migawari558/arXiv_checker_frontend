"use client";

import { Box } from "@chakra-ui/react";
import { Form } from "./component/Form";
import { Toaster } from "@/components/ui/toaster";
import { Papers } from "./component/Papers";

export default function Search() {
  return (
    <>
      <Toaster />
      <Form />
      <Box mt="80px">
        <Papers />
      </Box>
    </>
  );
}
