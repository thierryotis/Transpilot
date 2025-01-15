const connectDatabase = require('../db/Database_online');

// Add operateur
const addOperateur = async (nom, phone, cni) => {
  try {
    const connection = await connectDatabase();
    const query = "INSERT INTO operateurs (nom, phone, cni) VALUES (?, ?, ?)";
    const [result] = await connection.query(query, [nom, phone, cni]);
    connection.end(); // Close the connection after query execution
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

// Get operateur by ID
const getOperateur = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM operateurs WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.end();
    return rows[0]; // Return the first row (assuming ID is unique)
  } catch (error) {
    throw error;
  }
};

// Get all operateurs
const getOperateurs = async () => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM operateurs";
    const [rows] = await connection.query(query);
    connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};

// Update operateur
const updateOperateur = async (id, nom, phone, cni) => {
  try {
    const connection = await connectDatabase();
    const query = "UPDATE operateurs SET nom = ?, phone = ?, cni = ? WHERE id = ?";
    const [result] = await connection.query(query, [nom, phone, cni, id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

// Delete operateur
const deleteOperateur = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "DELETE FROM operateurs WHERE id = ?";
    const [result] = await connection.query(query, [id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addOperateur,
  getOperateur,
  getOperateurs,
  updateOperateur,
  deleteOperateur,
};
