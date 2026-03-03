import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

async function getPost(id: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  return res.json();
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  return {
    title: post.title+ '- Это статья',
    description: post.body,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
}