"use server";

import { proxyServerCookies } from "@/app/helper/proxy-server-coolies";
import env from "dotenv";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
env.config();

export const getMyArticle = async () => {
  try {
    // クライアントのクッキーを取得
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    // fetch で GET リクエスト
    const response = await fetch(
      `${process.env.SERVER_PORT}/api/session/article`,
      {
        method: "GET",
        headers: {
          // バックエンドへクッキーを送信
          Cookie: cookieString,
        },
        // クライアントとサーバ間で Cookie をやりとり
        credentials: "include",
        next: { revalidate: 30 }, // 30秒に１回取得できるように
      }
    );

    // ステータス別の処理
    if (response.status === 401) {
      // 認証エラーならリダイレクト
      redirect("/error/401");
    }
    if (!response.ok) {
      // その他の HTTP エラーをキャッチ
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.msg || `HTTP Error ${response.status}`);
    }

    // レスポンスヘッダーを proxy へ渡す
    await proxyServerCookies(response.headers);

    // JSON ボディを取得
    const resJson = await response.json();

    return {
      msg: "論文を取得しました",
      err: false,
      data: resJson, // data フィールドの有無に応じて
    };
  } catch (err: unknown) {
    // ネットワークエラーなど
    if (err instanceof TypeError) {
      return {
        msg: "ネットワークエラーが発生しました",
        err: true,
        data: undefined,
      };
    }
    // それ以外の例外
    return {
      msg: err instanceof Error ? err.message : "不明なエラーが発生しました",
      err: true,
      data: undefined,
    };
  }
};
