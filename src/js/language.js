
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../locales/en.json";
import dk from "../locales/dk.json";

import flagEN from "./img/hero/eng.png";
import flagDK from "./img/hero/dk.png";

const ALIAS = { en: "en", "en-US": "en", dk: "dk", da: "dk", "da-DK": "dk" };
const FLAGS = { en: flagEN, dk: flagDK };

i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: "dk",
    debug: true,
    resources: {
      en: { translation: en },
      dk: { translation: dk },
    },
  })
  .then(() => {
    updateContent();
    updateSelectedLangUI(mapLng(i18next.language));

    i18next.on("languageChanged", (lng) => {
      updateContent();
      updateSelectedLangUI(mapLng(lng));
    });
  });

function mapLng(lng) {
  const base = (lng || "").split("-")[0];
  return ALIAS[lng] || ALIAS[base] || "dk";
}

function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.innerText = i18next.t(key);
  });
}

function updateSelectedLangUI(lang) {
  const selected = document.querySelector(".selected-lang");
  if (!selected) return;


  const arrow = selected.querySelector("svg") || null;
  if (arrow) arrow.remove();

  while (selected.firstChild) selected.removeChild(selected.firstChild);

  const flagSrc = FLAGS[lang];
  if (flagSrc) {
    const img = document.createElement("img");
    img.src = flagSrc;
    img.alt = "";
    img.width = 28;
    img.height = 28;
    selected.appendChild(img);
    selected.appendChild(document.createTextNode(" "));
  }

  selected.appendChild(document.createTextNode(lang.toUpperCase() + " "));

  if (arrow) selected.appendChild(arrow);

  ["en", "dk"].forEach((l) => {
    const b = document.getElementById(`btn-${l}`);
    if (b) b.setAttribute("aria-pressed", String(l === lang));
  });
}

document.getElementById("btn-en")?.addEventListener("click", () => {
  i18next.changeLanguage("en");
});
document.getElementById("btn-dk")?.addEventListener("click", () => {
  i18next.changeLanguage("dk");
});
