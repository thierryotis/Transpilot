require("dotenv").config(); // Charger les variables d'environnement depuis le fichier .env
const mysql = require("mysql2/promise");

const connectDatabase = async () => {
  try {
    // Tester si les variables d'environnement sont bien lues
    console.log("=== TEST DES VARIABLES D'ENVIRONNEMENT ===");
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("PORT:", process.env.PORT);
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "****" : "Non défini");
    console.log("DB_NAME:", process.env.DB_NAME);
    console.log("==========================================");

    // Tentative de connexion à la base de données
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "127.0.0.1", // Hôte de la base de données
      port: process.env.PORT || 3306, // Port de la base de données
      user: process.env.DB_USER, // Utilisateur de la base de données
      password: process.env.DB_PASSWORD || "", // Mot de passe de la base de données
      database: process.env.DB_NAME, // Nom de la base de données
    });

    console.log("Connected to the database!");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Quitter l'application en cas d'erreur critique
  }
};

module.exports = connectDatabase;
