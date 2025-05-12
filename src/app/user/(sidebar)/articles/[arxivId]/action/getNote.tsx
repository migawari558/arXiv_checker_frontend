"use server";

import { proxyServerCookies } from "@/app/helper/proxy-server-coolies";
import axios from "axios";
import env from "dotenv";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
env.config();

export async function getNote(id: string) {
  try {
    // クライアントのクッキーを取得
    const cookie = await cookies();
    const cookieString = cookie.toString();

    const res = await axios.get(
      `${process.env.SERVER_PORT}/api/session/article/arXiv/${id}`,
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

    return { msg: "ノートを取得しました", err: false, data: res.data };
  } catch (err) {
    if (err.response.status === 401) {
      redirect("/error/401");
    }
    return { msg: err.response.data.msg, err: true, data: undefined };
  }
}
