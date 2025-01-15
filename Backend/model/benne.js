const connectDatabase = require('../db/Database_online');

// Add benne
const addBenne = async (immat, proprio_id) => {
  try {
    const connection = await connectDatabase();
    const query = "INSERT INTO bennes (immat, proprio_id) VALUES (?, ?)";
    const [result] = await connection.query(query, [immat, proprio_id]);
    connection.end();
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

// Get benne by ID
const getBenne = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM bennes WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.end();
    return rows[0]; // Return the first row (assuming ID is unique)
  } catch (error) {
    throw error;
  }
};

// Get all bennes with a join on the proprios table
const getBennes = async () => {
  try {
    const connection = await connectDatabase();
    const query = `
      SELECT bennes.*, proprios.nom AS proprio_nom
      FROM bennes
      INNER JOIN proprios ON bennes.proprio_id = proprios.id
    `;
    const [rows] = await connection.query(query);
    connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};


// Get bennes by prestataire (proprio_id)
const getBenneByPrestataire = async (proprio_id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM bennes WHERE proprio_id = ?";
    const [rows] = await connection.query(query, [proprio_id]);
    connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};

// Update benne
const updateBenne = async (id, immat, proprio_id) => {
  try {
    const connection = await connectDatabase();
    const query = "UPDATE bennes SET immat = ?, proprio_id = ? WHERE id = ?";
    const [result] = await connection.query(query, [immat, proprio_id, id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

// Delete benne
const deleteBenne = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "DELETE FROM bennes WHERE id = ?";
    const [result] = await connection.query(query, [id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addBenne,
  getBenne,
  getBennes,
  getBenneByPrestataire,
  updateBenne,
  deleteBenne,
};
