import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { LANGUAGES, FALLBACK_LANG, DEFAULT_NS } from "./i18n-config";

const i18nInstance = i18next.createInstance();

i18nInstance
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../locales/${language}/${namespace}.json`)
    )
  )
  .init({
    supportedLngs: LANGUAGES,
    fallbackLng: FALLBACK_LANG,
    lng: FALLBACK_LANG,
    fallbackNS: DEFAULT_NS,
    defaultNS: DEFAULT_NS,
    contextSeparator: ".",
    returnObjects: true,
    preload: [...LANGUAGES],
  });

export default i18nInstance;