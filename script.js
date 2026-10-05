// ===== NAVIGATION RESPONSIVE =====
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu au clic sur un lien
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ===== VALIDATION DU FORMULAIRE DE RÉSERVATION =====
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Récupération des champs
            const nom = document.getElementById('nom');
            const telephone = document.getElementById('telephone');
            const heure = document.getElementById('heure');
            const personnes = document.getElementById('personnes');

            // Messages d'erreur
            const errorNom = document.getElementById('errorNom');
            const errorTelephone = document.getElementById('errorTelephone');
            const errorHeure = document.getElementById('errorHeure');
            const errorPersonnes = document.getElementById('errorPersonnes');
            const confirmationMessage = document.getElementById('confirmationMessage');

            // Réinitialisation
            let isValid = true;
            errorNom.textContent = '';
            errorTelephone.textContent = '';
            errorHeure.textContent = '';
            errorPersonnes.textContent = '';
            confirmationMessage.className = 'confirmation-message';
            confirmationMessage.textContent = '';

            // Validation du nom
            if (nom.value.trim() === '') {
                errorNom.textContent = 'Veuillez entrer votre nom complet.';
                isValid = false;
            } else if (nom.value.trim().length < 2) {
                errorNom.textContent = 'Le nom doit contenir au moins 2 caractères.';
                isValid = false;
            }

            // Validation du téléphone
            const telRegex = /^[0-9\s+()-]{8,20}$/;
            if (telephone.value.trim() === '') {
                errorTelephone.textContent = 'Veuillez entrer votre numéro de téléphone.';
                isValid = false;
            } else if (!telRegex.test(telephone.value.trim())) {
                errorTelephone.textContent = 'Veuillez entrer un numéro de téléphone valide.';
                isValid = false;
            }

            // Validation de l'heure
            if (heure.value === '') {
                errorHeure.textContent = 'Veuillez sélectionner une heure.';
                isValid = false;
            } else {
                const heureChoisie = heure.value;
                const [h, m] = heureChoisie.split(':').map(Number);
                if (h < 8 || h > 22 || (h === 22 && m > 0)) {
                    errorHeure.textContent = 'Les réservations sont possibles entre 08h00 et 22h00.';
                    isValid = false;
                }
            }

            // Validation du nombre de personnes
            const nbPersonnes = parseInt(personnes.value, 10);
            if (isNaN(nbPersonnes) || nbPersonnes < 1 || nbPersonnes > 12) {
                errorPersonnes.textContent = 'Le nombre de personnes doit être compris entre 1 et 12.';
                isValid = false;
            }

            // Si tout est valide
            if (isValid) {
                confirmationMessage.className = 'confirmation-message success';
                confirmationMessage.textContent = `Merci ${nom.value.trim()} ! Votre réservation pour ${nbPersonnes} personne(s) à ${heure.value} a bien été enregistrée. Nous vous contacterons au ${telephone.value.trim()} pour confirmation.`;

                // Réinitialisation du formulaire (sauf téléphone par défaut)
                reservationForm.reset();
                document.getElementById('telephone').value = '226 55 31 52 01';
                document.getElementById('personnes').value = 12;

                // Effacer le message après 8 secondes
                setTimeout(() => {
                    confirmationMessage.className = 'confirmation-message';
                    confirmationMessage.textContent = '';
                }, 8000);
            } else {
                confirmationMessage.className = 'confirmation-message error';
                confirmationMessage.textContent = 'Veuillez corriger les erreurs dans le formulaire.';
                setTimeout(() => {
                    confirmationMessage.className = 'confirmation-message';
                    confirmationMessage.textContent = '';
                }, 5000);
            }
        });
    }
});