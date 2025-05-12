"use client";

import { PasswordInput } from "@/components/ui/password-input";
import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  Portal,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { deleteUser } from "../action/deleteUser";
import { toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";

export function DeleteForm() {
  const [formValue, setFormValue] = useState<string>("");

  return (
    <Flex justify="end" width="100%" pr={2}>
      <Dialog.Root size="sm" role="alertdialog">
        <Dialog.Trigger asChild>
          <Button colorPalette="red" variant="surface">
            アカウント削除
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>本当に削除しますか？</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text>
                  アカウントを削除すると、二度と復元することができません。それでも削除したい場合には、パスワードを入力して削除ボタンを押してください。
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Flex w="100%" justifyContent="space-between">
                  <PasswordInput
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="パスワード"
                    mr={2}
                  />
                  <Button
                    colorPalette="red"
                    onClick={async () => {
                      const res = await deleteUser({ password: formValue });
                      toaster.create({
                        type: res.err ? "error" : "success",
                        description: res.msg,
                      });
                      if (!res.err) {
                        setTimeout(() => {
                          redirect("/");
                        }, 2000);
                      }
                    }}
                  >
                    削除
                  </Button>
                </Flex>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Flex>
  );
}
