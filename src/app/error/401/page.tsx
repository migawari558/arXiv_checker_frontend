import { Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";

export default function Error401() {
  return (
    <Flex justify="center" h="100vh" align="center">
      <Stack>
        <Heading>401 | セッションの有効期限が切れています</Heading>
        <Text>以下のリンクからログインし直してください。</Text>
        <Link href="/login">
          <Button>再ログイン</Button>
        </Link>
      </Stack>
    </Flex>
  );
}
