"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  user_name: yup.string().required("Имя обязательно"),
  email: yup.string().email("Неверный email").required("Email обязателен"),
  age: yup
    .number()
    .typeError("Возраст должен быть числом")
    .positive("Только положительное число")
    .integer("Только целое число")
    .required("Возраст обязателен"),
  password: yup.string().min(6, "Минимум 6 символов").required("Пароль обязателен"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Подтвердите пароль"),
});

type FormData = yup.InferType<typeof schema>;

export default function RegisterPage({
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

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert(t("registration_success"));
    router.push(`/${i18n.language}/posts`);
  };

  const lang = i18n.language;

  return (
    <div style={styles.container}>
      <div style={styles.langBox}>
        <button
          style={lang === "ru" ? styles.activeBtn : styles.langBtn}
          onClick={() => router.push("/ru/register")}
        >
          RU
        </button>

        <button
          style={lang === "en" ? styles.activeBtn : styles.langBtn}
          onClick={() => router.push("/en/register")}
        >
          EN
        </button>
      </div>

      <h1 style={styles.title}>{t("register")}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="user_name"
          placeholder={t("name")}
          register={register}
          error={errors.user_name?.message}
        />

        <Input
          name="email"
          placeholder={t("email")}
          register={register}
          error={errors.email?.message}
        />

        <Input
          name="age"
          placeholder={t("age")}
          register={register}
          error={errors.age?.message}
        />

        <Input
          name="password"
          type="password"
          placeholder={t("password")}
          register={register}
          error={errors.password?.message}
        />

        <Input
          name="confirm_password"
          type="password"
          placeholder={t("confirm_password")}
          register={register}
          error={errors.confirm_password?.message}
        />

        <button type="submit" style={styles.button}>
          {t("register_button")}
        </button>
      </form>
    </div>
  );
}

function Input({
  name,
  placeholder,
  register,
  error,
  type = "text",
}: any) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        style={{
          ...styles.input,
          border: error ? "1px solid red" : "1px solid #ccc",
        }}
      />
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "10px",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    boxSizing: "border-box" as const,
  },
  button: {
    width: "100%",
    padding: "10px",
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
  langBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  langBtn: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    background: "#f5f5f5",
    cursor: "pointer",
  },
  activeBtn: {
    flex: 1,
    padding: "8px",
    border: "1px solid #4f46e5",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
  },
};