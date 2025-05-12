import { Heading, Stack } from "@chakra-ui/react";
import axios from "axios";
import env from "dotenv";
import { cookies } from "next/headers";
import "katex/dist/katex.min.css";
import { Article } from "./components/Article";
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import { PaperData } from "@/lib/features/articleSlice";
env.config();

// タイムラインの論文情報を取得
export const getArticles = async () => {
  try {
    // クライアントのクッキーを取得
    const cookie = await cookies();
    const cookieString = cookie.toString();

    const res = await axios.get(
      `${process.env.SERVER_PORT}/api/session/arXiv`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieString, // クッキーをバックエンドに送りつける
        },
        withCredentials: true, // Cookie を送受信
      }
    );

    return { msg: "get成功", err: false, data: res.data };
  } catch (err) {
    if (err.response.status === 401) {
      redirect("/error/401");
    }
    return { msg: err.response.data.msg, err: true, data: undefined };
  }
};

export default async function timelineComponent() {
  const res = await getArticles();
  console.log(res.data, res.msg);
  if (res.data.length === 0)
    return (
      <Heading size="lg" justifyContent="center" display="flex">
        新着論文はありません
      </Heading>
    );
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
