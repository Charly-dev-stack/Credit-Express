document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('detailed-simulation');
    const amountSlider = document.getElementById('loan-amount');
    const amountOutput = document.getElementById('amount-output');
    const resultsSection = document.getElementById('simulation-results');

    // Mettre à jour l'affichage du montant
    amountSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value).toLocaleString('fr-FR');
        amountOutput.textContent = `${value} €`;
    });

    // Calculer le prêt
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const amount = parseInt(amountSlider.value);
        const duration = parseInt(document.getElementById('loan-duration').value);
        const loanType = document.getElementById('loan-type').value;

        // Taux d'intérêt selon le type de prêt
        const rates = {
            'auto': 3.50,
            'perso': 2.99,
            'pro': 2.50,
            'hypothecaire': 1.99
        };

        const rate = rates[loanType] || 2.99;
        const monthlyRate = rate / 100 / 12;

        // Calcul de la mensualité (formule de crédit)
        const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, duration)) / 
                             (Math.pow(1 + monthlyRate, duration) - 1);

        const totalAmount = monthlyPayment * duration;
        const totalInterest = totalAmount - amount;

        // Afficher les résultats
        document.getElementById('monthly-payment').textContent = 
            `${Math.round(monthlyPayment).toLocaleString('fr-FR')} €`;
        document.getElementById('interest-rate').textContent = 
            `${rate.toFixed(2)}%`;
        document.getElementById('total-cost').textContent = 
            `${Math.round(totalInterest).toLocaleString('fr-FR')} €`;
        document.getElementById('total-amount').textContent = 
            `${Math.round(totalAmount).toLocaleString('fr-FR')} €`;

        // Afficher la section des résultats
        resultsSection.classList.remove('hidden');
        
        // Scroll vers les résultats
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    });
});
