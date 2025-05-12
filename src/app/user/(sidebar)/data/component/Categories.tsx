"use client";

import { useState } from "react";
import { makeCategoryColor } from "@/app/user/(sidebar)/timeline/others/makeCategoryColor";
import {
  Wrap,
  WrapItem,
  Tag,
  Box,
  Heading,
  Flex,
  Button,
} from "@chakra-ui/react";
import { changeUser } from "../action/changeUser";
import { toaster } from "@/components/ui/toaster";
import { CategoryInput } from "./CategoryInput";

export function Categories({ initcategories }: { initcategories: string[] }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  function toggleEditing() {
    if (isEditing) window.location.reload();
    setIsEditing((prev) => !prev);
  }
  const [categories, setCategories] = useState<string[]>(initcategories);

  function addCategory(cat: string): void {
    const prev: string[] = [...categories];
    const newCategories: string[] = Array.from(new Set([...prev, cat]));
    setCategories(newCategories);
  }

  function removeCategory(cat: string): void {
    const prev: string[] = [...categories];
    const newCategories: string[] = prev.filter((c) => c !== cat);
    setCategories(newCategories);
  }

  async function changeCategoryHandler(): Promise<void> {
    const res = await changeUser({ categories: categories });
    toaster.create({ title: res.msg, type: res.err ? "error" : "success" });
    if (!res.err) {
      setIsEditing(false);
    }
  }

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" p={2}>
        <Box>
          <Heading size="md" mb={2}>
            専攻分野：
          </Heading>
          <Wrap ml="20px">
            {categories.map((cat) => {
              const color: string = makeCategoryColor(cat);
              return (
                <WrapItem key={cat}>
                  <Tag.Root bg={`${color}.100`} color={`${color}.700`}>
                    <Tag.Label>{cat}</Tag.Label>
                    {isEditing && (
                      <Tag.EndElement>
                        <Tag.CloseTrigger
                          cursor="pointer"
                          onClick={() => {
                            removeCategory(cat);
                          }}
                        />
                      </Tag.EndElement>
                    )}
                  </Tag.Root>
                </WrapItem>
              );
            })}
          </Wrap>
        </Box>

        <Button size="sm" variant="outline" onClick={toggleEditing}>
          {!isEditing ? "編集" : "キャンセル"}
        </Button>
      </Flex>
      {isEditing && (
        <>
          <CategoryInput categories={categories} addCategory={addCategory} />
          <Flex justifyContent="end" alignItems="center">
            <Button size="xs" mr={2} onClick={changeCategoryHandler}>
              変更を確定
            </Button>
          </Flex>
        </>
      )}
    </>
  );
}
