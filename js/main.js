// Navigation mobile
document.addEventListener('DOMContentLoaded', () => {
    // Gestion du menu mobile
    const createMobileMenu = () => {
        const header = document.querySelector('.header');
        const nav = document.querySelector('.main-nav');
        
        // Créer le bouton hamburger
        const hamburger = document.createElement('button');
        hamburger.className = 'mobile-menu-btn';
        hamburger.innerHTML = '☰';
        hamburger.style.display = 'none';
        
        // Styles pour le bouton
        hamburger.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            display: none;
        `;

        // Ajouter le bouton au header
        header.insertBefore(hamburger, nav);

        // Gérer le clic sur le bouton
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        // Media query pour afficher/cacher le bouton
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleMobileMenu = (e) => {
            if (e.matches) {
                hamburger.style.display = 'block';
            } else {
                hamburger.style.display = 'none';
                nav.classList.remove('active');
            }
        };

        mediaQuery.addListener(handleMobileMenu);
        handleMobileMenu(mediaQuery);
    };

    createMobileMenu();

    // Gestion du formulaire de simulation
    const simulationForm = document.getElementById('quick-simulation');
    if (simulationForm) {
        simulationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const project = document.getElementById('project').value;
            const amount = document.getElementById('amount').value;

            // Validation basique
            if (!project || !amount) {
                alert('Veuillez remplir tous les champs');
                return;
            }

            // Simulation de traitement
            console.log('Simulation en cours...', { project, amount });
            
            // Ici, vous pourriez rediriger vers une page de résultats
            // ou afficher un modal avec les détails de la simulation
            alert(`Simulation pour un ${project} de ${amount}€ effectuée avec succès !`);
        });
    }

    // Animation smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Animations au scroll
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observer les sections principales
    document.querySelectorAll('.loan-card, .feature').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
};

// Ajouter une classe pour les animations
document.addEventListener('DOMContentLoaded', observeElements);

// Style pour les éléments visibles
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
