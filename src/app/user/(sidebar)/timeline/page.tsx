import { Heading, Stack } from "@chakra-ui/react";
import env from "dotenv";
import "katex/dist/katex.min.css";
import { Article } from "./components/Article";
import { Toaster } from "@/components/ui/toaster";
import { PaperData } from "@/lib/features/articleSlice";
import { getArticles } from "./actions/getArticles";
env.config();

export const revalidate = 18000; // 5時間ごとに再検証する

export default async function timelineComponent() {
  const res = await getArticles();
  if (!res.data || res.data.length === 0) {
    return (
      <Heading size="lg" justifyContent="center" display="flex">
        新着論文はありません
      </Heading>
    );
  }
  return (
    <>
      <Toaster />
      <Stack gap={6}>
        {res.data.map((article: PaperData) => (
          <Article article={article} key={article.id} />
        ))}
      </Stack>
    </>
  );
}
