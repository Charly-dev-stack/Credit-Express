document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            // Ici, vous ajouterez la logique de connexion avec votre backend
            console.log('Tentative de connexion:', { email, remember });
            
            // Simulation de connexion réussie
            alert('Connexion réussie !');
            window.location.href = 'dashboard.html';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                firstname: document.getElementById('firstname').value,
                lastname: document.getElementById('lastname').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: document.getElementById('password').value,
                confirmPassword: document.getElementById('confirm-password').value
            };

            // Validation du mot de passe
            if (formData.password !== formData.confirmPassword) {
                alert('Les mots de passe ne correspondent pas');
                return;
            }

            // Ici, vous ajouterez la logique d'inscription avec votre backend
            console.log('Tentative d\'inscription:', formData);
            
            // Simulation d'inscription réussie
            alert('Inscription réussie ! Vous allez être redirigé vers la page de connexion.');
            window.location.href = 'login.html';
        });
    }

    // Validation en temps réel du mot de passe
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    if (password && confirmPassword) {
        const validatePassword = () => {
            if (password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('Les mots de passe ne correspondent pas');
            } else {
                confirmPassword.setCustomValidity('');
            }
        };

        password.addEventListener('change', validatePassword);
        confirmPassword.addEventListener('keyup', validatePassword);
    }
});
