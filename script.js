/* ========================================
   MUHAMMAD ZEESHAN - PORTFOLIO
   JavaScript - Animations & Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ========================================
    // INTERACTIVE PARTICLE MESH (Hero)
    // ========================================
    const canvas = document.getElementById('particleCanvas');
    if (canvas && !prefersReducedMotion) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: -1000, y: -1000, active: false };
        let heroSection = document.getElementById('home');
        let currentOpacity = 1;
        let targetOpacity = 1;
        let animFrameId;
        let lastTime = 0;

        function resizeCanvas() {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight + window.innerHeight * 0.4;
            canvas.style.height = (heroSection.offsetHeight + window.innerHeight * 0.4) + 'px';
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * heroSection.offsetHeight;
                this.baseX = this.x;
                this.baseY = this.y;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.radius = Math.random() * 2.2 + 1.0;
                this.driftAngle = Math.random() * Math.PI * 2;
                this.driftSpeed = (Math.random() * 0.002 + 0.001);
                this.driftRadius = Math.random() * 20 + 10;
                this.pulsePhase = Math.random() * Math.PI * 2;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
            }

            update(time) {
                this.driftAngle += this.driftSpeed;
                this.pulsePhase += this.pulseSpeed;

                const driftX = Math.cos(this.driftAngle) * this.driftRadius * 0.01;
                const driftY = Math.sin(this.driftAngle * 0.7) * this.driftRadius * 0.01;

                if (mouse.active) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = 180;

                    if (dist < maxDist && dist > 0) {
                        const force = Math.pow((maxDist - dist) / maxDist, 2);
                        this.x -= dx * force * 0.015;
                        this.y -= dy * force * 0.015;
                    }
                }

                this.x += this.vx + driftX;
                this.y += this.vy + driftY;

                const margin = 30;
                if (this.x < -margin) this.x = canvas.width + margin;
                if (this.x > canvas.width + margin) this.x = -margin;
                if (this.y < -margin) this.y = heroSection.offsetHeight + window.innerHeight * 0.4 + margin;
                if (this.y > heroSection.offsetHeight + window.innerHeight * 0.4 + margin) this.y = -margin;

                this.x += (this.baseX - this.x) * 0.003;
                this.y += (this.baseY - this.y) * 0.003;
            }

            draw() {
                const pulse = 0.8 + Math.sin(this.pulsePhase) * 0.2;
                const r = this.radius * pulse;
                const alpha = 0.25 * pulse;

                ctx.beginPath();
                ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(122, 172, 212, ' + alpha + ')';
                ctx.fill();
            }
        }

        function initParticles() {
            const count = Math.min(Math.floor((canvas.width * heroSection.offsetHeight) / 10000), 120);
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        function drawConnections() {
            const heroH = heroSection.offsetHeight;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxConn = 150;

                    if (dist < maxConn) {
                        const t = 1 - dist / maxConn;
                        const opacity = t * t * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(122, 172, 212, ' + opacity + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            if (!mouse.active) return;

            for (let i = 0; i < particles.length; i++) {
                const dx = mouse.x - particles[i].x;
                const dy = mouse.y - particles[i].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxMouse = 220;

                if (dist < maxMouse && dist > 0) {
                    const t = 1 - dist / maxMouse;
                    const opacity = t * t * 0.12;

                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = 'rgba(255, 255, 255, ' + opacity + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        function animate(time) {
            const delta = time - lastTime;
            lastTime = time;

            currentOpacity += (targetOpacity - currentOpacity) * 0.04;

            if (currentOpacity < 0.005) {
                canvas.style.opacity = 0;
                animFrameId = requestAnimationFrame(animate);
                return;
            }

            canvas.style.opacity = currentOpacity;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(time); p.draw(); });
            drawConnections();
            animFrameId = requestAnimationFrame(animate);
        }
        animFrameId = requestAnimationFrame(animate);

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        });

        heroSection.addEventListener('mouseleave', () => {
            mouse.active = false;
        });

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollRatio = window.scrollY / heroSection.offsetHeight;
                    if (scrollRatio < 0.85) {
                        targetOpacity = 1;
                    } else {
                        const fade = 1 - (scrollRatio - 0.85) / 1.5;
                        targetOpacity = Math.max(0, Math.min(1, fade));
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

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

    // Close mobile nav when tapping outside
    document.addEventListener('click', (e) => {
        if (!navLinksContainer.contains(e.target) && !navToggle.contains(e.target) && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // ========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ========================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    if (prefersReducedMotion) {
        animateElements.forEach(el => el.classList.add('visible'));
    } else {
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
    }

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
        if (prefersReducedMotion) {
            greeting.textContent = text;
        } else {
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
            btn.style.background = '#ffffff';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }

    // ========================================
    // PARALLAX EFFECT FOR ORBS (throttled)
    // ========================================
    if (!prefersReducedMotion) {
        let ticking = false;
        const orbs = document.querySelectorAll('.gradient-orb');
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    orbs.forEach((orb, index) => {
                        const speed = (index + 1) * 0.02;
                        orb.style.transform = `translateY(${scrollY * speed}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

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
    if (prefersReducedMotion) {
        document.body.style.opacity = '1';
    } else {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        if (document.readyState === 'complete') {
            document.body.style.opacity = '1';
        } else {
            window.addEventListener('load', () => {
                document.body.style.opacity = '1';
            });
        }
    }

    // ========================================
    // KEYBOARD NAVIGATION SUPPORT
    // ========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navLinksContainer.classList.remove('active');
            navToggle.classList.remove('active');
            closeCertModal();
        }
    });

    // ========================================
    // CERTIFICATE MODAL
    // ========================================
    const certModal = document.getElementById('certModal');
    const certModalTitle = document.getElementById('certModalTitle');
    const certModalIssuer = document.getElementById('certModalIssuer');
    const certModalBody = document.getElementById('certModalBody');
    const certModalVerify = document.getElementById('certModalVerify');
    const certModalDownload = document.getElementById('certModalDownload');
    const certModalClose = document.getElementById('certModalClose');
    let currentZoom = 1;
    let currentFile = '';

    window.openCertModal = function(btn) {
        const card = btn.closest('[data-cert-file]');
        if (!card) return;
        const file = card.getAttribute('data-cert-file');
        const name = card.getAttribute('data-cert-name');
        const issuer = card.getAttribute('data-cert-issuer') || '';
        const verifyUrl = card.getAttribute('data-verify-url');
        if (!file) return;

        currentFile = file;
        currentZoom = 1;
        certModalTitle.textContent = name || 'Certificate';
        certModalIssuer.textContent = issuer;

        const existing = certModalBody.querySelector('iframe, img');
        if (existing) existing.remove();

        const isImage = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(file);
        if (isImage) {
            const img = document.createElement('img');
            img.src = file;
            img.alt = name;
            img.style.transform = 'scale(1)';
            certModalBody.insertBefore(img, certModalBody.querySelector('.cert-zoom-controls'));
        } else {
            const iframe = document.createElement('iframe');
            iframe.src = file;
            iframe.title = name;
            certModalBody.insertBefore(iframe, certModalBody.querySelector('.cert-zoom-controls'));
        }

        if (verifyUrl) {
            certModalVerify.href = verifyUrl;
            certModalVerify.style.display = 'flex';
        } else {
            certModalVerify.style.display = 'none';
        }

        certModalDownload.onclick = function() {
            const a = document.createElement('a');
            a.href = file;
            a.download = file.split('/').pop();
            a.click();
        };

        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    function closeCertModal() {
        certModal.classList.remove('active');
        document.body.style.overflow = '';
        const existing = certModalBody.querySelector('iframe, img');
        if (existing) existing.remove();
        currentZoom = 1;
    }

    certModalClose.addEventListener('click', closeCertModal);
    certModal.addEventListener('click', (e) => {
        if (e.target === certModal) closeCertModal();
    });

    document.getElementById('certZoomIn').addEventListener('click', () => {
        currentZoom = Math.min(currentZoom + 0.25, 3);
        applyZoom();
    });

    document.getElementById('certZoomOut').addEventListener('click', () => {
        currentZoom = Math.max(currentZoom - 0.25, 0.5);
        applyZoom();
    });

    document.getElementById('certZoomReset').addEventListener('click', () => {
        currentZoom = 1;
        applyZoom();
    });

    function applyZoom() {
        const el = certModalBody.querySelector('img');
        if (el) el.style.transform = 'scale(' + currentZoom + ')';
    }
});
