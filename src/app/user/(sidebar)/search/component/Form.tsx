"use client";

import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { CategoryAutocomplete } from "./CategoryField";
import { FreeWordForm } from "./FreeWord";
import { useState, useEffect } from "react";
import { OtherForm } from "./OtherForm";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { searchPapers } from "@/lib/features/papersSlice";
import { getUserCategory } from "@/lib/features/searchFormSlice";
import { toaster } from "@/components/ui/toaster";

export type FormState = {
  freeWord: string;
  title: string;
  author: string;
  abstruct: string;
  categories: string[];
};

export function Form() {
  const dispatch = useAppDispatch();
  const { formState, error } = useAppSelector((state) => state.searchForm);

  // userのカテゴリを取得
  useEffect(() => {
    dispatch(getUserCategory());
  }, [dispatch]);

  // 詳細検索をOpenにするか
  const [isDetail, setIsDetail] = useState<boolean>(false);

  return (
    <>
      <Box
        position="fixed"
        borderWidth={1}
        zIndex="tooltip"
        boxShadow="md"
        bg="white"
        p={2}
        pl={5}
        pr={5}
        left="55px"
        right="0"
        top="0"
      >
        <Stack>
          <FreeWordForm />
          <Flex justify="flex-end">
            <Button
              size="2xs"
              variant="outline"
              onClick={() => {
                setIsDetail((prev) => !prev);
              }}
            >
              {!isDetail ? <LuChevronDown /> : <LuChevronUp />}
              詳細検索
            </Button>
          </Flex>
          {isDetail && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.1 }} // アニメーションの時間（秒）
            >
              <OtherForm />
              <CategoryAutocomplete />
              <Flex justify="flex-end">
                <Button
                  size="xs"
                  onClick={async (e) => {
                    e.preventDefault();
                    dispatch(searchPapers({ formState: formState }));
                    if (error) {
                      toaster.create({
                        title: error,
                        type: "error",
                      });
                    }
                  }}
                >
                  詳細検索
                </Button>
              </Flex>
            </motion.div>
          )}
        </Stack>
      </Box>
    </>
  );
}
