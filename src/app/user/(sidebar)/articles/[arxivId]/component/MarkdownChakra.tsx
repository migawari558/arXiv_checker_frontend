import { Heading, Link, Text, Code, Box, List } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChakraMarkdownComponents = {
  h1: (props: any) => <Heading as="h1" size="xl" my={4} {...props} />,
  h2: (props: any) => <Heading as="h2" size="lg" my={4} {...props} />,
  h3: (props: any) => <Heading as="h3" size="md" my={4} {...props} />,
  p: (props: any) => <Text my={2} {...props} />,
  a: (props: any) => <Link color="teal.500" {...props} />,
  code: (props: any) => <Code colorScheme="yellow" {...props} />,
  ul: (props: any) => <List.Root pl={4} {...props} />,
  ol: (props: any) => <List.Root as="ol" pl={4} {...props} />,
  li: (props: any) => <List.Item {...props} />,
  blockquote: (props: any) => (
    <Box
      pl={4}
      borderLeft="4px solid"
      borderColor="gray.300"
      my={2}
      {...props}
    />
  ),
};

export function MarkdownChakra({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={ChakraMarkdownComponents}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
}
