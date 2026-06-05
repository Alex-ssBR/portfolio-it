/**
 * PORTFOLIO — ALEX SILVA SANTOS
 * Main script: Canvas, Cursor, Scroll, Modal, Counter
 */

// ===========================
// 1. PARTICLE CANVAS
// ===========================
(function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() { this.reset(true); }
        reset(init) {
            this.x = Math.random() * W;
            this.y = init ? Math.random() * H : H + 10;
            this.size = Math.random() * 1.5 + 0.3;
            this.speed = Math.random() * 0.3 + 0.1;
            this.opacity = Math.random() * 0.4 + 0.05;
            this.color = Math.random() > 0.6 ? '#38bdf8' : '#a78bfa';
            this.drift = (Math.random() - 0.5) * 0.2;
        }
        update() {
            this.y -= this.speed;
            this.x += this.drift;
            if (this.y < -10) this.reset(false);
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.min(120, Math.floor((W * H) / 14000));
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);

        // Subtle background grid
        ctx.strokeStyle = 'rgba(255,255,255,0.025)';
        ctx.lineWidth = 0.5;
        const gridSize = 80;
        for (let x = 0; x < W; x += gridSize) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
        }
        for (let y = 0; y < H; y += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }

        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    }

    resize();
    initParticles();
    loop();
    window.addEventListener('resize', () => { resize(); initParticles(); });
})();

// ===========================
// 2. CUSTOM CURSOR
// ===========================
(function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || window.matchMedia('(max-width: 768px)').matches) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    document.addEventListener('mousedown', () => document.body.classList.add('cursor-clicking'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-clicking'));

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect
    document.querySelectorAll('a, button, .project-card-v2, .stack-category').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
})();

// ===========================
// 3. READING PROGRESS BAR
// ===========================
(function initReadingBar() {
    const bar = document.getElementById('reading-bar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const total = document.body.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        bar.style.width = pct + '%';
    });
})();

// ===========================
// 4. SCROLLED HEADER
// ===========================
(function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    });
})();

// ===========================
// 5. MOBILE MENU
// ===========================
(function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
    });

    document.querySelectorAll('.m-link').forEach(link => {
        link.addEventListener('click', () => menu.classList.remove('open'));
    });
})();

// ===========================
// 6. SCROLL REVEAL
// ===========================
(function initReveal() {
    const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Respect inline animation-delay
                const el = entry.target;
                const delay = parseFloat(el.style.animationDelay || '0') * 1000;
                setTimeout(() => el.classList.add('revealed'), delay);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.12 });

    els.forEach(el => observer.observe(el));
})();

// ===========================
// 7. ANIMATED COUNTER (HERO STATS)
// ===========================
(function initCounters() {
    const counters = document.querySelectorAll('.stat-num[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'));
            const duration = 1200;
            const start = performance.now();

            function tick(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(ease * target);
                if (progress < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            }
            requestAnimationFrame(tick);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
})();

// ===========================
// 8. SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const id = this.getAttribute('href');
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    });
});

// ===========================
// 9. PROJECT DATABASE
// ===========================
const projectData = [
    {
        title: "Case Control — IT Santa Isabel",
        sub: "System in production · Santa Isabel City Hall",
        stack: ["Python", "Django", "SQL", "PDF Reports", "Login/Auth"],
        content: `
            <h3>Context</h3>
            <p>Corporate system developed and deployed at the IT Directorate of Santa Isabel City Hall. In daily use by the technical team.</p>
            <h3>Delivered Features</h3>
            <ul>
                <li>Total replacement of manual processes with a digital system;</li>
                <li>Complete case management: creation, reopening, and closing;</li>
                <li>PDF report generation with filters by period and responsible party;</li>
                <li>Secure access control via login, with differentiated user profiles.</li>
            </ul>
            <h3>Impact</h3>
            <p>Drastically reduced ticket tracking time and centralized the city hall's maintenance history into a single auditable system.</p>
        `
    },
    {
        title: "Senai Library",
        sub: "Web Application · Python + Django",
        stack: ["Python 3", "Django", "ORM", "SQLite", "HTML/CSS"],
        content: `
            <h3>About the Project</h3>
            <p>Complete web platform for academic library management, built with Python and Django following modern software engineering standards.</p>
            <h3>Features</h3>
            <ul>
                <li>Intuitive interface for fast book searching and consultation;</li>
                <li>Optimization of loan and return workflows;</li>
                <li>Database integration via Django ORM;</li>
                <li>Significant improvement in end-user experience.</li>
            </ul>
        `
    },
    {
        title: "Sustainable School Recycling",
        sub: "Gamification Platform · Front-End",
        stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        content: `
            <h3>Proposal</h3>
            <p>A system that encourages recycling in the school environment by transforming delivered waste into educational credits — featuring a class ranking for collective engagement.</p>
            <h3>Features</h3>
            <ul>
                <li>Recyclable material delivery registry for students and staff;</li>
                <li>Point attribution (Ecocredits) exchangeable for books and school kits;</li>
                <li>"Sustainable Classes" ranking to promote healthy competition;</li>
                <li>Environmental impact reports per grade level.</li>
            </ul>
        `
    },
    {
        title: "School Integration System",
        sub: "Web Portal · C# + ASP.NET",
        stack: ["C#", "ASP.NET", "SQL Server", "MVC", "Responsive Design"],
        content: `
            <h3>Problem Solved</h3>
            <p>Communication gaps between families and schools directly impact academic performance. This system provides real-time access to grades, attendance, and teacher remarks.</p>
            <h3>Technical Specs</h3>
            <ul>
                <li>Developed with <strong>C# (ASP.NET) and SQL Server</strong>;</li>
                <li>Role differentiation: Parents, Teachers, and Students;</li>
                <li>Instant access to grades, frequency, and announcements;</li>
                <li>Responsive interface adapted for mobile devices.</li>
            </ul>
        `
    },
    {
        title: "ECOCREDITS — SGTS",
        sub: "Sustainable Exchange Management System",
        stack: ["HTML5", "CSS3", "JavaScript"],
        content: `
            <h3>Social Inclusion and Sustainability</h3>
            <p>Focused on valuing recyclable material pickers. Transforms collection work into direct returns — credits exchangeable for food and basic necessities.</p>
            <h3>How it works</h3>
            <ul>
                <li>Collaborators deliver materials (cans, iron, electronics) and accumulate credits;</li>
                <li>Credits are exchanged for <strong>food products</strong>;</li>
                <li>Combats social invisibility and precarious working conditions;</li>
                <li>Encourages collective awareness regarding waste disposal.</li>
            </ul>
        `
    },
    {
        title: "Panco Process BPMN",
        sub: "Process Engineering · Corporate Modeling",
        stack: ["BPMN 2.0", "Process Modeling", "IT Management"],
        content: `
            <h3>Process Engineering</h3>
            <p>Complete technical modeling of a corporate management process for Panco, using industry-standard BPMN notation.</p>
            <h3>Scope</h3>
            <ul>
                <li>Detailed flow mapping using BPMN 2.0 notation;</li>
                <li>Identification of bottlenecks and critical control points;</li>
                <li>Optimization proposal for greater transparency and agility;</li>
                <li>Documentation focused on internal process standardization.</li>
            </ul>
        `
    },
    {
        title: "Ecological Park Platform",
        sub: "GovTech & Institutional Portal · FATEC & City Hall",
        stack: ["PHP", "MySQL", "JavaScript", "Networking", "Agile"],
        content: `
            <h3>About the Project</h3>
            <p>An academic initiative developed at FATEC in partnership with the City Hall of Itaquaquecetuba to modernize public services and park management.</p>
            <h3>My Role & Contributions</h3>
            <ul>
                <li><strong>Network Management:</strong> Supported infrastructure organization and technical communication within a multidisciplinary team.</li>
                <li><strong>Coordination:</strong> Acted in project management and team synchronization using Agile Methodologies.</li>
                <li><strong>Admin System:</strong> Developed features for visitor scheduling, engagement tracking, and environmental education management.</li>
                <li><strong>Modernization:</strong> Delivered a complete institutional website to improve public service accessibility and digital presence.</li>
            </ul>
        `
    },
];

// ===========================
// 10. PROJECT MODAL
// ===========================
(function initModal() {
    const modal = document.getElementById('projectModal');
    const backdrop = document.getElementById('modalBackdrop');
    const panel = document.getElementById('modalPanel');
    const closeBtn = document.getElementById('closeModal');
    const modalData = document.getElementById('modal-data');
    if (!modal) return;

    function openModal(index) {
        const proj = projectData[index];
        if (!proj) return;

        const stackHTML = proj.stack.map(t => `<span>${t}</span>`).join('');
        modalData.innerHTML = `
            <h2>${proj.title}</h2>
            <p class="modal-sub">${proj.sub}</p>
            <div class="modal-body">${proj.content}</div>
            <div class="modal-stack">${stackHTML}</div>
        `;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Open when clicking cards
    document.querySelectorAll('.project-card-v2').forEach(card => {
        card.addEventListener('click', () => {
            const idx = parseInt(card.getAttribute('data-index'));
            openModal(idx);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });
})();

// ===========================
// 11. SUBTLE HERO PARALLAX EFFECT
// ===========================
(function initParallax() {
    const hero = document.getElementById('hero');
    if (!hero || window.matchMedia('(max-width: 768px)').matches) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroInner = hero.querySelector('.hero-inner');
        if (heroInner) {
            heroInner.style.transform = `translateY(${scrolled * 0.18}px)`;
            heroInner.style.opacity = 1 - scrolled * 0.001;
        }
    });
})();
