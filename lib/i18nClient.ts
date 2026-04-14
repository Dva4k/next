import i18n from "i18next";
import { initReactI18next } from "react-i18next";


const ru = {
  register: "Регистрация",
  name: "Имя",
  email: "Email",
  age: "Возраст",
  password: "Пароль",
  confirm_password: "Подтвердите пароль",
  register_button: "Зарегистрироваться",
  registration_success: "Регистрация прошла успешно!",
  posts: "Страница постов",
  current_date: "Текущая дата и время",
  create_post: "Создать пост",
  create: "Создать",
  title: "Заголовок",
  body: "Содержание",
  post_created: "Пост создан!",
};

const en = {
  register: "Register",
  name: "Name",
  email: "Email",
  age: "Age",
  password: "Password",
  confirm_password: "Confirm password",
  register_button: "Register",
  registration_success: "Registration successful!",
  posts: "Posts Page",
  current_date: "Current date and time",
  create_post: "Create post",
  create: "Create",
  title: "Title",
  body: "Content",
  post_created: "Post created!",
};

i18n.use(initReactI18next).init({
  resources: {
    ru: { common: ru },
    en: { common: en },
  },
  lng: "ru",
  fallbackLng: "ru",
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;