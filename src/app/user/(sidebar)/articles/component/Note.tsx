"use client";

import * as locales from "@blocknote/core/locales";
import { Block } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, lightDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useState } from "react";
import { SetStateAction, Dispatch } from "react";
import { HStack, Link, Switch } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateNote, toggleIsOpen } from "@/lib/features/articleSlice";
import "../css/editor.css";

export const Note = ({
  id,
  setIsNoteChanged,
  isNoteChanged,
}: {
  id: string;
  setIsNoteChanged: Dispatch<SetStateAction<boolean>>;
  isNoteChanged: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { items, error } = useAppSelector((state) => state.articles);
  const thisArticle = items.find((i) => i.article._id.toString() === id);
  const initContent: string = thisArticle?.article.note || "";
  const arxivId: string = thisArticle?.article.arXivId || "notFound";

  // 現在のノート状況
  const [content, setContent] = useState<Block[] | undefined>(
    initContent ? (JSON.parse(initContent) as Block[]) : undefined
  );

  // ノートの公開を制御
  const [checked, setChecked] = useState(false);

  // Noteのほぞん
  const saveNoteHandler = async (note: Block[] | undefined) => {
    await dispatch(updateNote({ id, note }));
    toaster.create({
      title: error ? error : "ノートを保存しました",
      type: error ? "error" : "success",
    });
  };

  // isOpenの変更
  const toggleIsOpenHandler = async (isOpen: boolean) => {
    if (isOpen && !checked) {
      const confirmed = window.confirm("本当にノートを他人に公開しますか？");
      if (!confirmed) return; // ユーザーがキャンセルした場合は反映しない
    }
    await dispatch(toggleIsOpen({ id, isOpen }));
    toaster.create({
      title: error ? error : `ノートを${isOpen ? "公開" : "非公開に"}しました`,
      type: error ? "error" : "success",
    });
    if (!error) setChecked(isOpen);
  };

  const editor = useCreateBlockNote({
    initialContent: content,
    dictionary: locales.ja,
  });

  const handleChange = async (e: { checked: boolean }) => {
    await toggleIsOpenHandler(e.checked);
  };

  return (
    <>
      <HStack position="fixed" bottom="20px" right="20px" zIndex="tooltip">
        <Switch.Root
          checked={checked}
          onCheckedChange={handleChange}
          right="280px"
          bottom="30px"
          position="fixed"
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>ノートを公開する</Switch.Label>
        </Switch.Root>
        <Link
          href={`/user/articles/${arxivId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline">他の人のノートを参照</Button>
        </Link>
        <Button
          onClick={async () => {
            await saveNoteHandler(content);
            setIsNoteChanged(false);
          }}
        >
          保存
        </Button>
      </HStack>
      <BlockNoteView
        editor={editor}
        theme={lightDefaultTheme}
        className="editor-custom-style"
        onChange={() => {
          setContent(editor.document);
          if (!isNoteChanged) {
            setIsNoteChanged(true);
          }
        }}
      />
    </>
  );
};
