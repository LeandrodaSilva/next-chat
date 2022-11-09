const serverLangs = ["en-us", "pt-br"];

export default function hostLanguage(host) {
  let subdomain = host.split(".")[0];

  if (serverLangs.find((lang) => lang === subdomain)) {
    return subdomain;
  } else {
    return navigator.language.toLowerCase() || "en-us";
  }
}
