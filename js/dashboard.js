document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la navigation
    const navLinks = document.querySelectorAll('.dashboard-nav a');
    const sections = document.querySelectorAll('.dashboard-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Mise à jour des classes actives
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Menu utilisateur
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', () => {
            userDropdown.classList.toggle('show');
        });

        // Fermer le menu si on clique ailleurs
        document.addEventListener('click', (e) => {
            if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }

    // Gestion du drag & drop pour les documents
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');

    if (uploadBox && fileInput) {
        uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadBox.classList.add('dragover');
        });

        uploadBox.addEventListener('dragleave', () => {
            uploadBox.classList.remove('dragover');
        });

        uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadBox.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        uploadBox.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', () => {
            handleFiles(fileInput.files);
        });
    }

    // Gestion des formulaires
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simuler la sauvegarde
            showNotification('Modifications enregistrées avec succès');
        });
    }

    // Bouton de déconnexion
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Rediriger vers la page de connexion
            window.location.href = 'login.html';
        });
    }

    // Initialisation des graphiques
    function initCharts() {
        // Graphique de répartition des prêts
        const loansCtx = document.getElementById('loansChart').getContext('2d');
        new Chart(loansCtx, {
            type: 'doughnut',
            data: {
                labels: ['Prêt Auto', 'Prêt Travaux', 'Prêt Personnel'],
                datasets: [{
                    data: [15000, 25000, 0],
                    backgroundColor: ['#3498db', '#e74c3c', '#2ecc71'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });

        // Graphique d'évolution des remboursements
        const paymentsCtx = document.getElementById('paymentsChart').getContext('2d');
        new Chart(paymentsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
                datasets: [{
                    label: 'Remboursements',
                    data: [850, 850, 850, 850, 850, 850],
                    borderColor: '#3498db',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(52, 152, 219, 0.1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => value + ' €'
                        }
                    }
                }
            }
        });

        // Graphique historique des demandes
        const historyCtx = document.getElementById('historyChart').getContext('2d');
        new Chart(historyCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
                datasets: [{
                    label: 'Demandes approuvées',
                    data: [1, 0, 1, 0, 0, 1],
                    backgroundColor: '#2ecc71'
                }, {
                    label: 'Demandes en cours',
                    data: [0, 1, 0, 1, 1, 0],
                    backgroundColor: '#f1c40f'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    // Appeler initCharts après le chargement du DOM
    if (document.getElementById('loansChart')) {
        initCharts();
    }

    // Améliorer la validation des formulaires
    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('input', () => {
        const strength = checkPasswordStrength(passwordInput.value);
        showPasswordStrength(strength);
    });
});

// Fonctions utilitaires
function handleFiles(files) {
    // Simuler l'upload
    Array.from(files).forEach(file => {
        showNotification(`Fichier "${file.name}" téléchargé avec succès`);
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animer l'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Ajouter des protections XSS
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}

// Ajouter une protection CSRF
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

// Ajouter des états de chargement
function showLoading(element) {
    element.classList.add('loading');
    element.disabled = true;
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.disabled = false;
}

// Ajouter une meilleure gestion des erreurs
function handleError(error) {
    if (error.response) {
        showNotification(error.response.data.message, 'error');
    } else if (error.request) {
        showNotification('Erreur de connexion au serveur', 'error');
    } else {
        showNotification('Une erreur est survenue', 'error');
    }
}

// Ajouter des tests unitaires
describe('Simulateur de prêt', () => {
    test('calcule correctement les mensualités', () => {
        // ...
    });
});
