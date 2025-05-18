"use client";

import { Alert, SimpleGrid, Center, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchArticles,
  ArticleData,
  PaperData,
} from "@/lib/features/articleSlice";
import { Toaster } from "@/components/ui/toaster";

import { MyArticle } from "./component/MyArticle";

export default function MyArticles() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert.Root>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>{error}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  return (
    <>
      <Toaster />
      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }} gap={3}>
        {items.map((data: { article: ArticleData; paper: PaperData }) => (
          <MyArticle
            key={data.article._id.toString()}
            data={data}
            id={data.article._id.toString()}
          />
        ))}
      </SimpleGrid>
    </>
  );
}
