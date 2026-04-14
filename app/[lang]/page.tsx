"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    params.then((data) => i18n.changeLanguage(data.lang));
  }, [params]);

  return (
    <div style={styles.container}>
      <h1>Приветствуем!</h1>

      <button
        style={styles.button}
        onClick={() => router.push(`/${i18n.language}/register`)}
      >
        {t("register_button")}
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
    marginTop: "20px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
  },
};