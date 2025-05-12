"use client";

import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { addAction } from "../actions/addAction";
import { toaster } from "@/components/ui/toaster";

// 論文保存用のボタン
export const AddButton = ({ arxivId }: { arxivId: string }) => {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  if (isLoading) return <Button loading></Button>;

  return (
    <>
      {isAdded ? (
        <Button variant="outline" disabled>
          追加済
        </Button>
      ) : (
        <Button
          onClick={async () => {
            setIsLoading(true);
            setIsAdded(true);
            const res = await addAction(arxivId);
            toaster.create({
              title: res.msg,
              type: res.err ? "error" : "success",
            });
            setIsLoading(false);
          }}
        >
          追加
        </Button>
      )}
    </>
  );
};
