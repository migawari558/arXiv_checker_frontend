"use client";

import { Box, Flex, VStack, StackSeparator } from "@chakra-ui/react";
import { SidebarContent } from "./SidebarContent";
import {
  LuFolderClosed,
  LuFileText,
  LuSearch,
  LuUserRound,
} from "react-icons/lu";
import { IconType } from "react-icons/lib";
import { useState } from "react";
import { Logout } from "./LogOut";

// サイドバーの中身
export type sidebarParamType = {
  link: string;
  title: string;
  icon: IconType;
};
const sidebarParams: sidebarParamType[] = [
  { link: "user/timeline", title: "新着論文", icon: LuFileText },
  { link: "user/articles", title: "保存済み論文", icon: LuFolderClosed },
  { link: "user/search", title: "論文検索", icon: LuSearch },
  { link: "user/data", title: "ユーザー情報", icon: LuUserRound },
];

export function Sidebar(props: { children: React.ReactNode }) {
  // マウスをホバーすると表示
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const { children } = props;
  return (
    <Flex height="100vh">
      <Box
        height="100vh"
        w={isHovered ? "170px" : "55px"}
        color="black"
        p={2}
        bg="white"
        boxShadow="dark-lg"
        borderRightWidth={2}
        zIndex="3"
        transition="width 0.1s"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        overflow="hidden"
        position="fixed"
        top="0"
        display="flex"
        flexDirection="column"
      >
        <VStack
          separator={<StackSeparator borderColor="blackAlpha.300" />}
          align="start"
        >
          {sidebarParams.map((sidebarParam) => {
            return (
              <SidebarContent
                props={{ ...sidebarParam }}
                showLabel={isHovered}
                key={sidebarParam.title}
              />
            );
          })}
        </VStack>
        <Logout isHovered={isHovered} />
      </Box>
      <Box
        flex="1"
        p={6}
        zIndex="1"
        bg="white"
        ml="55px" // ← Sidebar の幅と揃える
        transition="margin-left 0.3s"
      >
        {children}
      </Box>
    </Flex>
  );
}
