/* ========================================
   MUHAMMAD ZEESHAN - PORTFOLIO
   JavaScript - Animations & Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link based on scroll
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // ========================================
    // MOBILE NAV TOGGLE
    // ========================================
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // ========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ========================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => animationObserver.observe(el));

    // ========================================
    // SKILL BAR ANIMATIONS
    // ========================================
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.setProperty('--target-width', width + '%');
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, 200);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ========================================
    // TYPING EFFECT FOR HERO (subtle)
    // ========================================
    const greeting = document.querySelector('.greeting');
    if (greeting) {
        const text = greeting.textContent;
        greeting.textContent = '';
        greeting.style.visibility = 'visible';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                greeting.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        setTimeout(typeWriter, 500);
    }

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // CONTACT FORM HANDLING
    // ========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value || 'Portfolio Contact';
            const message = document.getElementById('message').value;
            const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
            window.location.href = `mailto:mzeeshan44203@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Opening Email...';
            btn.style.background = '#76ff03';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }

    // ========================================
    // PARALLAX EFFECT FOR ORBS
    // ========================================
    const orbs = document.querySelectorAll('.gradient-orb');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.02;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ========================================
    // COUNTER ANIMATION FOR STATS
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    if (isNaN(target)) return;
                    let current = 0;
                    const increment = target / 30;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current);
                        }
                    }, 40);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) statsObserver.observe(statsContainer);

    // ========================================
    // CERT CARD TILT EFFECT
    // ========================================
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ========================================
    // PROJECT CARD HOVER GLOW
    // ========================================
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });

    // ========================================
    // PAGE LOAD ANIMATION
    // ========================================
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    if (document.readyState === 'complete') {
        document.body.style.opacity = '1';
    } else {
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });
    }

    // ========================================
    // KEYBOARD NAVIGATION SUPPORT
    // ========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navLinksContainer.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});
