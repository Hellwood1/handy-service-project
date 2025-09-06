import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../locales/en.json";
import dk from "../locales/dk.json";

import flagEN from "../img/hero/eng.png";
import flagDK from "../img/hero/dk.png";

const ALIAS = { en: "en", dk: "dk", da: "dk" };
const FLAGS = { en: flagEN, dk: flagDK };
const ALL_LANGS = ["en", "dk"];
const DEBUG = Boolean(import.meta?.env?.DEV);

i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: "dk",
    debug: DEBUG,
    saveMissing: false,
    parseMissingKeyHandler: () => "",
    resources: {
      en: { translation: en },
      dk: { translation: dk },
    },
  })
  .then(() => {
    updateContent();

    const initial = mapLng(i18next.language);
    updateSelectedLangUI(initial);
    updateLangOptionsVisible(initial);
    setHtmlLang(i18next.language);

    i18next.on("languageChanged", (lng) => {
      const mapped = mapLng(lng);
      updateContent();
      updateSelectedLangUI(mapped);
      updateLangOptionsVisible(mapped);
      setHtmlLang(lng);
    });
  });


function mapLng(lng) {
  const base = (lng || "").split("-")[0];
  return ALIAS[lng] || ALIAS[base] || "dk";
}

function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = i18next.t(key, { defaultValue: "" });
  });
}

function updateLangOptionsVisible(current) {
  ALL_LANGS.forEach((l) => {
    const btn = document.getElementById(`btn-${l}`);
    if (!btn) return;
    const li = btn.closest("li") || btn;
    const hide = l === current;

    li.hidden = hide;
    btn.setAttribute("aria-hidden", hide ? "true" : "false");
    btn.tabIndex = hide ? -1 : 0;
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
  ALL_LANGS.forEach((l) => {
    const b = document.getElementById(`btn-${l}`);
    if (b) {
      const isCurrent = l === lang;
      b.setAttribute("aria-pressed", String(isCurrent));
      b.setAttribute("aria-checked", String(isCurrent));
    }
  });
}

function setHtmlLang(lng) {
  const code = mapLng(lng);
  document.documentElement.lang = code === "dk" ? "da-DK" : "en";
}

const menu = document.querySelector(".lang-menu");
const summary = document.querySelector(".selected-lang");

document.getElementById("btn-en")?.addEventListener("click", () => {
  changeLang("en");
});
document.getElementById("btn-dk")?.addEventListener("click", () => {
  changeLang("dk");
});

function changeLang(code) {
  i18next.changeLanguage(code);
  menu?.removeAttribute("open");
  summary?.focus();
}