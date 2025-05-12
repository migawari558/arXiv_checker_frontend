import { Heading, Link, Text, Code, Box } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ComponentPropsWithoutRef } from "react";

const ChakraMarkdownComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <Heading as="h1" size="xl" my={4} {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <Heading as="h2" size="lg" my={4} {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <Heading as="h3" size="md" my={4} {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => <Text my={2} {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <Link color="teal.500" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <Code colorScheme="yellow" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul style={{ paddingLeft: "1rem" }} {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol style={{ paddingLeft: "1rem" }} {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <Box
      as="blockquote"
      pl={4}
      borderLeft="4px solid"
      borderColor="gray.300"
      my={2}
      {...(props as ComponentPropsWithoutRef<"div">)}
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
