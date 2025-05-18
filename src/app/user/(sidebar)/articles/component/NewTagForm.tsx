"use client";

import { HStack, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { addTag } from "../actions/tagAction";
import { toaster } from "@/components/ui/toaster";
import { useAppDispatch } from "@/lib/hooks";
import { SetStateAction, Dispatch } from "react";
import { addTagLocal } from "@/lib/features/articleSlice";

export const NewTagForm = ({
  setIsEdit,
  isEdit,
  id,
}: {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  id: string;
}) => {
  const dispatch = useAppDispatch();
  const [newTag, setNewTag] = useState<string>("");

  return (
    isEdit && (
      <form
        action={async (formData) => {
          const tag = formData.get("newTag")?.toString().trim();
          const res = await addTag(tag || "", id);
          toaster.create({
            title: res.msg,
            type: res.err ? "error" : "success",
          });
          if (!res.err) {
            setIsEdit(false);
            dispatch(addTagLocal({ id, tag: tag || "" }));
            setNewTag("");
          }
        }}
      >
        <HStack>
          <Input
            size="xs"
            w={60}
            name="newTag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <Button variant="outline" size="xs" onClick={() => setIsEdit(false)}>
            Cancel
          </Button>
          <Button size="xs" type="submit">
            Add
          </Button>
        </HStack>
      </form>
    )
  );
};
