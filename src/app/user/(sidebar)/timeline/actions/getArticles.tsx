"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getArticles = async () => {
  let response: Response;
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    response = await fetch(`${process.env.SERVER_PORT}/api/session/arXiv`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString,
      },
      credentials: "include",
      next: { revalidate: 18000 },
    });
  } catch (err: unknown) {
    if (err instanceof TypeError) {
      return {
        msg: "ネットワークエラーが発生しました",
        err: true,
        data: [],
      };
    }
    // その他の予期せぬ例外
    return {
      msg: "不明なエラーが発生しました",
      err: true,
      data: [],
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
      data: [],
    };
  }

  const json = await response.json();
  return { msg: "get成功", err: false, data: json };
};
