"use client";

import { Block, BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/style.css";
import { Card, Center, Heading, HStack, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";
import { MarkdownChakra } from "./MarkdownChakra";

type NoteData = {
  username: string;
  note: string;
};

export function Note({ data }: { data: NoteData }) {
  const { username, note } = data;

  const [markdown, setMarkdown] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const blockNote = JSON.parse(note) as Block[];

  useEffect(() => {
    setIsLoading(true);
    const editor = BlockNoteEditor.create({ initialContent: blockNote });

    editor
      .blocksToMarkdownLossy(blockNote)
      .then((markdownContent: string) => setMarkdown(markdownContent))
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Card.Root boxShadow="md" size="md" m={2}>
      <Card.Header>
        <HStack>
          <LuUser size={25} />
          <Heading>{username}</Heading>
        </HStack>
      </Card.Header>
      <Card.Body>
        {isLoading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : (
          <MarkdownChakra content={markdown} />
        )}
      </Card.Body>
    </Card.Root>
  );
}
