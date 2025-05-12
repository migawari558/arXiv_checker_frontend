"use client";

import { Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { searchPapers } from "@/lib/features/papersSlice";
import { toaster } from "@/components/ui/toaster";
import { changeFreeWord } from "@/lib/features/searchFormSlice";

export const FreeWordForm = () => {
  const dispatch = useAppDispatch();
  const { formState, error } = useAppSelector((state) => state.searchForm);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await dispatch(searchPapers({ formState: formState }));
        if (error) {
          toaster.create({
            title: error,
            type: "error",
          });
        }
      }}
    >
      <InputGroup startElement={<LuSearch />}>
        <Input
          value={formState.freeWord}
          onChange={(e) =>
            dispatch(
              changeFreeWord({
                freeWord: e.target.value,
              })
            )
          }
          placeholder={`検索ワード`}
        />
      </InputGroup>
    </form>
  );
};
