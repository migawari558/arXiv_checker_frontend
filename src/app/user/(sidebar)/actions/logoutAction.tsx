"use server";

import { proxyServerCookies } from "@/app/helper/proxy-server-coolies";
import axios from "axios";
import env from "dotenv";
import { cookies } from "next/headers";
env.config();

export const logoutAction = async () => {
  try {
    // クライアントのクッキーを取得
    const cookie = await cookies();
    const cookieString = cookie.toString();

    const res = await axios.delete(
      `${process.env.SERVER_PORT}/api/session/logout`,
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

    return { msg: "ログイン成功", err: false };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response);
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
