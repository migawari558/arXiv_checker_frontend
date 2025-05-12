"use client";

import {
  Button,
  Card,
  Field,
  Flex,
  Input,
  Stack,
  Link,
  Alert,
} from "@chakra-ui/react";
import { useActionState, useState, useEffect } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { loginUser } from "./action/loginAction";
import { useRouter } from "next/navigation";

type State = {
  msg: string;
  err: boolean;
};

export default function LoginForm() {
  // フォームの状態
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [state, loginAction] = useActionState<State, FormData>(loginUser, {
    msg: "",
    err: false,
  });

  const router = useRouter();
  // ログインに成功したらリダイレクト
  useEffect(() => {
    if (!state.err && state.msg === "ログイン成功") {
      router.push("/user/timeline");
    }
  }, [state, router]);

  return (
    <Flex align="center" height="100vh" justify="center">
      <form action={loginAction}>
        <Card.Root w="md" boxShadow="lg">
          <Card.Header>
            <Card.Title>Sign in</Card.Title>
            <Card.Description>arXiv Checker への Sign in</Card.Description>
          </Card.Header>
          <Card.Body>
            <Stack gap="4" w="full">
              <Field.Root>
                <Field.Label>Username</Field.Label>
                <Input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Password</Field.Label>
                <PasswordInput
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field.Root>
              {/* エラー時の対応 */}
              {state.err && (
                <Alert.Root status="error">
                  <Alert.Indicator />
                  <Alert.Title>{state.msg}</Alert.Title>
                </Alert.Root>
              )}
            </Stack>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Link href="/">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button variant="solid" type="submit">
              Sign in
            </Button>
          </Card.Footer>
        </Card.Root>
      </form>
    </Flex>
  );
}
