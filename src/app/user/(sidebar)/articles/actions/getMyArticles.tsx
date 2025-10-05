"use server";

import { proxyServerCookies } from "@/app/helper/proxy-server-coolies";
import env from "dotenv";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
env.config();

export const getMyArticle = async () => {
  let response: Response; // response変数をtryの外で宣言

  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    response = await fetch(`${process.env.SERVER_PORT}/api/session/article`, {
      method: "GET",
      headers: { Cookie: cookieString },
      credentials: "include",
      next: { revalidate: 1 },
    });
  } catch (err: unknown) {
    if (err instanceof TypeError) {
      return {
        msg: "ネットワークエラーが発生しました",
        err: true,
        data: undefined,
      };
    }
    return {
      msg: "不明なサーバーエラーが発生しました",
      err: true,
      data: undefined,
    };
  }

  if (response.status === 401) {
    redirect("/error/401");
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    return {
      msg: errorBody.msg || `HTTP Error ${response.status}`,
      err: true,
      data: undefined,
    };
  }

  await proxyServerCookies(response.headers);
  const resJson = await response.json();

  return {
    msg: "論文を取得しました",
    err: false,
    data: resJson,
  };
};
