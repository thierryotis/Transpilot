const connectDatabase = require('../db/Database_online');

// Add lieu
const addLieu = async (nom, type) => {
  try {
    const connection = await connectDatabase();
    const query = "INSERT INTO lieux (nom, type) VALUES (?, ?)";
    const [result] = await connection.query(query, [nom, type]);
    connection.end();
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

// Get lieu by ID
const getLieu = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM lieux WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.end();
    return rows[0]; // Return the first row (assuming ID is unique)
  } catch (error) {
    throw error;
  }
};

// Get all lieux
const getLieus = async () => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM lieux";
    const [rows] = await connection.query(query);
    connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};

// Update lieu
const updateLieu = async (id, nom, type) => {
  try {
    const connection = await connectDatabase();
    const query = "UPDATE lieux SET nom = ?, type = ? WHERE id = ?";
    const [result] = await connection.query(query, [nom, type, id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

// Delete lieu
const deleteLieu = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "DELETE FROM lieux WHERE id = ?";
    const [result] = await connection.query(query, [id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addLieu,
  getLieu,
  getLieus,
  updateLieu,
  deleteLieu,
};
