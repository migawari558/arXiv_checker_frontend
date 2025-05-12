"use server";

import { proxyServerCookies } from "@/app/helper/proxy-server-coolies";
import axios from "axios";
import env from "dotenv";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormState } from "../component/Form";
env.config();

export const searchArxiv = async (formState: FormState) => {
  try {
    // クライアントのクッキーを取得
    const cookie = await cookies();
    const cookieString = cookie.toString();

    const payload = {
      freeWord: formState.freeWord.replace(/[\s\u3000]+/g, " AND "),
      author: formState.author.replace(/[\s\u3000]+/g, " AND "),
      abstruct: formState.abstruct.replace(/[\s\u3000]+/g, " AND "),
      title: formState.title.replace(/[\s\u3000]+/g, " AND "),
      categories: formState.categories,
    };

    const res = await axios.post(
      `${process.env.SERVER_PORT}/api/session/arXiv/search`,
      payload,
      {
        params: formState,
        headers: {
          Cookie: cookieString, // クッキーをバックエンドに送りつける
        },
        withCredentials: true, // Cookie を送受信
      }
    );

    // cookieをクライアントに
    await proxyServerCookies(res.headers as unknown as Headers);

    return { msg: "情報を取得", err: false, data: res.data };
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
  }
};
