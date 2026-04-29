"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation, type UseTranslationOptions } from "react-i18next";
import type { FlatNamespace, KeyPrefix } from "i18next";
import type { FallbackNs } from "react-i18next";
import i18nClient from "./i18n-client";

export function useT(
  ns?: string,
  options: UseTranslationOptions<
    KeyPrefix<FallbackNs<FlatNamespace>>
  > = {}
) {
  const params = useParams();
  const lang = params?.lang;

  if (typeof lang !== "string") {
    throw new Error("useT is only available inside [lang] route");
  }

  const [activeLng, setActiveLng] = useState(i18nClient.resolvedLanguage);

  useEffect(() => {
    if (activeLng === i18nClient.resolvedLanguage) return;
    setActiveLng(i18nClient.resolvedLanguage);
  }, [activeLng]);

  useEffect(() => {
    if (!lang || i18nClient.resolvedLanguage === lang) return;
    i18nClient.changeLanguage(lang);
  }, [lang]);

  return useTranslation(ns, { ...options, i18n: i18nClient });
}