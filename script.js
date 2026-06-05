
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

        // Grade sutil de fundo
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

    // Efeito hover
    document.querySelectorAll('a, button, .project-card-v2, .stack-category').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
})();


(function initReadingBar() {
    const bar = document.getElementById('reading-bar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const total = document.body.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        bar.style.width = pct + '%';
    });
})();


(function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    });
})();


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


(function initReveal() {
    const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Respeita animation-delay inline
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
// 7. CONTADOR ANIMADO (HERO STATS)
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
// 8. SCROLL SUAVE
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
// 9. BANCO DE DADOS DOS PROJETOS
// ===========================
const projectData = [
    {
        title: "Controle de Casos — TI Santa Isabel",
        sub: "Sistema em produção · Prefeitura de Santa Isabel",
        stack: ["Python", "Django", "SQL", "PDF Reports", "Login/Auth"],
        content: `
            <h3>Contexto</h3>
            <p>Sistema corporativo desenvolvido e implantado na Diretoria de TI da Prefeitura de Santa Isabel. Em uso diário pela equipe técnica.</p>
            <h3>Funcionalidades entregues</h3>
            <ul>
                <li>Substituição total de processos manuais por sistema informatizado;</li>
                <li>Gerenciamento completo de casos: criação, reabertura e finalização;</li>
                <li>Geração de relatórios em PDF com filtros por período e responsável;</li>
                <li>Controle de acesso seguro por login, com perfis de usuário diferenciados.</li>
            </ul>
            <h3>Impacto</h3>
            <p>Reduziu drasticamente o tempo de rastreamento de chamados e centralizou o histórico de manutenções da prefeitura em um único sistema auditável.</p>
        `
    },
    {
        title: "Biblioteca Senai",
        sub: "Aplicação Web · Python + Django",
        stack: ["Python 3", "Django", "ORM", "SQLite", "HTML/CSS"],
        content: `
            <h3>Sobre o projeto</h3>
            <p>Plataforma web completa para gerenciamento de biblioteca acadêmica, construída com Python e Django seguindo padrões de engenharia de software modernos.</p>
            <h3>Funcionalidades</h3>
            <ul>
                <li>Interface intuitiva para pesquisa e consulta ágil de livros;</li>
                <li>Otimização do fluxo de empréstimos e devoluções;</li>
                <li>Integração com banco de dados via ORM Django;</li>
                <li>Melhoria significativa na experiência dos usuários finais.</li>
            </ul>
        `
    },
    {
        title: "Reciclagem Escolar Sustentável",
        sub: "Plataforma de Gamificação · Front-End",
        stack: ["HTML5", "CSS3", "JavaScript", "Design Responsivo"],
        content: `
            <h3>Proposta</h3>
            <p>Sistema que incentiva a reciclagem no ambiente escolar, transformando resíduos entregues em créditos educativos — com ranking por turma para engajamento coletivo.</p>
            <h3>Funcionalidades</h3>
            <ul>
                <li>Registro de entrega de materiais recicláveis por alunos e funcionários;</li>
                <li>Atribuição de pontos (Ecocreditos) trocáveis por livros e kits escolares;</li>
                <li>Ranking de "Turmas Sustentáveis" para promover competição saudável;</li>
                <li>Relatórios de impacto ambiental por série.</li>
            </ul>
        `
    },
    {
        title: "Sistema de Integração Escolar",
        sub: "Portal Web · C# + ASP.NET",
        stack: ["C#", "ASP.NET", "SQL Server", "MVC", "Design Responsivo"],
        content: `
            <h3>Problema resolvido</h3>
            <p>Falhas de comunicação entre família e escola causam impacto direto no desempenho acadêmico. Este sistema oferece acesso em tempo real a notas, frequência e observações dos professores.</p>
            <h3>Ficha técnica</h3>
            <ul>
                <li>Desenvolvido com <strong>C# (ASP.NET) e SQL Server</strong>;</li>
                <li>Diferenciação de perfis: Pais, Professores e Alunos;</li>
                <li>Acesso instantâneo a notas, frequência e comunicados;</li>
                <li>Interface responsiva e adaptada para mobile.</li>
            </ul>
        `
    },
    {
        title: "ECOCRÉDITOS — SGTS",
        sub: "Sistema de Gestão para Troca Sustentável",
        stack: ["HTML5", "CSS3", "JavaScript"],
        content: `
            <h3>Inclusão social e sustentabilidade</h3>
            <p>Focado na valorização dos catadores de materiais recicláveis. Transforma o trabalho de coleta em retorno direto — créditos trocáveis por alimentos e necessidades básicas.</p>
            <h3>Como funciona</h3>
            <ul>
                <li>Colaboradores entregam materiais (latas, ferro, eletrônicos) e acumulam créditos;</li>
                <li>Os créditos são trocados por <strong>produtos alimentícios</strong>;</li>
                <li>Combate à invisibilidade social e às condições precárias de trabalho;</li>
                <li>Incentiva conscientização coletiva sobre o descarte de resíduos.</li>
            </ul>
        `
    },
    {
        title: "BPMN Processo Panco",
        sub: "Engenharia de Processos · Modelagem Corporativa",
        stack: ["BPMN 2.0", "Modelagem de Processos", "Gestão de TI"],
        content: `
            <h3>Engenharia de processos</h3>
            <p>Modelagem técnica completa de um processo de gestão corporativa para a empresa Panco, utilizando notação padrão de mercado BPMN.</p>
            <h3>Escopo</h3>
            <ul>
                <li>Mapeamento detalhado de fluxos com notação BPMN 2.0;</li>
                <li>Identificação de gargalos e pontos críticos de controle;</li>
                <li>Proposta de otimização para maior transparência e agilidade;</li>
                <li>Documentação focada em padronização de processos internos.</li>
            </ul>
        `
    }
];

// ===========================
// 10. MODAL DE PROJETOS
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

    // Abrir ao clicar em cards
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
// 11. EFEITO PARALLAX SUTIL NO HERO
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
