import { PasswordInput } from "@/components/ui/password-input";
import { Field } from "@chakra-ui/react";

export function PasswordForm({
  password,
  setPassword,
}: {
  password: string;
  setPassword: { (password: string): void };
}) {
  return (
    <Field.Root>
      <Field.Label>Password</Field.Label>
      <PasswordInput
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="10～40文字、英大文字・小文字・数字・記号を全て含める"
      />
    </Field.Root>
  );
}
