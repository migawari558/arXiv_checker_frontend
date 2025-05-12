import {
  Card,
  Heading,
  HStack,
  Link,
  Separator,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import env from "dotenv";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { SiArxiv } from "react-icons/si";
import { ImFilePdf } from "react-icons/im";
import { makeCategoryColor } from "../others/makeCategoryColor";
import { AddButton } from "./AddButton";
import { PaperData } from "@/lib/features/articleSlice";
env.config();

export const Article = ({ article }: { article: PaperData }) => {
  return (
    <Card.Root key={article.id} size="md" boxShadow="md">
      <Card.Header>
        <Stack>
          {/* タイトル */}
          <Heading size="lg">{article.title}</Heading>

          {/* 著者 */}
          <Text>
            Author:{" "}
            {article.authors.map((author: string[]) => author).join(",  ")}
          </Text>

          {/* リンク */}
          <HStack>
            <Link
              href={article.links[0].href}
              borderRadius="sm"
              bg="red.600"
              p={1}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiArxiv size={25} color="white" />
            </Link>
            <Link
              href={article.links[1].href}
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
            {article.categories.map((category) => {
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
            {article.published}
          </Text>
        </Stack>
      </Card.Header>
      <Separator mr={4} ml={4} />
      <Card.Body textAlign="justify">
        {/* Summerly */}
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {article.summary}
        </ReactMarkdown>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <AddButton arxivId={article.id} />
      </Card.Footer>
    </Card.Root>
  );
};
