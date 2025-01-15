const connectDatabase = require('../db/Database_online');

// Add tracteur
const addTracteur = async (immat, proprio_id) => {
  try {
    const connection = await connectDatabase();
    const query = "INSERT INTO tracteurs (immat, proprio_id) VALUES (?, ?)";
    const [result] = await connection.query(query, [immat, proprio_id]);
    connection.end();
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

// Get tracteur by ID
const getTracteur = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM tracteurs WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.end();
    return rows[0]; // Return the first row (assuming ID is unique)
  } catch (error) {
    throw error;
  }
};

// Get all tracteurs

const getTracteurs = async () => {
  try {
    const connection = await connectDatabase();
    const query = `
      SELECT tracteurs.*, proprios.nom AS proprio_nom
      FROM tracteurs
      INNER JOIN proprios ON tracteurs.proprio_id = proprios.id
    `;
    const [rows] = await connection.query(query);
    connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};


// Get tracteurs by prestataire (proprio_id)
const getTracteurByPrestataire = async (proprio_id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM tracteurs WHERE proprio_id = ?";
    const [rows] = await connection.query(query, [proprio_id]);
    connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};

// Delete tracteur
const deleteTracteur = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "DELETE FROM tracteurs WHERE id = ?";
    const [result] = await connection.query(query, [id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addTracteur,
  getTracteur,
  getTracteurs,
  getTracteurByPrestataire,
  deleteTracteur,
};
