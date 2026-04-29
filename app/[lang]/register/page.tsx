"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useParams } from "next/navigation";
import { useT } from "@/lib/useT";

const schema = yup.object({
  user_name: yup.string().required("Имя обязательно"),
  email: yup.string().email("Неверный email").required("Email обязателен"),
  age: yup
    .number()
    .typeError("Возраст должен быть числом")
    .positive()
    .integer()
    .required(),
  password: yup.string().min(6, "Минимум 6 символов").required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required(),
});

type FormData = yup.InferType<typeof schema>;

export default function RegisterPage() {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const watchedName = watch("user_name");

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert(t("registration_success"));
    router.push(`/${currentLang}/posts`);
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 20 }}>
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => router.push("/ru/register")}
          style={{
            padding: "6px 16px",
            background: currentLang === "ru" ? "#4f46e5" : "#ddd",
            color: currentLang === "ru" ? "white" : "black",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Русский
        </button>

        <button
          onClick={() => router.push("/en/register")}
          style={{
            padding: "6px 16px",
            background: currentLang === "en" ? "#4f46e5" : "#ddd",
            color: currentLang === "en" ? "white" : "black",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          English
        </button>
      </div>

      <h1 style={{ textAlign: "center" }}>{t("register")}</h1>

      {watchedName && (
        <div
          style={{
            padding: 10,
            background: "#e0f2fe",
            borderRadius: 8,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          {t("greeting", { name: watchedName })}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("user_name")}
            placeholder={t("name")}
            style={{ width: "100%", padding: 8 }}
          />
          <p style={{ color: "red", fontSize: 12 }}>
            {errors.user_name?.message}
          </p>
        </div>

        <div>
          <input
            {...register("email")}
            placeholder={t("email")}
            style={{ width: "100%", padding: 8 }}
          />
          <p style={{ color: "red", fontSize: 12 }}>
            {errors.email?.message}
          </p>
        </div>

        <div>
          <input
            {...register("age")}
            placeholder={t("age")}
            style={{ width: "100%", padding: 8 }}
          />
          <p style={{ color: "red", fontSize: 12 }}>
            {errors.age?.message}
          </p>
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder={t("password")}
            style={{ width: "100%", padding: 8 }}
          />
          <p style={{ color: "red", fontSize: 12 }}>
            {errors.password?.message}
          </p>
        </div>

        <div>
          <input
            type="password"
            {...register("confirm_password")}
            placeholder={t("confirm_password")}
            style={{ width: "100%", padding: 8 }}
          />
          <p style={{ color: "red", fontSize: 12 }}>
            {errors.confirm_password?.message}
          </p>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            marginTop: 10,
          }}
        >
          {t("register_button")}
        </button>
      </form>
    </div>
  );
}