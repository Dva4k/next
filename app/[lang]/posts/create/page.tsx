"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Заголовок обязателен"),
  body: yup.string().required("Содержание обязательно"),
});

type FormData = yup.InferType<typeof schema>;

export default function CreatePostPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    params.then((data) => i18n.changeLanguage(data.lang));
  }, [params]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert(t("post_created"));
      router.push(`/${i18n.language}/posts`);
    } else {
      alert("Error");
    }
  };

  return (
    <div style={styles.container}>
      <h1>{t("create_post")}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={styles.box}>
          <input
            {...register("title")}
            placeholder={t("title")}
            style={styles.input}
          />
          {errors.title && <p style={styles.error}>{errors.title.message}</p>}
        </div>

        <div style={styles.box}>
          <textarea
            {...register("body")}
            placeholder={t("body")}
            rows={5}
            style={styles.textarea}
          />
          {errors.body && <p style={styles.error}>{errors.body.message}</p>}
        </div>

        <button type="submit" style={styles.button}>
          {t("create")}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "30px auto",
    padding: "20px",
  },
  box: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box" as const,
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box" as const,
  },
  button: {
    padding: "10px 20px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
};