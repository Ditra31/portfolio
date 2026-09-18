document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Modal d'authentification pour GitHub ---
    const githubBtn = document.getElementById('github-btn');
    const githubModal = document.getElementById('github-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const loginForm = document.getElementById('github-login-form');
    const loginError = document.getElementById('login-error');

    // Définissez vos identifiants ici
    const AUTH_USER = "admin";
    const AUTH_PASS = "1234";
    const GITHUB_URL = "https://github.com/Ditra31";

    if (githubBtn && githubModal) {
        githubBtn.addEventListener('click', () => {
            githubModal.classList.remove('hidden');
            loginError.classList.add('hidden');
        });

        const closeModal = () => {
            githubModal.classList.add('hidden');
            loginForm.reset();
            loginError.classList.add('hidden');
        };

        closeModalBtn.addEventListener('click', closeModal);

        githubModal.addEventListener('click', (e) => {
            if (e.target === githubModal) {
                closeModal();
            }
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('github-username').value;
            const passwordInput = document.getElementById('github-password').value;

            if (usernameInput === AUTH_USER && passwordInput === AUTH_PASS) {
                closeModal();
                window.open(GITHUB_URL, '_blank');
            } else {
                loginError.classList.remove('hidden');
            }
        });
    }

    // --- 2. Gestion du Menu Hamburger Mobile ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        const toggleMenu = () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenu.classList.toggle('hidden');
            menuBtn.setAttribute('aria-expanded', !isExpanded);
        };

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- 3. Surbrillance dynamique du menu au scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav div a[href^="#"]');

    const highlightNavOnScroll = () => {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-blue-400', 'font-semibold');
                    } else {
                        link.classList.remove('text-blue-400', 'font-semibold');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll);

    // --- 4. Effet de mouvement au survol de la souris (Hover Effect) ---
    const interactiveCards = document.querySelectorAll('#projects .grid > div, #skills .grid > div, #about .grid > div');
    
    interactiveCards.forEach(card => {
        card.classList.add('transition-all', 'duration-300', 'ease-out');

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-6px) scale(1.01)';
            card.style.boxShadow = '0 20px 25px -5px rgba(37, 99, 235, 0.15), 0 8px 10px -6px rgba(37, 99, 235, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'none';
        });
    });

    // --- 5. Bouton "Retour en haut" ---
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Retour en haut de la page');
    backToTopBtn.className = 'fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg opacity-0 pointer-events-none transition-all duration-300 transform hover:scale-110 z-50 focus:outline-none';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.remove('opacity-100');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 6. Animation d'apparition au défilement (IntersectionObserver) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('#projects .grid > div, #skills .grid > div, #about > div');
    animatedElements.forEach(el => {
        el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-8');
        observer.observe(el);
    });

});
