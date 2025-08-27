import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../locales/en.json";
import dk from "../locales/dk.json";

i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    debug: true,
    resources: {
      en: { translation: en },
      dk: { translation: dk },
    },
  })
  .then(() => {
    updateContent();
  });

function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.innerText = i18next.t(key);
  });
}

document.getElementById("btn-en").addEventListener("click", () => {
  i18next.changeLanguage("en", updateContent);
});

document.getElementById("btn-dk").addEventListener("click", () => {
  i18next.changeLanguage("dk", updateContent);
});