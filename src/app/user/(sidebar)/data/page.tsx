import { Alert, Card, Heading, Separator, Stack } from "@chakra-ui/react";
import { getUser } from "./action/getUser";
import { ObjectId } from "mongoose";
import { Username } from "./component/Username";
import { Toaster } from "@/components/ui/toaster";
import { Password } from "./component/Password";
import { Categories } from "./component/Categories";
import { DeleteForm } from "./component/Delete";

type UserData = {
  _id: ObjectId;
  username: string;
  articles: string[];
  categories: string[];
  LastLogin: Date;
  ThisLogin: Date;
  updatedAt: Date;
  createdAt: Date;
};

type Response = {
  data: UserData;
  err: boolean;
  msg: string;
};

export default async function Page() {
  const res: Response = (await getUser()) as Response;
  const { username, categories } = res.data || { username: "", categories: [] };

  if (res.err) {
    return (
      <Card.Root size="md" boxShadow="md">
        <Card.Header>
          <Heading size="lg">ユーザー情報</Heading>
        </Card.Header>
        <Card.Body>
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>{res.msg}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        </Card.Body>
      </Card.Root>
    );
  }

  return (
    <>
      <Toaster />
      <Card.Root size="md" boxShadow="md">
        <Card.Header>
          <Heading size="lg">ユーザー情報</Heading>
        </Card.Header>
        <Card.Body>
          <Stack separator={<Separator />}>
            <Username initUsername={username} />
            <Password />
            <Categories initcategories={categories} />
          </Stack>
        </Card.Body>
        <Card.Footer>
          <DeleteForm />
        </Card.Footer>
      </Card.Root>
    </>
  );
}
