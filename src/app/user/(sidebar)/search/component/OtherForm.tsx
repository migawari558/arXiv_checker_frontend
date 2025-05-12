"use client";

import { HStack, Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  changeAbstruct,
  changeAuthor,
  changeTitle,
} from "@/lib/features/searchFormSlice";

export const OtherForm = () => {
  const dispatch = useAppDispatch();
  const { formState } = useAppSelector((state) => state.searchForm);

  return (
    <HStack mb={2}>
      <InputGroup startElement={<LuSearch />}>
        <Input
          size="2xs"
          value={formState.author}
          onChange={(e) => dispatch(changeAuthor({ author: e.target.value }))}
          placeholder="著者名"
        />
      </InputGroup>
      <InputGroup startElement={<LuSearch />}>
        <Input
          size="2xs"
          value={formState.title}
          onChange={(e) => dispatch(changeTitle({ title: e.target.value }))}
          placeholder="タイトル"
        />
      </InputGroup>
      <InputGroup startElement={<LuSearch />}>
        <Input
          size="2xs"
          value={formState.abstruct}
          onChange={(e) =>
            dispatch(changeAbstruct({ abstruct: e.target.value }))
          }
          placeholder="概要"
        />
      </InputGroup>
    </HStack>
  );
};
