import {
  Image,
  Box,
  Text,
  Heading,
  Highlight,
  Center,
  HStack,
  Link,
  Button,
} from "@chakra-ui/react";
import { cookies } from "next/headers";

export async function Description() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session");
  const signInHref = sessionToken ? "/user/timeline" : "/login";
  return (
    <Box position="relative">
      <Image src="/icon_pass.png" alt="icon" justifySelf="end" />
      <Box position="absolute" alignSelf="end">
        <Heading
          fontSize="3xl"
          fontWeight="bold"
          p={2}
          borderRadius="md"
          lineHeight="normal"
        >
          <Text as="span" fontSize="4xl" mr={2}>
            arXiv Checker
          </Text>
          は<br />
          <Highlight
            query={["最新の研究"]}
            styles={{ px: "0.8", bg: "red.muted", p: 1, borderRadius: "md" }}
          >
            最新の研究 を追い続ける
          </Highlight>
          <br />
          研究者のためのツールです
        </Heading>
        <Text width="60%" pl={2} fontSize="sm">
          あなたの研究分野における最新の arXiv
          の自動取得機能や、ノート機能、ノートの共有機能などにより、快適な研究生活をサポートします
        </Text>
      </Box>
      <Center p={50} mt={10}>
        <HStack gap={5}>
          <Link href={signInHref}>
            <Button>Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </HStack>
      </Center>
      <Box p={2} mt={10} width="100%">
        <Heading size="2xl" mb={3}>
          新着論文をまとめて確認
        </Heading>
        <Box>
          <Text>
            自身の研究分野での新着論文が自動で取得され、タイムライン形式で表示されます。気になった論文は保存して、自身のコレクションに追加しましょう。
          </Text>
        </Box>
        <Center>
          <Image src="/timeline.png" alt="timeline" h="600px" p={3} />
        </Center>
      </Box>
      <Box p={2} mt={10} width="100%">
        <Heading size="2xl" mb={3}>
          保存した論文は一覧で管理
        </Heading>
        <Box>
          <Text>
            保存した論文は自身のコレクションに追加され、タグによって整理することができます。
          </Text>
        </Box>
        <Center>
          <Image src="/articles.png" alt="articles" h="600px" p={3} />
        </Center>
      </Box>
      <Box p={2} mt={10} width="100%">
        <Heading size="2xl" mb={3}>
          論文で気になった内容はすぐにメモ
        </Heading>
        <Box>
          <Text>
            保存した論文にはそれぞれ、内容をまとめたノートをつけることができます。また、ノートを公開すれば、同じ論文を読んでいる人があなたのノートを参照しながら論文を読むことができます。
          </Text>
        </Box>
        <Center>
          <Image src="/note.png" alt="articles" h="600px" p={3} />
        </Center>
      </Box>
      <Box p={2} mt={10} width="100%">
        <Heading size="2xl" mb={3}>
          充実した検索機能
        </Heading>
        <Box>
          <Text>
            もちろん、過去の論文を検索してコレクションに追加することも可能です。カテゴリ、著者、タイトルなど、詳細な条件での検索に対応しています。
          </Text>
        </Box>
        <Center>
          <Image src="/search.png" alt="articles" h="400px" p={3} />
        </Center>
      </Box>
      <Center p={50} mt={10}>
        <HStack gap={5}>
          <Link href={signInHref}>
            <Button>Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </HStack>
      </Center>
    </Box>
  );
}
