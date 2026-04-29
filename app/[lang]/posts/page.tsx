import Link from "next/link";
import { revalidatePath } from "next/cache";
import { getT } from "@/lib/getT";

async function revalidatePostsPage(formData: FormData) {
  "use server";
  const lang = formData.get("lang") as string;

  revalidatePath(`/${lang}/posts`, "page");
}

export default async function PostsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { t } = await getT("common", lang); 
  const date = new Date().toLocaleString(lang === "ru" ? "ru-RU" : "en-US");

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>{t("posts")}</h1>
      <p>
        {t("current_date")}: {date}
      </p>

      <Link href={`/${lang}/posts/create`} style={{ marginRight: 15 }}>
        {t("create_post")}
      </Link>

     <form action={revalidatePostsPage}>
  <input type="hidden" name="lang" value={lang} />
  <button type="submit">{t("refresh")}</button>
</form>
    </div>
  );
}