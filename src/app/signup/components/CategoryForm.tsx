"use client";

import { useState } from "react";
import allCategories from "@/lib/data/arXivCategories.mjs";
import { useCombobox } from "downshift";
import { makeCategoryColor } from "@/app/user/(sidebar)/timeline/others/makeCategoryColor";
import { Field, Wrap, WrapItem, Tag, Input, Box } from "@chakra-ui/react";

export function CategoryForm({
  categories,
  addCategory,
  removeCategory,
}: {
  categories: string[];
  addCategory: { (cat: string): void };
  removeCategory: { (cat: string): void };
}) {
  const [inputValue, setInputValue] = useState<string>("");

  // 自動補完周りの設定
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    inputValue: inputValue,
    items: allCategories.filter(
      (cat) =>
        cat.toLowerCase().includes(inputValue.toLowerCase()) &&
        !categories.includes(cat)
    ),
    onInputValueChange({ inputValue }) {
      setInputValue(inputValue ?? "");
    },
  });

  return (
    <>
      <Field.Root>
        <Field.Label>専攻分野</Field.Label>
        <Wrap>
          {categories.map((cat) => {
            const color: string = makeCategoryColor(cat);
            return (
              <WrapItem key={cat}>
                <Tag.Root bg={`${color}.100`} color={`${color}.700`}>
                  <Tag.Label>{cat}</Tag.Label>
                  <Tag.EndElement>
                    <Tag.CloseTrigger
                      cursor="pointer"
                      onClick={() => {
                        removeCategory(cat);
                      }}
                    />
                  </Tag.EndElement>
                </Tag.Root>
              </WrapItem>
            );
          })}
        </Wrap>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (allCategories.includes(inputValue)) {
              addCategory(inputValue);
              setInputValue("");
            }
          }}
        >
          <Input
            placeholder="カテゴリ名を入力、Enterで追加"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            {...getInputProps()}
            width="250px"
          />
        </form>
      </Field.Root>
      <Box {...getMenuProps()} position="relative">
        {isOpen && (
          <Box
            position="absolute"
            bg="white"
            border="1px solid #ccc"
            borderRadius="md"
            width="100%"
            zIndex="10"
            maxHeight="200px"
            overflowY="auto"
          >
            {allCategories
              .filter(
                (cat) =>
                  cat.toLowerCase().includes(inputValue.toLowerCase()) &&
                  !categories.includes(cat)
              )
              .map((item, index) => (
                <Box
                  key={item}
                  bg={highlightedIndex === index ? "gray.100" : "white"}
                  p="2"
                  cursor="pointer"
                  {...getItemProps({ item, index })}
                >
                  {item}
                </Box>
              ))}
          </Box>
        )}
      </Box>
    </>
  );
}
