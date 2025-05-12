import {
  Card,
  Stack,
  Heading,
  Text,
  HStack,
  Link,
  Wrap,
  WrapItem,
  Tag,
  Separator,
  Dialog,
} from "@chakra-ui/react";
import { SiArxiv } from "react-icons/si";
import { ImFilePdf } from "react-icons/im";
import { makeCategoryColor } from "../../../timeline/others/makeCategoryColor";
import { category } from "../MyArticle";
import { ArticleData, PaperData } from "@/lib/features/articleSlice";

export const ArticleCard = ({
  paper,
  article,
}: {
  paper: PaperData;
  article: ArticleData;
}) => {
  return (
    <Dialog.Trigger asChild>
      <Card.Root size="md" boxShadow="md" _hover={{ bg: "blackAlpha.200" }}>
        <Card.Header>
          <Stack>
            {/* タイトル */}
            <Heading size="lg">{paper.title}</Heading>

            {/* 著者 */}
            <Text>
              Author:{" "}
              {paper.authors.map((author: string[]) => author).join(",  ")}
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

            {/* 投稿日 */}
            <Text
              display="flex"
              justifyContent="flex-end"
              textStyle="xs"
              opacity="0.6"
            >
              {paper.published}
            </Text>
          </Stack>
        </Card.Header>
        <Separator mr={4} ml={4} />
        <Card.Body>
          {/* タグ */}
          <Wrap>
            {article.tags.map((tag: string) => {
              return (
                <WrapItem key={tag}>
                  <Tag.Root size="md" colorPalette="gray">
                    <Tag.Label>{tag}</Tag.Label>
                  </Tag.Root>
                </WrapItem>
              );
            })}
          </Wrap>
        </Card.Body>
      </Card.Root>
    </Dialog.Trigger>
  );
};
