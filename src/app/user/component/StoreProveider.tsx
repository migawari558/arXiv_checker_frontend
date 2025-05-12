"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { ReactNode } from "react";

type StoreProviderProps = {
  children: ReactNode;
};

export default function StoreProvider({
  children,
}: Readonly<StoreProviderProps>) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}
