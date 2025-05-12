import "server-only";
import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";

// server action で取得したクッキーをブラウザに送りつける
export async function proxyServerCookies(headers: Headers) {
  const setCookie = headers.get("set-cookie");

  if (setCookie !== null) {
    const splitCookieHeaders = setCookieParser.splitCookiesString(setCookie);
    const cookieObjects = setCookieParser.parse(splitCookieHeaders);

    for (const cookieObject of cookieObjects) {
      const { name, value, sameSite, ...rest } = cookieObject;

      const cookie = await cookies();
      await cookie.set(name, value, {
        sameSite: sameSite === "strict" ? "strict" : "lax",
        ...rest,
      });
    }
  }
}
