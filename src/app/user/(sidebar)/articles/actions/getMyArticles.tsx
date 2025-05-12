"use server";

import { proxyServerCookies } from "@/app/helper/proxy-server-coolies";
import axios from "axios";
import env from "dotenv";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
env.config();

export const getMyArticle = async () => {
  try {
    // クライアントのクッキーを取得
    const cookie = await cookies();
    const cookieString = cookie.toString();

    const res = await axios.get(
      `${process.env.SERVER_PORT}/api/session/article`,
      {
        headers: {
          Cookie: cookieString, // クッキーをバックエンドに送りつける
        },
        withCredentials: true, // Cookie を送受信
      }
    );

    // cookieをクライアントに
    await proxyServerCookies(res.headers);

    return { msg: "論文を追加しました", err: false, data: res.data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response);

      if (err.response?.status === 401) {
        redirect("/error/401");
      }

      return {
        msg: err.response?.data?.msg ?? "予期せぬエラーが発生しました",
        err: true,
        data: undefined,
      };
    }

    // AxiosError でない場合の fallback
    return {
      msg: "不明なエラーが発生しました",
      err: true,
      data: undefined,
    };
  }
};
