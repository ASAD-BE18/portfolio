document.addEventListener('DOMContentLoaded', () => {

    /* ── Mobile nav ──────────────────────────────────────── */
    const navToggle  = document.querySelector('.nav-toggle');
    const mobileMenu = document.getElementById('mobileMenu');

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
    }

    navToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    });

    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    /* ── Smooth scroll ───────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            closeMobileMenu();
        });
    });

    /* ── Navbar scroll glass effect ──────────────────────── */
    const navbar = document.getElementById('navbar');
    const updateNavbar = () => navbar.classList.toggle('scrolled', window.scrollY > 16);
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    /* ── Cycling typewriter ───────────────────────────────── */
    const roles = [
        'Forward Deployed Engineer',
        'AI/ML Engineer',
        'RAG & Document Intelligence',
        'AI Agents & MCP Systems',
        'Production LLM Infrastructure',
    ];
    const typeEl = document.querySelector('.typewriter-text');
    if (typeEl) {
        let ri = 0, ci = 0, deleting = false;
        const type = () => {
            const word = roles[ri];
            typeEl.textContent = deleting
                ? word.slice(0, ci - 1)
                : word.slice(0, ci + 1);
            ci += deleting ? -1 : 1;

            if (!deleting && ci === word.length) {
                deleting = true;
                setTimeout(type, 2000);
            } else if (deleting && ci === 0) {
                deleting = false;
                ri = (ri + 1) % roles.length;
                setTimeout(type, 380);
            } else {
                setTimeout(type, deleting ? 48 : 96);
            }
        };
        setTimeout(type, 600);
    }

    /* ── Scroll reveal (IntersectionObserver) ────────────── */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry, batchIdx) => {
            if (!entry.isIntersecting) return;
            setTimeout(() => entry.target.classList.add('visible'), batchIdx * 70);
            revealObs.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -44px 0px' });

    revealEls.forEach(el => revealObs.observe(el));

    /* ── Active nav link on scroll ───────────────────────── */
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links .nav-link');

    const navObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => {
                link.classList.toggle('active',
                    link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, { threshold: 0.35 });

    sections.forEach(s => navObs.observe(s));

    /* ── Dynamic Deepixel tenure ──────────────────────────── */
    const start      = new Date('2025-11-01');
    const now        = new Date();
    let yrs  = now.getFullYear() - start.getFullYear();
    let mos  = now.getMonth()    - start.getMonth();
    if (mos < 0) { mos += 12; yrs--; }
    const yrsEl = document.getElementById('deepixel-years');
    const mosEl = document.getElementById('deepixel-months');
    if (yrsEl) yrsEl.textContent = yrs;
    if (mosEl) mosEl.textContent = mos;

    /* ── Footer year ──────────────────────────────────────── */
    const fyEl = document.getElementById('footer-year');
    if (fyEl) fyEl.textContent = new Date().getFullYear();
});
