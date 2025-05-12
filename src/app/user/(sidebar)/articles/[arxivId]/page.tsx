import { Alert, Button, Heading, Link } from "@chakra-ui/react";
import { getNote } from "./action/getNote";
import { Note } from "./component/Note";
import { Toaster } from "@/components/ui/toaster";

export default async function SearchNote({ params }) {
  const res = await getNote(params.arxivId);
  if (res.err) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>{res.msg}</Alert.Content>
      </Alert.Root>
    );
  }

  return (
    <>
      <Toaster />
      <Link href="/user/articles" p={2}>
        <Button>自分のページに戻る</Button>
      </Link>
      {res.data.length === 0 && (
        <Heading>公開されているノートは存在しません</Heading>
      )}
      {res.data.map((d: { username: string; note: string }) => {
        return <Note data={d} key={d.username} />;
      })}
    </>
  );
}
