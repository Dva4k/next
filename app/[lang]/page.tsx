"use client";

import { useRouter, useParams } from "next/navigation";
import { useT } from "@/lib/useT";

export default function HomePage() {
  const router = useRouter();
  const params = useParams();

  const langParam = params?.lang;

  const currentLang =
    typeof langParam === "string"
      ? langParam
      : Array.isArray(langParam)
      ? langParam[0]
      : "ru";

  const { t } = useT("common");

  const switchLanguage = (lang: string) => {
    router.push(`/${lang}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.langBox}>
        <button
          onClick={() => switchLanguage("ru")}
          style={currentLang === "ru" ? styles.activeBtn : styles.btn}
        >
          Русский
        </button>

        <button
          onClick={() => switchLanguage("en")}
          style={currentLang === "en" ? styles.activeBtn : styles.btn}
        >
          English
        </button>
      </div>

      <button
        onClick={() => router.push(`/${currentLang}/register`)}
        style={styles.button}
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
    padding: "10px 20px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
  },
  langBox: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "30px",
  },
  btn: {
    padding: "8px 16px",
    backgroundColor: "#f0f0f0",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  activeBtn: {
    padding: "8px 16px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};