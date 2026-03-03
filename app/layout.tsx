export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <header>Шапка сайта</header>
        <main>{children}</main>
        <footer>Подвал сайта</footer>
      </body>
    </html>
  );
}