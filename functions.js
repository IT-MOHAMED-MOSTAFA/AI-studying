// [1] نظام تبديل الثيم (Dark/Light Mode)
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
}

// [2] نظام تبديل اللغة (Ar/En)
const translations = {
    en: {
        title: 'Elevate Your Studies with <br><span class="text-gradient">AI Power</span>',
        desc: 'Harness AI tools to double your productivity and transform your learning.',
        langLabel: 'العربية'
    },
    ar: {
        title: 'ارتقِ بدراستك إلى <br> <span class="text-gradient">عصر الذكاء الاصطناعي</span>',
        desc: 'تعلم كيف تُسخّر أدوات الـ AI لمضاعفة إنتاجيتك وتطوير أسلوب تعلمك بذكاء.',
        langLabel: 'English'
    }
};

function toggleLang() {
    const html = document.documentElement;
    const currentLang = html.getAttribute('lang') || 'ar';
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    
    html.setAttribute('lang', nextLang);
    html.setAttribute('dir', nextLang === 'ar' ? 'rtl' : 'ltr');
    
    document.getElementById('heroTitle').innerHTML = translations[nextLang].title;
    document.getElementById('heroDesc').innerText = translations[nextLang].desc;
    document.getElementById('langLabel').innerText = translations[nextLang].langLabel;
}

// [3] نظام ساعة البومودورو (Pomodoro Timer)
let timer;
let timeLeft = 1500; // 25 min
let isRunning = false;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timerDisplay').innerText = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function setTimer(minutes) {
    clearInterval(timer);
    isRunning = false;
    timeLeft = minutes * 60;
    updateDisplay();
    document.getElementById('playIcon').setAttribute('data-lucide', 'play');
    lucide.createIcons();
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById('playIcon').setAttribute('data-lucide', 'play');
    } else {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                handleSessionComplete();
            }
        }, 1000);
        document.getElementById('playIcon').setAttribute('data-lucide', 'pause');
    }
    isRunning = !isRunning;
    lucide.createIcons();
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 1500;
    updateDisplay();
    document.getElementById('playIcon').setAttribute('data-lucide', 'play');
    lucide.createIcons();
}

function handleSessionComplete() {
    const studySession = document.querySelector('[data-type="study-session"]');
    if (studySession) {
        studySession.classList.add('border-l-emerald-500', 'bg-emerald-500/10');
        studySession.querySelector('h4').innerHTML += ' <span class="text-emerald-500 text-sm block">✓ تم الإنجاز</span>';
    }
    alert("انتهى وقت التركيز! الجدول تم تحديثه.");
}

// تفعيل الأيقونات عند التشغيل
lucide.createIcons();