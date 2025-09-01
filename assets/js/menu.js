document.addEventListener("DOMContentLoaded", () => {
  // --- Hamburger menu ---
  const hamburger = document.getElementById("hamburger-btn");
  const navGroup = document.getElementById("nav-group");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navGroup.classList.toggle("open");
  });

  navGroup.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navGroup.classList.remove("open");
    });
  });

  // --- Language + flag + translations ---
  const langSelect = document.getElementById("lang-switch");
  const wrapper = langSelect.closest(".lang-select");

  // detect browser language
  const userLang =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    "en";
  const shortLang = userLang.split("-")[0]; // "th-TH" → "th"

  // pick language: saved > browser > fallback
  const initialLang = localStorage.getItem("lang") || shortLang || "en";

  langSelect.value = initialLang;
  wrapper.setAttribute("data-flag", initialLang);
  loadTranslations(initialLang);

  langSelect.addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem("lang", lang);
    wrapper.setAttribute("data-flag", lang);
    loadTranslations(lang);
  });
});
