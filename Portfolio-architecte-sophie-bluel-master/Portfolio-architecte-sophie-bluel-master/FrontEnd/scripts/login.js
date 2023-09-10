// Définition des éléments HTML utilisés pour la connexion de l'administrateur
const element = {
  password: document.querySelector("#password"),
  email: document.querySelector("#email"),
  submit: document.querySelector("#submitUserInfo"),
};

// écouteur d'événement pour le clic sur le bouton de connexion
let boutonLogin = element.submit.addEventListener("click", (a) => {
  a.preventDefault();

  // Envoi d'une requête POST au serveur pour la connexion de l'administrateur
  fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
      // Envoi des données d'identification (e-mail et mot de passe) au serveur
      body: JSON.stringify({
      email: element.email.value,
      password: element.password.value,
      }),
      })
      .then((response) => response.json()) // Conversion de la réponse en JSON

      // Traitement de la réponse JSON
      .then((data) => {

             // Stockage du jeton d'authentification dans la session
          sessionStorage.setItem("Token", data.token);
        
          // Vérification de la réponse du serveur pour la gestion des erreurs
          if (data.message || data.error) {
              alert("Erreur dans l\'identifiant ou le mot de passe");
          } else {

                // Si la connexion est réussie, on marque l'administrateur comme connecté
              sessionStorage.setItem("isConnected", JSON.stringify(true));

              // Redirection vers la page d'accueil (index.html)
              window.location.replace("index.html");
          }
      })
});
