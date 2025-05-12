"use server";

import { proxyServerCookies } from "@/app/helper/proxy-server-coolies";
import axios from "axios";
import env from "dotenv";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
env.config();

export const addTag = async (tag: string, id: string) => {
  try {
    // クライアントのクッキーを取得
    const cookie = await cookies();
    const cookieString = cookie.toString();

    if (tag === "") return { msg: "入力欄が空です", err: true };

    const payload = {
      tag: tag,
    };

    const res = await axios.put(
      `${process.env.SERVER_PORT}/api/session/article/${id}/tag/add`,
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

    return { msg: "タグを追加しました", err: false, data: res.data };
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

export const deleteTag = async (tag: string, id: string) => {
  try {
    // クライアントのクッキーを取得
    const cookie = await cookies();
    const cookieString = cookie.toString();
    const payload = {
      tag: tag,
    };

    const res = await axios.put(
      `${process.env.SERVER_PORT}/api/session/article/${id}/tag/delete`,
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

    return { msg: "タグを削除しました", err: false, data: res.data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
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
