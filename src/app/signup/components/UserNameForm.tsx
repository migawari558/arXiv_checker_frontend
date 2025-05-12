import { Field, Input } from "@chakra-ui/react";

export function UsernameForm({
  username,
  setUsername,
}: {
  username: string;
  setUsername: { (username: string): void };
}) {
  return (
    <Field.Root>
      <Field.Label>Username</Field.Label>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="3～25文字、同一のusernameは使用不可"
      />
    </Field.Root>
  );
}
