"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { LANGUAGES, FALLBACK_LANG, DEFAULT_NS } from "./i18n-config";

const i18nClient = i18next.createInstance();

i18nClient
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../locales/${language}/${namespace}.json`)
    )
  )
  .init({
    supportedLngs: LANGUAGES,
    fallbackLng: FALLBACK_LANG,
    lng: undefined,
    fallbackNS: DEFAULT_NS,
    defaultNS: DEFAULT_NS,
    contextSeparator: ".",
    returnObjects: true,
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
  });

export default i18nClient;