"use client";

import { Alert, Button, Card, Flex, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { redirect } from "next/navigation";
import { UsernameForm } from "./components/UserNameForm";
import { PasswordForm } from "./components/PasswordForm";
import { CategoryForm } from "./components/CategoryForm";
import { signUpAction } from "./actions/SignUpAction";

type UserForm = {
  username: string;
  password: string;
  categories: string[];
};

type ErrorState = {
  msg: string;
  err: boolean;
};

export default function SignUp() {
  const [userFormState, setUserFormState] = useState<UserForm>({
    username: "",
    password: "",
    categories: [],
  });

  const [errorState, setErrorState] = useState<ErrorState>({
    msg: "",
    err: false,
  });

  const { username, password, categories } = userFormState;

  function setUserName(newUsername: string) {
    setUserFormState((prev) => {
      return { ...prev, username: newUsername };
    });
  }

  function setPassword(newPassword: string) {
    setUserFormState((prev) => {
      return { ...prev, password: newPassword };
    });
  }

  function addCategory(cat: string) {
    setUserFormState((prev) => {
      const state = { ...prev };
      const newCategories = Array.from(new Set([...state.categories, cat]));
      return { ...state, categories: newCategories };
    });
  }

  function removeCategory(cat: string) {
    setUserFormState((prev) => {
      const state = { ...prev };
      const newCategories = [...state.categories].filter((c) => c !== cat);
      return { ...state, categories: newCategories };
    });
  }

  return (
    <Flex align="center" height="100vh" justify="center">
      <Card.Root w="md" boxShadow="lg">
        <Card.Header>
          <Card.Title>Sign Up</Card.Title>
          <Card.Description>arxiv Checker への Sign up</Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <UsernameForm username={username} setUsername={setUserName} />
            <PasswordForm password={password} setPassword={setPassword} />
            <CategoryForm
              categories={categories}
              addCategory={addCategory}
              removeCategory={removeCategory}
            />
            {errorState.err && (
              <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Description>{errorState.msg}</Alert.Description>
                </Alert.Content>
              </Alert.Root>
            )}
            <Flex justify="flex-end">
              <Button
                onClick={async () => {
                  const res = await signUpAction(userFormState);
                  setErrorState(res);
                  if (!res.err) {
                    redirect("/user/timeline");
                  }
                }}
              >
                登録
              </Button>
            </Flex>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}
