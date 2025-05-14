"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// タイムラインの論文情報を取得
export const getArticles = async () => {
  try {
    // クライアントのクッキーを取得
    const cookieStore = cookies();
    const cookieString = cookieStore.toString();

    const response = await fetch(
      `${process.env.SERVER_PORT}/api/session/arXiv`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // クッキーをバックエンドに送りつける
          Cookie: cookieString,
        },
        credentials: "include", // Cookie を送受信
        next: { revalidate: 60 * 60 * 5 }, // 5時間で更新
      }
    );

    // ステータスコード別の処理
    if (response.status === 401) {
      // 認証エラーならリダイレクト
      redirect("/error/401");
    }
    if (!response.ok) {
      // その他の HTTP エラー
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.msg || `HTTP Error ${response.status}`);
    }

    // 例: レスポンス全体を確認する
    const json = await response.json();

    return { msg: "get成功", err: false, data: json };
  } catch (err: unknown) {
    // TypeError は fetch のネットワークエラー等
    if (err instanceof TypeError) {
      return {
        msg: "ネットワークエラーが発生しました",
        err: true,
      };
    }
    // そのほかの例外
    return {
      msg: err instanceof Error ? err.message : "不明なエラーが発生しました",
      err: true,
    };
  }
};
