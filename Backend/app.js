const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const app = express();

// Chargement des variables d'environnement
// Déterminez le chemin du fichier .env en fonction de l'environnement
const envPath =
  process.env.NODE_ENV === "production"
    ? path.join("/home/debian/envs/transpilot.env")
    : path.join(__dirname, "/config/.env");

// Essayez de charger les variables d'environnement
try {
  const result = dotenv.config({ path: envPath });

  // Vérifiez si le fichier .env a été correctement chargé
  if (result.error) {
    //console.error(`Erreur lors du chargement du fichier .env :`, result.error);
    process.exit(1); // Arrêtez le processus si les variables d'environnement sont critiques
  } else {
    console.log(`Fichier .env chargé depuis : ${envPath}`);
  }
} catch (error) {
  //console.error(`Erreur inattendue lors du chargement du fichier .env :`, error);
  process.exit(1);
}

// Le reste de votre application peut utiliser les variables chargées
//console.log("NODE_ENV:", process.env.NODE_ENV);


//const listEndpoints = require('express-list-endpoints');
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://127.0.0.1:3000",
        "http://localhost:3000",
        "http://127.0.0.1:80",
        "http://projectpartners-solutions.com",
        "http://www.projectpartners-solutions.com",
        "https://projectpartners-solutions.com",
        "https://www.projectpartners-solutions.com",
        "http://51.254.38.237:5000",
        "https://51.254.38.237:5000",
      ];

      // Si l'origine est dans la liste autorisée ou si elle est absente (requête locale), on autorise
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith("http://localhost")) {
        callback(null, true);
      } else {
        callback(new Error("CORS non autorisé pour cette origine."));
      }
    },
    credentials: true, // Nécessaire pour les cookies ou l'authentification basée sur les sessions
  })
);



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/", express.static("uploads"));

// simple route
app.get("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "Welcome to bezkoder application." });
});
// import routes
const proprio = require("./controller/proprio");
const produit = require("./controller/produit");
const camion = require("./controller/camion");
const tracteur = require("./controller/tracteur");
const benne = require("./controller/benne");
const chauffeur = require("./controller/chauffeur");
const chargement = require("./controller/chargement");
const dechargement = require("./controller/dechargement");
const user = require("./controller/user");
const operateur = require("./controller/operateur");
const lieu = require("./controller/lieu");

app.use("/api/proprio", proprio);
app.use("/api/produit", produit);
app.use("/api/camion", camion);
app.use("/api/tracteur", tracteur);
app.use("/api/benne", benne);
app.use("/api/chauffeur", chauffeur);
app.use("/api/chargement", chargement);
app.use("/api/dechargement", dechargement);
app.use("/api/user", user);
app.use("/api/lieu", lieu);
app.use("/api/operateur", operateur);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message });
});
//console.log(listEndpoints(app));

// it's for ErrorHandling
//app.use(ErrorHandler);

module.exports = app;
