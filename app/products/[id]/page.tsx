export default async function ProductPage({params,}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main>
      <h1>Карточка товара</h1>
      <p>ID товара: {id}</p>
    </main>
  );
}