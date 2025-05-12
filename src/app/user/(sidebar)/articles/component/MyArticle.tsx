"use client";

import {
  Dialog,
  Stack,
  Text,
  HStack,
  Link,
  Portal,
  CloseButton,
  Wrap,
  WrapItem,
  Flex,
  Tag,
  Tabs,
} from "@chakra-ui/react";
import { SiArxiv } from "react-icons/si";
import { ImFilePdf } from "react-icons/im";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { makeCategoryColor } from "../../timeline/others/makeCategoryColor";
import { HiPlus } from "react-icons/hi";
import { toaster } from "@/components/ui/toaster";
import { deleteTag } from "../actions/tagAction";
import { useState, useEffect } from "react";
import { NewTagForm } from "./NewTagForm";
import { Note } from "./Note";
import {
  ArticleData,
  PaperData,
  removeTagLocal,
} from "@/lib/features/articleSlice";
import { useAppDispatch } from "@/lib/hooks";
import { ArticleCard } from "./ArticleComponents/ArticleCard";

export type category = {
  term: string;
  scheme: string;
};

const useUnsavedChangesWarning = (shouldWarn: boolean) => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!shouldWarn) return;
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [shouldWarn]);
};

export const MyArticle = ({
  data,
  index,
}: {
  data: { article: ArticleData; paper: PaperData };
  index: number;
}) => {
  const dispatch = useAppDispatch();

  // tagの管理
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // note が保存済みかどうか
  const [isNoteChanged, setIsNoteChanged] = useState<boolean>(false);

  // ページ更新を警告
  useUnsavedChangesWarning(isNoteChanged);

  const { paper, article } = data;
  return (
    <>
      <Dialog.Root
        size="full"
        // placement="center"
        motionPreset="slide-in-bottom"
      >
        <ArticleCard paper={paper} article={article} />

        {/* ポップアップ */}
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content display="flex" flexDirection="column">
              <Dialog.Header>
                <Stack>
                  <>
                    <Dialog.Title>{paper.title}</Dialog.Title>
                    <Dialog.CloseTrigger
                      asChild
                      onClick={(e) => {
                        if (isNoteChanged) {
                          const confirmClose = window.confirm(
                            "変更が保存されていません。閉じますか？"
                          );
                          if (!confirmClose) {
                            e.preventDefault();
                            return;
                          }
                          setIsNoteChanged(false);
                        }
                      }}
                    >
                      <CloseButton size="sm" onClick={() => setIsEdit(false)} />
                    </Dialog.CloseTrigger>
                    {/* 著者 */}
                    <Text>
                      Author:{" "}
                      {paper.authors
                        .map((author: string[]) => author)
                        .join(",  ")}
                    </Text>

                    {/* リンク */}
                    <HStack>
                      <Link
                        href={paper.links[0].href}
                        borderRadius="sm"
                        bg="red.600"
                        p={1}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SiArxiv size={25} color="white" />
                      </Link>
                      <Link
                        href={paper.links[1].href}
                        borderRadius="sm"
                        p={1}
                        borderColor="red"
                        borderWidth={1}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ImFilePdf size={25} color="red" />
                      </Link>
                    </HStack>

                    {/* カテゴリ */}
                    <Wrap justify="flex-end">
                      {paper.categories.map((category: category) => {
                        const color: string = makeCategoryColor(category.term);
                        return (
                          <WrapItem key={category.term}>
                            <Text
                              textStyle="sm"
                              bg={`${color}.100`}
                              color={`${color}.700`}
                              borderRadius="sm"
                              p="1px"
                              opacity="0.8"
                            >
                              {category.term}
                            </Text>
                          </WrapItem>
                        );
                      })}
                    </Wrap>
                    <Flex justify="space-between" align="center">
                      {/* タグ */}
                      <Wrap>
                        {article.tags.map((tag: string) => {
                          return (
                            <WrapItem key={tag}>
                              <Tag.Root size="md" colorPalette="gray">
                                <Tag.Label>{tag}</Tag.Label>

                                <Tag.EndElement>
                                  <Tag.CloseTrigger
                                    _hover={{ cursor: "pointer" }}
                                    onClick={async () => {
                                      const res = await deleteTag(
                                        tag,
                                        article._id.toString()
                                      );
                                      toaster.create({
                                        title: res.msg,
                                        type: res.err ? "error" : "success",
                                      });
                                      if (res.err) window.location.reload();
                                      dispatch(removeTagLocal({ index, tag }));
                                    }}
                                  />
                                </Tag.EndElement>
                              </Tag.Root>
                            </WrapItem>
                          );
                        })}

                        {/* タグ追加 */}
                        <Tag.Root
                          size="md"
                          colorPalette="gray"
                          _hover={{ cursor: "pointer" }}
                          onClick={() => setIsEdit(true)}
                        >
                          <Tag.StartElement>
                            <HiPlus />
                          </Tag.StartElement>
                          <Tag.Label>タグを追加</Tag.Label>
                        </Tag.Root>
                      </Wrap>

                      {/* 投稿日 */}
                      <Text textStyle="xs" opacity="0.6">
                        {paper.published}
                      </Text>
                    </Flex>

                    <NewTagForm
                      isEdit={isEdit}
                      setIsEdit={setIsEdit}
                      index={index}
                    />
                  </>
                </Stack>
              </Dialog.Header>
              <Dialog.Body>
                <Stack>
                  <Tabs.Root defaultValue="summary" variant="line">
                    <Tabs.List>
                      <Tabs.Trigger value="summary">Summary</Tabs.Trigger>
                      <Tabs.Trigger value="note">Note</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content
                      value="summary"
                      // overflowY="auto"
                      fontSize="md"
                      lineHeight="1.3"
                      textAlign="justify"
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {paper.summary}
                      </ReactMarkdown>
                    </Tabs.Content>
                    <Tabs.Content value="note" overflowY="auto">
                      <Note
                        index={index}
                        setIsNoteChanged={setIsNoteChanged}
                        isNoteChanged={isNoteChanged}
                      />
                    </Tabs.Content>
                  </Tabs.Root>
                </Stack>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};
