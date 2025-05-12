import { Link, HStack, Text, Icon } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

export function SidebarContent({
  props,
  showLabel,
}: {
  props: { link: string; title: string; icon: IconType };
  showLabel: boolean;
}) {
  const { link, title, icon } = props;

  // リンクが一致するところの様子を変更
  const pathName = usePathname();
  const isActive = pathName.includes(link);
  return (
    <Link
      href={`/${link}`}
      color="black"
      _hover={{ opacity: 0.6 }}
      borderRadius="sm"
      bg={isActive ? "blackAlpha.300" : ""}
      p={2}
      width="full"
    >
      <HStack>
        <Icon as={icon} boxSize={6} />
        {showLabel && (
          <Text
            fontSize="15px"
            opacity={showLabel ? 1 : 0}
            transition="opacity 0.3s ease"
            transitionDelay={showLabel ? "0.2s" : "0s"}
            whiteSpace="nowrap"
          >
            {title}
          </Text>
        )}
      </HStack>
    </Link>
  );
}
