"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// タイムラインの論文情報を取得
export const getArticles = async () => {
  try {
    // クライアントのクッキーを取得
    const cookie = await cookies();
    const cookieString = cookie.toString();

    const res = await axios.get(
      `${process.env.SERVER_PORT}/api/session/arXiv`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieString, // クッキーをバックエンドに送りつける
        },
        withCredentials: true, // Cookie を送受信
      }
    );

    return { msg: "get成功", err: false, data: res.data };
  } catch (err) {
    if (err.response.status === 401) {
      redirect("/error/401");
    }
    return { msg: err.response.data.msg, err: true, data: undefined };
  }
};
