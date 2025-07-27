const typedTextSpan = document.getElementById('typed-text');
const textArray = ["cutting-edge software.", "impactful digital experiences.", "scalable web applications.", "elegant user interfaces."];
const revealDelay = 1500;
const animationDuration = 800;
let textArrayIndex = 0;

function revealText() {
    typedTextSpan.textContent = textArray[textArrayIndex];
    typedTextSpan.classList.add('text-reveal-animation');
    setTimeout(() => {
        typedTextSpan.classList.remove('text-reveal-animation');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        setTimeout(revealText, 300);
    }, animationDuration);
}

document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) {
        revealText();
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    if (themeToggleBtn) {
        function setTheme(theme) {
            if (theme === 'light') {
                body.classList.add('light-mode');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-mode');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        }
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const menuToggle = document.getElementById('menu-toggle');
    const menuIcon = document.getElementById('menu-icon');
    const mainMenu = document.getElementById('main-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', () => {
            mainMenu.classList.toggle('hidden');
            const isHidden = mainMenu.classList.contains('hidden');
            menuIcon.classList.toggle('fa-bars', isHidden);
            menuIcon.classList.toggle('fa-times', !isHidden);
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) { 
                mainMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });
});