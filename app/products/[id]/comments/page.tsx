export default async function CommentsPage({params,}: {
  params: Promise<{id: string}>;
}) {
    const {id} = await params;

  return (
    <main>
      <h1>Комментарии</h1>
      <p>ID товара: {id}</p>
      <p>Раздел комментариев</p>
    </main>
  );
}