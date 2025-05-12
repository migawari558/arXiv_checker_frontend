"use client";

import {
  Box,
  Input,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
  Popover,
  Portal,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCombobox } from "downshift";
import allCategories from "../../../../../lib/data/arXivCategories.mjs";
import { HiPlus } from "react-icons/hi";
import { makeCategoryColor } from "../../timeline/others/makeCategoryColor";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addCategory, removeCategory } from "@/lib/features/searchFormSlice";

export function CategoryAutocomplete() {
  const dispatch = useAppDispatch();
  const { formState } = useAppSelector((state) => state.searchForm);

  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

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
        !formState.categories.includes(cat)
    ),
    onInputValueChange({ inputValue }) {
      setInputValue(inputValue ?? "");
    },
  });

  return (
    <HStack>
      <Wrap>
        <WrapItem>
          <Text fontSize="sm" width="98px">
            検索カテゴリ：
          </Text>
        </WrapItem>
        {formState.categories.map((cat) => {
          const color: string = makeCategoryColor(cat);
          return (
            <WrapItem key={cat}>
              <Tag.Root bg={`${color}.100`} color={`${color}.700`}>
                <TagLabel>{cat}</TagLabel>
                <Tag.EndElement>
                  <Tag.CloseTrigger
                    cursor="pointer"
                    onClick={() => {
                      dispatch(removeCategory({ removeCategory: cat }));
                    }}
                  />
                </Tag.EndElement>
              </Tag.Root>
            </WrapItem>
          );
        })}
        <WrapItem>
          <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Popover.Trigger asChild>
              <Tag.Root
                size="md"
                colorPalette="gray"
                _hover={{ cursor: "pointer" }}
                onClick={() => setOpen(true)}
              >
                <Tag.StartElement>
                  <HiPlus />
                </Tag.StartElement>
                <Tag.Label>カテゴリを追加</Tag.Label>
              </Tag.Root>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Body>
                    <Popover.Title fontWeight="medium">
                      検索カテゴリを追加
                    </Popover.Title>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (allCategories.includes(inputValue)) {
                          dispatch(addCategory({ newCategory: inputValue }));
                          setOpen(false);
                          setInputValue("");
                        }
                      }}
                    >
                      <Input
                        placeholder="カテゴリ名"
                        value={inputValue}
                        {...getInputProps()}
                      />
                    </form>
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
                                cat
                                  .toLowerCase()
                                  .includes(inputValue.toLowerCase()) &&
                                !formState.categories.includes(cat)
                            )
                            .map((item, index) => (
                              <Box
                                key={item}
                                bg={
                                  highlightedIndex === index
                                    ? "gray.100"
                                    : "white"
                                }
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
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
        </WrapItem>
      </Wrap>
    </HStack>
  );
}
