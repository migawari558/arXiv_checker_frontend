"use server";

import { proxyServerCookies } from "@/app/helper/proxy-server-coolies";
import axios from "axios";
import env from "dotenv";
import { cookies } from "next/headers";
env.config();

type State = {
  msg: string;
  err: boolean;
};

export const loginUser = async (
  state: State,
  formData: FormData
): Promise<State> => {
  const username: string = formData.get("username") as string;
  const password: string = formData.get("password") as string;
  if (!username || !password) {
    return { msg: "入力フィールドが空です", err: true };
  }

  const payload = {
    username,
    password,
  };

  try {
    console.time("Login Process"); // 処理時間計測開始

    // クライアントのクッキーを取得
    console.time("Cookie Retrieval");
    const cookie = await cookies();
    const cookieString = cookie.toString();
    console.timeEnd("Cookie Retrieval");

    console.time("API Request");
    const res = await axios.post(
      `${process.env.SERVER_PORT}/api/auth/login`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieString, // クッキーをバックエンドに送りつける
        },
        withCredentials: true, // Cookie を送受信
      }
    );
    console.timeEnd("API Request");

    console.time("Proxy Server Cookies");
    // cookieをクライアントに
    await proxyServerCookies(res.headers as unknown as Headers);
    console.timeEnd("Proxy Server Cookies");

    console.timeEnd("Login Process"); // 処理時間計測終了

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
