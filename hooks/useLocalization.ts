import ptBR from "../i18n/pt-br.json";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {langState} from "../recoil/atoms/langState";

const langs = {
  ptbr: ptBR,
};

export const serverLangs = {
  enus: "en-us",
  ptbr: "pt-br",
};

export function getUserLang() {
  const userLang = navigator.language;
  const savedLang = localStorage.getItem("lang");

  if (savedLang && savedLang.length && savedLang !== userLang) {
    return savedLang;
  }

  return userLang;
}

export function l(text: string): string {
  try {
    let subdomain = window.location.host.split(".")[0];

    switch (subdomain) {
      case serverLangs.enus:
        // @ts-ignore
        return ptBR[text] ?? text;
      default:
        // @ts-ignore
        let defaultLang = langs[getUserLang().replace("-", "").toLowerCase()];

        return defaultLang[text] ?? text;
    }
  } catch (e) {
    return text;
  }
}

function useLocalization(): Array<(text: string) => string> {
  const [lang] = useRecoilState(langState);

  useEffect(() => {
    let doc = document.querySelector("html");
    if (doc)
      doc.setAttribute("lang", lang);
  }, [lang]);

  // @ts-ignore
  return [l, lang];
}

export default useLocalization;
