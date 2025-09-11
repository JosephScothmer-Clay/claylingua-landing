function t(key, vars = {}) {
    if (!window.translations) return key;

    let keys = key.split(".");
    let value = window.translations;
    keys.forEach(k => {
        if (value) value = value[k];
    });

    if (!value) return key;

    return value.replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? "");
}

async function loadTranslations(lang) {
    try {
        const response = await fetch(`assets/locales/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Could not load translations for ${lang}`);
        }
        const dict = await response.json();
        window.translations = dict;

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const keys = el.dataset.i18n.split(".");
            let value = dict;
            keys.forEach(k => {
                if (value) value = value[k];
            });

            if (value) {
                if (/<[a-z][\s\S]*>/i.test(value)) {
                    el.innerHTML = value; // allow HTML tags
                } else {
                    el.textContent = value;
                }
            }
        });

        updateKpis();

        if (window.location.hash) {
                    const el = document.querySelector(window.location.hash);
                    if (el) {
                        setTimeout(() => {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 100);
                    }
                }
    } catch (err) {
        console.error("Translation load error:", err);
    }
}

function updateKpis() {
    const targetStudents = 50;
    const targetTutors = 25;
    const currentStudents = 2;
    const currentTutors = 4;

    const totalTarget = targetStudents + targetTutors;
    const totalJoined = currentStudents + currentTutors;
    const totalRemaining = totalTarget - totalJoined;
    const percentage = Math.round((totalJoined / totalTarget) * 100);

    const joinedEl = document.getElementById("joined");
    if (joinedEl) {
        joinedEl.textContent = t("kpi.joined_text", {
            joined: totalJoined,
            remaining: totalRemaining
        });
    }

    const bar = document.getElementById("progress-bar");
    if (bar) {
        bar.style.width = percentage + "%";
    }

    const label = document.getElementById("progress-label");
    if (label) {
        label.textContent = percentage + "%";
    }

    const progressText = document.getElementById("progress-text");
    if (progressText) {
        progressText.textContent = t("kpi.progress_text", { percent: percentage });
    }
}

const langSelect = document.getElementById("lang-switch");
if (langSelect) {
    const savedLang = localStorage.getItem("lang") || "en";
    langSelect.value = savedLang;
    loadTranslations(savedLang);

    langSelect.addEventListener("change", e => {
        const lang = e.target.value;
        localStorage.setItem("lang", lang);
        loadTranslations(lang);
    });
}
