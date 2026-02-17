/* =========================
   Language System
========================= */

let currentLang = localStorage.getItem("lang") || "ar";

const htmlTag = document.documentElement;
const langBtn = document.getElementById("langLabel");

function applyLanguage(lang) {

    // تغيير اتجاه الصفحة
    if (lang === "ar") {
        htmlTag.setAttribute("dir", "rtl");
        htmlTag.setAttribute("lang", "ar");
        langBtn.textContent = "English";
    } else {
        htmlTag.setAttribute("dir", "ltr");
        htmlTag.setAttribute("lang", "en");
        langBtn.textContent = "العربية";
    }

    // تغيير النصوص
    document.querySelectorAll("[data-ar]").forEach(el => {
        el.innerHTML = el.getAttribute(`data-${lang}`);
    });

    // حفظ اللغة
    localStorage.setItem("lang", lang);
    currentLang = lang;
}

function toggleLang() {
    const newLang = currentLang === "ar" ? "en" : "ar";
    applyLanguage(newLang);
}


/* =========================
   Theme System
========================= */

function toggleTheme() {
    document.documentElement.classList.toggle("dark");

    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

// تحميل الثيم المحفوظ
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
}


/* =========================
   Pomodoro Timer
========================= */

let time = 25 * 60;
let timer = null;
let running = false;

const display = document.getElementById("timerDisplay");
const playIcon = document.getElementById("playIcon");

function updateDisplay() {
    const min = Math.floor(time / 60).toString().padStart(2, "0");
    const sec = (time % 60).toString().padStart(2, "0");
    display.textContent = `${min}:${sec}`;
}

function setTimer(minutes) {
    time = minutes * 60;
    updateDisplay();
}

function toggleTimer() {
    running = !running;

    if (running) {
        timer = setInterval(() => {
            if (time > 0) {
                time--;
                updateDisplay();
            } else {
                clearInterval(timer);
                running = false;
                alert(currentLang === "ar" ? "انتهى الوقت!" : "Time is up!");
            }
        }, 1000);
    } else {
        clearInterval(timer);
    }
}

function resetTimer() {
    clearInterval(timer);
    running = false;
    time = 25 * 60;
    updateDisplay();
}


/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(currentLang);
    updateDisplay();
    lucide.createIcons();
});
