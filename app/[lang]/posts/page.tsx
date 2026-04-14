"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function PostsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  const date = new Date().toLocaleString();

  useEffect(() => {
    params.then((data) => i18n.changeLanguage(data.lang));
  }, [params]);

  return (
    <div style={styles.container}>
      <h1>{t("posts")}</h1>

      <p>
        {t("current_date")}: {date}
      </p>

      <button
        style={styles.button}
        onClick={() => router.push(`/${i18n.language}/posts/create`)}
      >
        {t("create_post")}
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center" as const,
    marginTop: "50px",
  },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};