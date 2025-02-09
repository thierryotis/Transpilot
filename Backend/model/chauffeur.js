const connectDatabase = require('../db/Database_online');

// Add chauffeur
const addChauffeur = async (nom, phone, cni, proprioId) => {
  try {
    const connection = await connectDatabase();
    const query = "INSERT INTO chauffeurs (nom, phone, CNI, proprio_id) VALUES (?, ?, ?, ?)";
    const [result] = await connection.query(query, [nom, phone, cni, proprioId ]);
    connection.end(); // Close the connection after query execution
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

// Get chauffeur by ID
const getChauffeur = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM chauffeurs WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.end();
    return rows[0]; // Return the first row (assuming ID is unique)
  } catch (error) {
    throw error;
  }
};

// Get all chauffeurs
const getChauffeurs = async () => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT chauffeurs.*, proprios.nom AS proprio_nom FROM chauffeurs INNER JOIN proprios ON chauffeurs.proprio_id = proprios.id ORDER BY chauffeurs.nom ASC";
    const [rows] = await connection.query(query);
    connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};

// Update chauffeur
const updateChauffeur = async (id, nom, phone, cni) => {
  try {
    const connection = await connectDatabase();
    const query = "UPDATE chauffeurs SET nom = ?, phone = ?, CNI = ? WHERE id = ?";
    const [result] = await connection.query(query, [nom, phone, cni, id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

// Delete chauffeur
const deleteChauffeur = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "DELETE FROM chauffeurs WHERE id = ?";
    const [result] = await connection.query(query, [id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addChauffeur,
  getChauffeur,
  getChauffeurs,
  updateChauffeur,
  deleteChauffeur,
};
