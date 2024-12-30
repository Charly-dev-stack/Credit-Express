// Règles de validation
const validationRules = {
    // Règles pour le formulaire d'inscription
    register: {
        firstName: {
            required: true,
            minLength: 2,
            pattern: /^[A-Za-zÀ-ÿ\s-]+$/,
            message: "Prénom invalide (minimum 2 caractères, lettres uniquement)"
        },
        lastName: {
            required: true,
            minLength: 2,
            pattern: /^[A-Za-zÀ-ÿ\s-]+$/,
            message: "Nom invalide (minimum 2 caractères, lettres uniquement)"
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Adresse email invalide"
        },
        phone: {
            required: true,
            pattern: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
            message: "Numéro de téléphone invalide (format français)"
        },
        password: {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
        }
    },

    // Règles pour le formulaire de connexion
    login: {
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Adresse email invalide"
        },
        password: {
            required: true,
            message: "Veuillez entrer votre mot de passe"
        }
    },

    // Règles pour le simulateur de prêt
    simulator: {
        amount: {
            required: true,
            min: 1000,
            max: 75000,
            message: "Le montant doit être entre 1 000€ et 75 000€"
        },
        duration: {
            required: true,
            min: 12,
            max: 84,
            message: "La durée doit être entre 12 et 84 mois"
        }
    }
};

// Fonction de validation générique
function validateField(value, rules) {
    if (rules.required && !value) {
        return rules.message || "Ce champ est requis";
    }

    if (rules.minLength && value.length < rules.minLength) {
        return rules.message || `Minimum ${rules.minLength} caractères requis`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
        return rules.message || "Format invalide";
    }

    if (rules.min && (parseInt(value) < rules.min)) {
        return rules.message || `La valeur minimum est ${rules.min}`;
    }

    if (rules.max && (parseInt(value) > rules.max)) {
        return rules.message || `La valeur maximum est ${rules.max}`;
    }

    return null;
}

// Fonction pour afficher les erreurs
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorDiv);
    }
    
    input.classList.add('error');
}

// Fonction pour nettoyer les erreurs
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    input.classList.remove('error');
}

// Fonction pour valider un formulaire entier
function validateForm(formId, rules) {
    const form = document.getElementById(formId);
    let isValid = true;
    
    // Nettoyer les erreurs précédentes
    form.querySelectorAll('.error-message').forEach(error => error.remove());
    form.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
    
    // Valider chaque champ
    Object.keys(rules).forEach(fieldName => {
        const input = form.querySelector(`[name="${fieldName}"]`);
        if (input) {
            const error = validateField(input.value, rules[fieldName]);
            if (error) {
                showError(input, error);
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Gestionnaire d'événements pour la validation en temps réel
function initializeValidation(formId, rules) {
    const form = document.getElementById(formId);
    if (!form) return;

    // Validation à la soumission
    form.addEventListener('submit', (e) => {
        if (!validateForm(formId, rules)) {
            e.preventDefault();
        }
    });

    // Validation en temps réel
    Object.keys(rules).forEach(fieldName => {
        const input = form.querySelector(`[name="${fieldName}"]`);
        if (input) {
            input.addEventListener('input', () => {
                const error = validateField(input.value, rules[fieldName]);
                if (error) {
                    showError(input, error);
                } else {
                    clearError(input);
                }
            });
        }
    });
}

// Initialisation des validations pour chaque formulaire
document.addEventListener('DOMContentLoaded', () => {
    // Formulaire d'inscription
    initializeValidation('registerForm', validationRules.register);
    
    // Formulaire de connexion
    initializeValidation('loginForm', validationRules.login);
    
    // Simulateur de prêt
    initializeValidation('simulatorForm', validationRules.simulator);
});
