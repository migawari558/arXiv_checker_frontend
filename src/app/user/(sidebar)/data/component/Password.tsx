"use client";

import { Button, Field, Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { changeUser } from "../action/changeUser";
import { toaster } from "@/components/ui/toaster";
import { PasswordInput } from "@/components/ui/password-input";

export function Password() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [newPassword1, setNewPassword1] = useState<string>("");
  const [newPassword2, setNewPassword2] = useState<string>("");

  function toggleEditing() {
    setIsEditing((prev) => !prev);
  }

  async function changePasswordHandler(): Promise<void> {
    if (!(newPassword1 === newPassword2)) {
      toaster.create({
        title: "確認用パスワードが一致していません",
        type: "error",
      });
      return;
    }
    const res = await changeUser({
      password: password,
      newpassword: newPassword1,
    });
    toaster.create({ title: res.msg, type: res.err ? "error" : "success" });
    if (!res.err) {
      setPassword("");
      setNewPassword1("");
      setNewPassword2("");
      setIsEditing(false);
    }
  }

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" p={2}>
        <Heading size="md">パスワード：***</Heading>
        <Button size="sm" variant="outline" onClick={toggleEditing}>
          {!isEditing ? "編集" : "キャンセル"}
        </Button>
      </Flex>
      {isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            changePasswordHandler();
          }}
        >
          <Stack>
            <Field.Root ml="100px" width="400px">
              <Field.Label>現在のパスワード</Field.Label>
              <PasswordInput
                size="xs"
                placeholder=""
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Field.Root>
            <Field.Root ml="100px" width="400px">
              <Field.Label>新しいパスワード</Field.Label>
              <PasswordInput
                size="xs"
                placeholder="10～40文字、英大文字・小文字・数字・記号を全て含める"
                value={newPassword1}
                onChange={(e) => {
                  setNewPassword1(e.target.value);
                }}
              />
            </Field.Root>
            <HStack ml="100px" alignItems="end">
              <Field.Root width="400px">
                <Field.Label>新しいパスワード（確認用）</Field.Label>
                <PasswordInput
                  size="xs"
                  placeholder=""
                  value={newPassword2}
                  onChange={(e) => {
                    setNewPassword2(e.target.value);
                  }}
                />
              </Field.Root>
              <Button size="xs" type="submit">
                変更
              </Button>
            </HStack>
          </Stack>
        </form>
      )}
    </>
  );
}
