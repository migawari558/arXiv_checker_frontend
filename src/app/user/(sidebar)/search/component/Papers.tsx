import { Article } from "../../timeline/components/Article";
import { useAppSelector } from "@/lib/hooks";
import { Center, Spinner, Heading, Stack } from "@chakra-ui/react";

export function Papers() {
  const { papers, loading } = useAppSelector((state) => state.papers);

  return (
    <>
      {/* ロード画面 */}
      {loading && (
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      )}

      {/* 検索結果がないとき */}
      {papers.length === 0 && !loading && (
        <Heading size="lg" justifyContent="center" display="flex">
          検索条件に合致する論文はありません
        </Heading>
      )}

      {/* 論文を並べる */}
      <Stack gap={6}>
        {papers.map((paper) => {
          return <Article article={paper} key={paper.id} />;
        })}
      </Stack>
    </>
  );
}
