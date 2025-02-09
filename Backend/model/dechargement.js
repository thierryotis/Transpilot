const connectDatabase = require("../db/Database_online");

// Add dechargement
const addDechargement = async (
  numero_bordereau,
  numero_bon_commande,
  etat_camion,
  date,
  lieu_dechargement,
  poids_camion_decharge,
  poids_camion_apres_chargement,
  chargement_id,
  operateur_id,
  commentaire,
  dateEnreg
) => {
  try {
    const connection = await connectDatabase();
    const query =
      "INSERT INTO dechargements (numero_bordereau, numero_bon_commande, etat_camion,date, lieu_dechargement, poids_camion_decharge, poids_camion_apres_chargement,  chargement_id, operateur_id, commentaire, heure_enregistrement) VALUES (?, ?, ?,?,  ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await connection.query(query, [
      numero_bordereau,
      numero_bon_commande,
      etat_camion,
      date,
      lieu_dechargement,
      poids_camion_apres_chargement,
      poids_camion_decharge,
      chargement_id,
      operateur_id,
      commentaire,
      dateEnreg,
    ]);
    connection.end(); // Close the connection after query execution
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

// Get dechargement by ID
const getDechargement = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM dechargements WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.end();
    return rows[0]; // Return the first row (assuming ID is unique)
  } catch (error) {
    throw error;
  }
};

// Get all dechargements
// Get all dechargements with pagination
const getDechargements = async (page, limit) => {
  try {
    const connection = await connectDatabase();

    // Calculer l'offset pour la pagination
    const offset = (page - 1) * limit;

    // Requête pour récupérer les déchargements paginés
    const query = `
      SELECT dechargements.*, lieux.nom AS lieu_nom, lieux.id AS lieu_id
      FROM dechargements
      JOIN lieux ON dechargements.lieu_dechargement = lieux.id
      LIMIT ? OFFSET ?;
    `;

    // Requête pour compter le nombre total de déchargements
    const countQuery = `SELECT COUNT(*) AS total FROM dechargements;`;

    // Exécuter les deux requêtes
    const [rows] = await connection.query(query, [limit, offset]);
    const [totalRows] = await connection.query(countQuery);

    connection.end();

    return {
      dechargements: rows,
      total: totalRows[0].total,
    };
  } catch (error) {
    throw error;
  }
};

// Update dechargement
const updateDechargement = async (
  id,
  numero_bordereau,
  numero_bon_commande,
  etat_camion,
  lieu_dechargement,
  poids_camion_decharge,
  poids_camion_apres_chargement,
  chargement_id,
  operateur_id
) => {
  try {
    const connection = await connectDatabase();
    const query =
      "UPDATE dechargements SET numero_bordereau = ?, numero_bon_commande = ?, etat_camion = ?, lieu_dechargement = ?, poids_camion_decharge = ?, poids_camion_apres_chargement = ?, chargement_id = ?, operateur_id = ? WHERE id = ?";
    const [result] = await connection.query(query, [
      numero_bordereau,
      numero_bon_commande,
      etat_camion,
      lieu_dechargement,
      poids_camion_decharge,
      poids_camion_apres_chargement,
      chargement_id,
      operateur_id,
      id,
    ]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

// Delete dechargement
const deleteDechargement = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "DELETE FROM dechargements WHERE id = ?";
    const [result] = await connection.query(query, [id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};
const getDechargementByBordereau = async (numero_bordereau) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM dechargements WHERE TRIM(numero_bordereau) = ?";
    const [result] = await connection.query(query, [numero_bordereau]);
    await connection.end();
    return result.length > 0 ? result[0] : null; // Retourne l'objet si trouvé, sinon null
  } catch (error) {
    throw error;
  }
};

// Get dechargement by ID
const getDechargementByChargement = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM dechargements WHERE chargement_id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.end();
    return rows.length > 0; // Return the first row (assuming ID is unique)
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addDechargement,
  getDechargement,
  getDechargements,
  updateDechargement,
  deleteDechargement,
  getDechargementByChargement,
  getDechargementByBordereau,
};
