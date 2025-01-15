const connectDatabase = require('../db/Database_online');

// Add camion
const addCamion = async (immatTracteur,immatBenne,PVTracteur,PVBenne,etatTracteur,etatBenne,proprioId) => {
  try {
    const connection = await connectDatabase();
    const query = "INSERT INTO camions (immatTracteur,immatBenne,PVTracteur,PVBenne,etatTracteur,etatBenne,proprio_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await connection.query(query, [immatTracteur,immatBenne,PVTracteur,PVBenne,etatTracteur,etatBenne,proprioId]);
    connection.end(); // Close the connection after query execution
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

// Get camion by ID
const getCamion = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM camions WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.end();
    return rows[0]; // Return the first row (assuming ID is unique)
  } catch (error) {
    throw error;
  }
};

// Get all camions for a given prestataire
const getCamions = async (prestataire_id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT camions.*, proprios.nom AS proprio_nom FROM camions INNER JOIN proprios ON camions.proprio_id = proprios.id WHERE camions.proprio_id = ?";
    const [rows] = await connection.query(query, [prestataire_id]);
    connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};

// Get all camions 
const getAllCamions = async () => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT camions.*, proprios.nom AS proprio_nom FROM camions INNER JOIN proprios ON camions.proprio_id = proprios.id ";
    const [rows] = await connection.query(query);
    connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};


// Update camion
const updateCamion = async (id, immatTracteur, immatBenne, PVTracteur, PVBenne, etatTracteur, etatBenne, proprioId) => {
  try {
    const connection = await connectDatabase();
    const query = "UPDATE camions SET immatTracteur = ?, immatBenne = ?, PVTracteur = ?, PVBenne = ?, etatTracteur = ?, etatBenne = ?, proprio_id = ? WHERE id = ?";
    const [result] = await connection.query(query, [immatTracteur, immatBenne, PVTracteur, PVBenne, etatTracteur, etatBenne, proprioId, id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

// Delete camion
const deleteCamion = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "DELETE FROM camions WHERE id = ?";
    const [result] = await connection.query(query, [id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addCamion,
  getCamion,
  getCamions,
  getAllCamions,
  updateCamion,
  deleteCamion,
};
