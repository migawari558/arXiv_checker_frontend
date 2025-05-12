"use server";

import { proxyServerCookies } from "@/app/helper/proxy-server-coolies";
import axios from "axios";
import env from "dotenv";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
env.config();

export const addAction = async (arXivId: string) => {
  const payload = { arXivId };
  try {
    // クライアントのクッキーを取得
    const cookie = await cookies();
    const cookieString = cookie.toString();

    const res = await axios.post(
      `${process.env.SERVER_PORT}/api/session/article`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieString, // クッキーをバックエンドに送りつける
        },
        withCredentials: true, // Cookie を送受信
      }
    );

    // cookieをクライアントに
    await proxyServerCookies(res.headers);

    return { msg: "論文を追加しました", err: false };
  } catch (err) {
    if (err.response.status === 401) {
      redirect("/error/401");
    }
    return { msg: err.response.data.msg, err: true };
  }
};
