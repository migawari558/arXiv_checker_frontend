"use server";

import { proxyServerCookies } from "@/app/helper/proxy-server-coolies";
import axios from "axios";
import env from "dotenv";
import { cookies } from "next/headers";
env.config();

export const signUpAction = async (payload: {
  username: string;
  password: string;
  categories: string[];
}) => {
  try {
    const { username, password, categories } = payload;
    // クライアントのクッキーを取得
    const cookie = await cookies();
    const cookieString = cookie.toString();

    if (!username || !password || categories.length === 0) {
      return { msg: "空のフィールドが存在します", err: true };
    }

    const res = await axios.post(
      `${process.env.SERVER_PORT}/api/auth/signup`,
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

    return { msg: "ログイン成功", err: false };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response);
      return {
        msg:
          err.response?.data?.msg ??
          err.response?.data[0]?.msg ??
          "予期せぬエラーが発生しました",
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
