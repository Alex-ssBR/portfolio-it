/**
 * PORTFOLIO - ALEX SILVA SANTOS
 * Logic: Individual Carousel, Informative Modal, Scroll Reveal, and Depth Effects
 */

// 1. PROJECTS DATABASE (English Version)
const projectData = [
    {
        title: "Case Control - Santa Isabel IT",
        content: `
            <p><strong>Status:</strong> Deployed at the IT Department of Santa Isabel City Hall.</p>
            <h3>Introduction</h3>
            <p>Development of a Corporate IT Case Registration System to optimize the control of hardware and software maintenance requests.</p>
            <h3>Objectives</h3>
            <ul>
                <li>Replace manual processes with a computerized system;</li>
                <li>Full case management: creation, reopening, and closing;</li>
                <li>PDF report generation and period-based filtering;</li>
                <li>Secure environment with login-based access control.</li>
            </ul>
        `
    },
    {
        title: "Senai Library (Python/Django)",
        content: `
            <h3>State-of-the-Art Technology</h3>
            <p>Web platform for library management using <strong>Python + Django</strong>, with database integration via ORM.</p>
            <h3>Technical Highlights</h3>
            <ul>
                <li>Intuitive interface for fast book searching and consultation;</li>
                <li>Optimization of librarians' workflow and loan cycles;</li>
                <li>Application following modern software engineering standards;</li>
                <li>Improved end-user experience (readers).</li>
            </ul>
        `
    },
    {
        title: "Sustainable School Recycling System",
        content: `
            <h3>Gamification and Education</h3>
            <p>This system encourages recycling in the school environment by turning waste into educational credits.</p>
            <h3>Features</h3>
            <ul>
                <li>Records recyclable material delivery from students and staff;</li>
                <li>Assignment of points (Eco-credits) for books and school kits;</li>
                <li>"Sustainable Classroom" ranking to promote collective engagement;</li>
                <li>Detailed environmental impact reports by grade level.</li>
            </ul>
        `
    },
    {
        title: "School Integration System",
        content: `
            <h3>Connected Families and Schools</h3>
            <p>Web system for real-time academic monitoring, bridging the communication gap between families and institutions.</p>
            <h3>Technical Details</h3>
            <ul>
                <li>Developed with <strong>C# (ASP.NET) and SQL Server</strong>;</li>
                <li>Instant access to grades, attendance, and teacher notes;</li>
                <li>Responsive and intuitive interface for guardians;</li>
                <li>Distinct profiles (Parents, Teachers, and Students).</li>
            </ul>
        `
    },
    {
        title: "ECO-CREDITS - SGTS",
        content: `
            <p><strong>SGTS:</strong> Sustainable Exchange Management System.</p>
            <h3>Social Inclusion</h3>
            <p>Focused on empowering waste pickers, turning environmental impact into direct returns for workers.</p>
            <h3>How it works</h3>
            <ul>
                <li>Contributors deliver materials (cans, scrap metal, electronics) and earn credits;</li>
                <li>Credits can be exchanged for <strong>food products</strong>;</li>
                <li>Combats social invisibility and precarious working conditions;</li>
                <li>Encourages collective awareness regarding waste disposal.</li>
            </ul>
        `
    },
    {
        title: "Panco Process BPMN",
        content: `
            <h3>Process Engineering</h3>
            <p>Technical modeling of a specific management process for the <strong>Panco</strong> corporate unit.</p>
            <h3>Project Scope</h3>
            <ul>
                <li>Process mapping using standard BPMN notation;</li>
                <li>Identification of bottlenecks and critical control points;</li>
                <li>Optimization proposal to ensure greater transparency and agility;</li>
                <li>Documentation focused on internal process standardization.</li>
            </ul>
        `
    }
];

// 2. INITIALIZATION AND EVENTS
document.addEventListener('DOMContentLoaded', () => {
    
    // --- SCROLL REVEAL LOGIC ---
    const observerOptions = {
        threshold: 0.15 // Triggers when 15% of the section is visible
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

    // --- CAROUSEL ELEMENTS ---
    const track = document.getElementById('track');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentIndex = 0;

    // --- MODAL ELEMENTS ---
    const modal = document.getElementById('projectModal');
    const modalData = document.getElementById('modal-data');
    const closeModalBtn = document.getElementById('closeModal');
    const projectCards = document.querySelectorAll('.project-card');

    // --- CAROUSEL FUNCTIONS ---
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

    // --- MODAL LOGIC ---
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

    // --- BACKGROUND EFFECTS (DYNAMIC WATER/PARALLAX) ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const blobs = document.querySelectorAll('.blob');
        
        blobs.forEach((blob, index) => {
            const speed = 0.1 + (index * 0.1); 
            const scale = 1 + (scrolled * 0.00015); 
            
            blob.style.transform = `translateY(${scrolled * speed}px) scale(${scale})`;
        });

        // Slight Parallax effect on glass cards
        document.querySelectorAll('.glass-card').forEach(card => {
            const cardSpeed = 0.05;
            card.style.backgroundPositionY = `${scrolled * cardSpeed}px`;
        });
    });

    // --- SMOOTH SCROLL ---
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
