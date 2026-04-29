"use client";

import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useT } from "@/lib/useT";

type PostFormData = {
  title: string;
  body: string;
};

export default function CreatePostPage() {
  const router = useRouter();
  const params = useParams();
  const { t } = useT("common");

  const langParam = params?.lang;
  const lang =
    typeof langParam === "string"
      ? langParam
      : Array.isArray(langParam)
      ? langParam[0]
      : "ru";

  const { register, handleSubmit } = useForm<PostFormData>();

  const onSubmit = async (data: PostFormData) => {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    alert(t("post_created"));
    router.push(`/${lang}/posts`);
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20 }}>
      <h1>{t("create_post")}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title")}
          placeholder={t("title")}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <textarea
          {...register("body")}
          placeholder={t("body")}
          rows={5}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <button type="submit">{t("create")}</button>
      </form>
    </div>
  );
}