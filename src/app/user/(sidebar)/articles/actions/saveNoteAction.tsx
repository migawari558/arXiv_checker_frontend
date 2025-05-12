"use server";

import { proxyServerCookies } from "@/app/helper/proxy-server-coolies";
import axios from "axios";
import env from "dotenv";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
env.config();

export const saveNoteAction = async (note: string, id: string) => {
  try {
    // クライアントのクッキーを取得
    const cookie = await cookies();
    const cookieString = cookie.toString();

    const payload = {
      note: note,
    };

    const res = await axios.put(
      `${process.env.SERVER_PORT}/api/session/article/${id}`,
      payload,
      {
        headers: {
          Cookie: cookieString, // クッキーをバックエンドに送りつける
        },
        withCredentials: true, // Cookie を送受信
      }
    );

    // cookieをクライアントに
    await proxyServerCookies(res.headers);

    return { msg: "noteを更新しました", err: false };
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

// isOpenの変更
export const changeIsOpen = async (isOpen: boolean, id: string) => {
  try {
    // クライアントのクッキーを取得
    const cookie = await cookies();
    const cookieString = cookie.toString();

    const payload = {
      isOpen,
    };

    const res = await axios.put(
      `${process.env.SERVER_PORT}/api/session/article/${id}`,
      payload,
      {
        headers: {
          Cookie: cookieString, // クッキーをバックエンドに送りつける
        },
        withCredentials: true, // Cookie を送受信
      }
    );

    // cookieをクライアントに
    await proxyServerCookies(res.headers);

    return {
      msg: `ノートが${isOpen ? "公開" : "非公開"}になりました`,
      err: false,
    };
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
