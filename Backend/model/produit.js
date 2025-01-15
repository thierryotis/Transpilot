const connectDatabase = require('../db/Database_online');

// Add produit
const addProduit = async (nom, type) => {
  try {
    const connection = await connectDatabase();
    const query = "INSERT INTO produits (nom, type) VALUES (?, ?)";
    const [result] = await connection.query(query, [nom, type]);
    connection.end(); // Close the connection after query execution
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

// Get produit by ID
const getProduit = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM produits WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.end();
    return rows[0]; // Return the first row (assuming ID is unique)
  } catch (error) {
    throw error;
  }
};

// Get all produits
const getProduits = async () => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM produits";
    const [rows] = await connection.query(query);
    connection.end();
    return rows;
  } catch (error) {
    throw error;
  }
};

// Update produit
const updateProduit = async (id, nom, type) => {
  try {
    const connection = await connectDatabase();
    const query = "UPDATE produits SET nom = ?, type = ? WHERE id = ?";
    const [result] = await connection.query(query, [nom, type, id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

// Delete produit
const deleteProduit = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "DELETE FROM produits WHERE id = ?";
    const [result] = await connection.query(query, [id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addProduit,
  getProduit,
  getProduits,
  updateProduit,
  deleteProduit,
};
