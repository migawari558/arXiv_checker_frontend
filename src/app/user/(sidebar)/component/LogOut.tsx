"use client";

import { Link, Text, Icon } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import { logoutAction } from "../actions/logoutAction";
import { toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";

export const Logout = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <Link
      m={2}
      mt="auto"
      _hover={{ opacity: 0.6 }}
      onClick={async (e) => {
        const confirm = window.confirm("ログアウトしますか？");
        if (!confirm) {
          e.preventDefault();
          return;
        }
        const res = await logoutAction();
        if (res.err) {
          toaster.create({ title: res.msg, type: "error" });
        }
        redirect("/");
      }}
    >
      <Icon as={LuLogOut} boxSize={6} />
      {isHovered && (
        <Text
          fontSize="15px"
          opacity={isHovered ? 1 : 0}
          transition="opacity 0.3s ease"
          transitionDelay={isHovered ? "0.2s" : "0s"}
          whiteSpace="nowrap"
        >
          ログアウト
        </Text>
      )}
    </Link>
  );
};
