import allCategories from "@/lib/data/arXivCategories.mjs";
import { useCombobox } from "downshift";
import { useState } from "react";
import { Box, Button, HStack, Input } from "@chakra-ui/react";

export function CategoryInput({
  addCategory,
  categories,
}: {
  addCategory: (cat: string) => void;
  categories: string[];
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (allCategories.includes(inputValue)) {
            addCategory(inputValue);
            setInputValue("");
          }
        }}
      >
        <HStack>
          <Input
            placeholder="カテゴリ名を入力、Enterで追加"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            {...getInputProps()}
            width="250px"
            ml="28px"
            size="xs"
          />
          <Button type="submit" size="xs">
            追加
          </Button>
        </HStack>
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
