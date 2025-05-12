"use client";

import { Button, Flex, Heading, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { changeUser } from "../action/changeUser";
import { toaster } from "@/components/ui/toaster";

export function Username({ initUsername }: { initUsername: string }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<string>("");
  const [username, setUsername] = useState<string>(initUsername);

  function toggleEditing() {
    setIsEditing((prev) => !prev);
  }

  async function changeUsernameHandler(): Promise<void> {
    const res = await changeUser({ username: formValue });
    toaster.create({ title: res.msg, type: res.err ? "error" : "success" });
    if (!res.err) {
      setUsername(formValue);
      setFormValue("");
      setIsEditing(false);
    }
  }

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" p={2}>
        <Heading size="md">ユーザー名：{username}</Heading>
        <Button size="sm" variant="outline" onClick={toggleEditing}>
          {!isEditing ? "編集" : "キャンセル"}
        </Button>
      </Flex>
      {isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            changeUsernameHandler();
          }}
        >
          <HStack>
            <Input
              ml="100px"
              width="200px"
              size="xs"
              placeholder="新しいユーザー名（3～25文字）"
              value={formValue}
              onChange={(e) => {
                setFormValue(e.target.value);
              }}
            ></Input>
            <Button size="xs" type="submit">
              変更
            </Button>
          </HStack>
        </form>
      )}
    </>
  );
}
