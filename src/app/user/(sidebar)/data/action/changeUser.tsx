"use server";

import { proxyServerCookies } from "@/app/helper/proxy-server-coolies";
import axios from "axios";
import env from "dotenv";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
env.config();

type Payload = {
  username?: string;
  categories?: string[];
  password?: string;
  newpassword?: string;
};

export const changeUser = async (payload: Payload) => {
  try {
    // クライアントのクッキーを取得
    const cookie = await cookies();
    const cookieString = cookie.toString();

    const res = await axios.put(
      `${process.env.SERVER_PORT}/api/session/user/me`,
      payload,
      {
        headers: {
          Cookie: cookieString, // クッキーをバックエンドに送りつける
        },
        withCredentials: true, // Cookie を送受信
      }
    );

    // cookieをクライアントに
    await proxyServerCookies(res.headers as unknown as Headers);

    return { msg: "ユーザー情報が変更されました", err: false };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        redirect("/error/401");
      }

      return {
        msg: err.response?.data?.msg ?? "予期せぬエラーが発生しました",
        err: true,
      };
    }

    // AxiosError でない場合の fallback
    return {
      msg: "不明なエラーが発生しました",
      err: true,
    };
  }
};
