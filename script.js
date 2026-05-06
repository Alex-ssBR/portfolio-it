/**
 * PORTFÓLIO - ALEX SILVA SANTOS
 * Lógica: Carrossel, Modal, Scroll Reveal e Efeitos de Profundidade
 */

// 1. BANCO DE DADOS DOS PROJETOS
const projectData = [
    {
        title: "Controle de Casos - TI Santa Isabel",
        content: `
            <p><strong>Status:</strong> Implantado na Diretoria de TI da Prefeitura de Santa Isabel.</p>
            <h3>Introdução</h3>
            <p>Desenvolvimento de um Sistema Corporativo de Registro de Casos de TI para otimizar o controle de solicitações de manutenção de hardware e software.</p>
            <h3>Objetivos</h3>
            <ul>
                <li>Substituir processos manuais por um sistema informatizado;</li>
                <li>Gerenciamento total de casos: criação, reabertura e finalização;</li>
                <li>Geração de relatórios em PDF e filtros por período;</li>
                <li>Ambiente seguro com controle de acesso por login.</li>
            </ul>
        `
    },
    {
        title: "Biblioteca Senai (Python/Django)",
        content: `
            <h3>Tecnologia de Ponta</h3>
            <p>Plataforma web para gerenciamento de biblioteca utilizando <strong>Python + Django</strong>, com integração ao banco de dados via ORM.</p>
            <h3>Destaques Técnicos</h3>
            <ul>
                <li>Interface intuitiva para pesquisa e consulta ágil de livros;</li>
                <li>Otimização do trabalho dos bibliotecários e fluxo de empréstimos;</li>
                <li>Aplicação seguindo padrões modernos de engenharia de software;</li>
                <li>Melhoria na experiência do usuário final (leitores).</li>
            </ul>
        `
    },
    {
        title: "Sistema de Reciclagem Escolar Sustentável",
        content: `
            <h3>Gamificação e Educação</h3>
            <p>Este sistema incentiva a reciclagem no ambiente escolar, transformando lixo em créditos educativos.</p>
            <h3>Funcionalidades</h3>
            <ul>
                <li>Registro de entrega de materiais recicláveis por alunos e funcionários;</li>
                <li>Atribuição de pontos (Ecocreditos) para troca por livros e kits escolares;</li>
                <li>Ranking de "Turmas Sustentáveis" para promover engajamento coletivo;</li>
                <li>Relatórios detalhados de impacto ambiental por série.</li>
            </ul>
        `
    },
    {
        title: "Sistema de Integração Escolar",
        content: `
            <h3>Família e Escola Conectadas</h3>
            <p>Sistema web destinado ao acompanhamento acadêmico em tempo real, resolvendo falhas de comunicação família-instituição.</p>
            <h3>Ficha Técnica</h3>
            <ul>
                <li>Desenvolvido com <strong>C# (ASP.NET) e SQL Server</strong>;</li>
                <li>Acesso instantâneo a notas, frequência e observações dos professores;</li>
                <li>Interface responsiva e intuitiva para os responsáveis;</li>
                <li>Diferenciação de perfis (Pais, Professores e Alunos).</li>
            </ul>
        `
    },
    {
        title: "ECOCRÉDITOS - SGTS",
        content: `
            <p><strong>SGTS:</strong> Sistema de Gestão para Troca Sustentável.</p>
            <h3>Inclusão Social</h3>
            <p>Focado na valorização dos catadores de materiais recicláveis, transformando o impacto ambiental em retorno direto para o trabalhador.</p>
            <h3>Funcionamento</h3>
            <ul>
                <li>Colaboradores entregam materiais (latas, ferro, eletrônicos) e acumulam créditos;</li>
                <li>Os créditos podem ser trocados por <strong>produtos alimentícios</strong>;</li>
                <li>Combate à invisibilidade social e condições precárias de trabalho;</li>
                <li>Incentiva a conscientização coletiva sobre o descarte de resíduos.</li>
            </ul>
        `
    },
    {
        title: "BPMN Processo Panco",
        content: `
            <h3>Engenharia de Processos</h3>
            <p>Modelagem técnica de um processo de gestão específico para a unidade corporativa da empresa <strong>Panco</strong>.</p>
            <h3>Escopo do Projeto</h3>
            <ul>
                <li>Mapeamento de fluxos utilizando a notação padrão BPMN;</li>
                <li>Identificação de gargalos e pontos críticos de controle;</li>
                <li>Proposta de otimização para garantir maior transparência e agilidade na gestão;</li>
                <li>Documentação focada em padronização de processos internos.</li>
            </ul>
        `
    }
];

// 2. INICIALIZAÇÃO E EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE REVELAÇÃO AO SCROLL (SCROLL REVEAL) ---
    const observerOptions = {
        threshold: 0.15 // Dispara quando 15% da seção estiver visível
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        revealObserver.observe(section);
    });

    // --- ELEMENTOS DO CARROSSEL ---
    const track = document.getElementById('track');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentIndex = 0;

    // --- ELEMENTOS DO MODAL ---
    const modal = document.getElementById('projectModal');
    const modalData = document.getElementById('modal-data');
    const closeModalBtn = document.getElementById('closeModal');
    const projectCards = document.querySelectorAll('.project-card');

    // --- FUNÇÕES DO CARROSSEL ---
    function updateCarousel() {
        if(track) {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < projectData.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : projectData.length - 1;
            updateCarousel();
        });
    }

    // --- LÓGICA DO MODAL ---
    function openModal(index) {
        const project = projectData[index];
        if (project) {
            modalData.innerHTML = `
                <h2>${project.title}</h2>
                <div class="modal-body-content">
                    ${project.content}
                </div>
            `;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; 
        }
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const index = card.getAttribute('data-index');
            openModal(index);
        });
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- EFEITOS DE FUNDO (ÁGUA DINÂMICA) ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const blobs = document.querySelectorAll('.blob');
        
        blobs.forEach((blob, index) => {
            const speed = 0.1 + (index * 0.1); // Velocidades diferentes para cada blob
            const scale = 1 + (scrolled * 0.00015); // Aumenta levemente ao descer
            
            blob.style.transform = `translateY(${scrolled * speed}px) scale(${scale})`;
        });

        // Efeito Parallax leve nos cards (Opcional)
        document.querySelectorAll('.glass-card').forEach(card => {
            const cardSpeed = 0.05;
            card.style.backgroundPositionY = `${scrolled * cardSpeed}px`;
        });
    });

    // --- SCROLL SUAVE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});